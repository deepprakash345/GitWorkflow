import FormContext from '../../react-mapper/FormContext';
import React from 'react';
import {createFormInstance} from '@adobe/forms-next-core/lib';
import {Controller} from '@adobe/forms-next-core/lib/controller/Controller';

export const createForm = async (field: any) => {
    const formJson = {
        ':items': {
            [field[':name']]: field
        }
    };
    return await createFormInstance(formJson);
};

export const Provider = (controller: Controller) => (props: any) => {
    const c = {
        controller,
        mappings: {}
    };
    const {children} = props;
    return <FormContext.Provider value={c}>{children}</FormContext.Provider>;
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

export const testController = () => {
    return {
        subscribe : jest.fn().mockReturnValue({
            unsubscribe: jest.fn()
        }),

        dispatch : jest.fn(),

        getState : jest.fn()
    };
};