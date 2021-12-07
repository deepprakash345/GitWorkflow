import React from 'react';
import {jsonString} from '@aemforms/forms-next-core/lib/utils/JsonUtils';
import {renderChildren} from '../src';

const item = {
    'id' : 'id',
    'viewType' : 'someType'
};

const parent = {
    'id' : 'parentid',
    'items' : [item]
};

export const mockHandler = {
    dispatchClick: () => {},
    dispatchChange: (val?: string) => {},
    dispatchAddItem: (id?: number) => {},
    dispatchRemoveItem: (id?: number) => {}
};

test('render children with no mappings returns undefined elements', () => {

    const res = renderChildren(parent, undefined, '$form', mockHandler);
    expect(res[0]).toEqual(<div><h4>Undefined Element</h4><pre>{jsonString(item)}</pre></div>);
});

test('render children with empty mappings returns undefined elements', () => {
    const res = renderChildren(parent, {},'$form', mockHandler);
    expect(res[0]).toEqual(<div><h4>Undefined Element</h4><pre>{jsonString(item)}</pre></div>);
});

test('render children with no children', () => {
    const p = {
        ...parent,
        'items' : []
    };
    const res = renderChildren(p, {},'$form', mockHandler);
    expect(res.length).toEqual(0);
});

test.each([123, '', true])('render children with items as %p', (items) => {
    const p = {
        ...parent,
        'items' : items as unknown as any
    };
    const res = renderChildren(p, {},'$form', mockHandler);
    expect(res.length).toEqual(0);
});

test('render children with missing mapping returns undefined element', () => {
    const MyComponent = (props: any) => {
        return <div>{props.value}</div>;
    };

    const mappings = {
        'otherType' : MyComponent
    };

    const res = renderChildren(parent, mappings,'$form', mockHandler);
    expect(res[0]).toEqual(<div><h4>Undefined Element</h4><pre>{jsonString(item)}</pre></div>);
});

test('render children with correct mappings', () => {
    const item = {
        'id' : 'id',
        'viewType' : 'someType',
        'value' : 'some value'
    };
    const p = {
        ...parent,
        'items' : [
            ...parent.items,
            item
        ]
    };
    const MyComponent = (props: any) => {
        return <div>{props.value}</div>;
    };

    const mappings = {
        'someType' : MyComponent
    };

    const res = renderChildren(parent, mappings,'$form', mockHandler);
    expect(res[0].toString()).toStrictEqual((<MyComponent {...item}/>).toString());
});