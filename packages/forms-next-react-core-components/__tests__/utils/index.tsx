import {FormContext} from '@aemforms/forms-next-react-bindings';
import React, {JSXElementConstructor} from 'react';
import {createFormInstance, FieldModel, FormModel} from '@aemforms/forms-next-core/lib';
import {IntlProvider} from 'react-intl';
import Checkbox from '../../src/components/Checkbox';
import {render} from '@testing-library/react';

export const createForm = async (field: any) => {
    const formJson = {
        'items': [field]
    };
    return await createFormInstance(formJson);
};

export const Provider = (form: FormModel,
                         mappings: any = {},
                         locale: string = 'en-US',
                         dictionaries: any = '') => (props: any) => {
    const c = {
        form,
        mappings
    };
    const {children} = props;
    return (
        <IntlProvider locale={locale} messages={dictionaries}>
            <FormContext.Provider value={c}>{children}</FormContext.Provider>
        </IntlProvider>
    );
};

export type TestCase<T> = T & {
    name: string,
    f ?: boolean,
    x ?: boolean,
    field: any
}

export type InputFieldTestCase<E> = TestCase<{expects: E}>

export function filterTestTable<T>(tests: TestCase<T>[]) : TestCase<T>[] {
    let testsToRun = tests.filter(t => t.f);
    if (testsToRun.length == 0) {
        testsToRun = tests.filter(t => !t.x);
    }
    return testsToRun;
}

export function ignoredTestTable<T>(tests: TestCase<T>[]) :TestCase<T>[] {
    return tests.filter(t => t.x);
}

export const randomString = (length: number) => {
    let result           = '';
    let characters       = 'abcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
};

type ElementFetcher<T> = (e: HTMLElement) => T

export const elementFetcher = (container: HTMLElement) => {
    const input = container.querySelector('input');
    const label = container.querySelector('label');
    return {
        input,
        label
    };
};

export const renderComponent = function<T>(Component: JSXElementConstructor<any>,
                                           fetcher: ElementFetcher<T>) {
    const test = async (field: any) => {
        let container, form;
        form = await createForm(field);
        const e = form.items[0].getState();
        let component = <Component {...e} />;
        const wrapper = Provider(form);
        container = render(component, {wrapper}).container;
        return {
            ...fetcher(container),
            container,
            form,
            element: form?.items[0] as FieldModel
        };
    };
    return test;
};
