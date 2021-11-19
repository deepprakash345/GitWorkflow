import {FormContext} from '@aemforms/forms-next-react-bindings';
import React from 'react';
import {createFormInstance} from '@aemforms/forms-next-core/lib';
import {Controller} from '@aemforms/forms-next-core/lib/controller/Controller';
import {IntlProvider} from 'react-intl';

export const createForm = async (field: any) => {
    const formJson = {
        'items': [field]
    };
    return await createFormInstance(formJson);
};

export const Provider = (controller: Controller,
                         mappings: any = {},
                         locale: string = 'en-US',
                         dictionaries: any = '') => (props: any) => {
    const c = {
        controller,
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