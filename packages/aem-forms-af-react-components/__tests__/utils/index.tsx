
  
/*
 *
 *  Copyright 2022 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *   of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software distributed under
 *   the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

import {FormContext} from '@adobe/aem-forms-af-super-component';
import React, {JSXElementConstructor} from 'react';
import {createFormInstance, FieldModel, FormModel} from '@adobe/aem-forms-af-core/lib';
import {IntlProvider} from 'react-intl';
import Checkbox from '../../src/components/Checkbox';
import {render} from '@testing-library/react';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';

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
        mappings,
        modelId: '$form',
        refMap : {}
    };
    const {children} = props;
    return (
    <Spectrum3Provider theme={defaultTheme}>
      <IntlProvider locale={locale} messages={dictionaries}>
        <FormContext.Provider value={c}>{children}</FormContext.Provider>
      </IntlProvider>
    </Spectrum3Provider>
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

export function jest26CompatibleTable<T>(tests: TestCase<T>[]) : [string, TestCase<T>][] {
    return tests.map(t => {
        return [t.name, t];
    });
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