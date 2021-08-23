import {renderChildren} from '../../react-mapper/utils';
import React from 'react';
import {jsonString} from '@adobe/forms-next-core/lib/utils/JsonUtils';


test('render children with no mappings returns undefined elements', () => {
    const item = {
        ':type' : 'someType'
    };
    const res = renderChildren({
        ':items' : {
            'x' : item
        }
    }, undefined);
    expect(res[0]).toEqual(<div><h4>Undefined Element</h4><pre>{jsonString(item)}</pre></div>);
});

test('render children with empty mappings returns undefined elements', () => {
    const item = {
        ':type' : 'someType'
    };
    const res = renderChildren({
        ':items' : {
            x : item
        }
    }, {});
    expect(res[0]).toEqual(<div><h4>Undefined Element</h4><pre>{jsonString(item)}</pre></div>);
});

test('render children with no children', () => {
    const item = {
        ':type' : 'someType'
    };
    const res = renderChildren({
        ':items' : {}
    }, {});
    expect(res.length).toEqual(0);
});

test.each([123, '', true, [123]])('render children with items as %p', (items) => {
    const res = renderChildren({
        ':items' : items as unknown as any
    }, {});
    expect(res.length).toEqual(0);
});

test('render children with missing mapping returns undefined element', () => {
    const item = {
        ':type' : 'someType'
    };

    const MyComponent = (props: any) => {
        return <div>{props.value}</div>;
    };

    const mappings = {
        'otherType' : MyComponent
    };

    const res = renderChildren({
        ':items' : {
            x : item
        }
    }, mappings);
    expect(res[0]).toEqual(<div><h4>Undefined Element</h4><pre>{jsonString(item)}</pre></div>);
});

test('render children with correct mappings', () => {
    const item = {
        ':type' : 'someType',
        'value' : 'someValue'
    };

    const MyComponent = (props: any) => {
        return <div>{props.value}</div>;
    };

    const mappings = {
        'someType' : MyComponent
    };

    const res = renderChildren({
        ':items' : {
            x : item
        }
    }, mappings);
    expect(res[0].toString()).toStrictEqual((<MyComponent {...item}/>).toString());
});