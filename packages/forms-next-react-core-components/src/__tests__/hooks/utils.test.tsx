import {renderChildren, renderIfVisible} from '../../react-mapper/utils';
import React from 'react';
import {jsonString} from '@adobe/forms-next-core/lib/utils/JsonUtils';

const item = {
    ':id' : 'id',
    ':type' : 'someType'
};

const parent = {
    ':id' : 'parentid',
    ':items' : {
        'x' : item
    }
};

test('render children with no mappings returns undefined elements', () => {

    const res = renderChildren(parent, undefined);
    expect(res[0]).toEqual(<div><h4>Undefined Element</h4><pre>{jsonString(item)}</pre></div>);
});

test('render children with empty mappings returns undefined elements', () => {
    const res = renderChildren(parent, {});
    expect(res[0]).toEqual(<div><h4>Undefined Element</h4><pre>{jsonString(item)}</pre></div>);
});

test('render children with no children', () => {
    const p = {
        ...parent,
        ':items' : {}
    };
    const res = renderChildren(p, {});
    expect(res.length).toEqual(0);
});

test.each([123, '', true, [123]])('render children with items as %p', (items) => {
    const p = {
        ...parent,
        ':items' : items as unknown as any
    };
    const res = renderChildren(p, {});
    expect(res.length).toEqual(0);
});

test('render children with missing mapping returns undefined element', () => {
    const MyComponent = (props: any) => {
        return <div>{props.value}</div>;
    };

    const mappings = {
        'otherType' : MyComponent
    };

    const res = renderChildren(parent, mappings);
    expect(res[0]).toEqual(<div><h4>Undefined Element</h4><pre>{jsonString(item)}</pre></div>);
});

test('render children with correct mappings', () => {
    const item = {
        ':id' : 'id',
        ':type' : 'someType',
        'value' : 'some value'
    };
    const p = {
        ...parent,
        ':items' : {
            ...parent[':items'],
            x : item
        }
    };
    const MyComponent = (props: any) => {
        return <div>{props.value}</div>;
    };

    const mappings = {
        'someType' : MyComponent
    };

    const res = renderChildren(parent, mappings);
    expect(res[0].toString()).toStrictEqual((<MyComponent {...item}/>).toString());
});

test('renderIfVisible should not return if visible property is false', () => {
    const MyComponent = (props: any) => {
        return <div>{props.value}</div>;
    };
    const val = renderIfVisible({':visible' : false}, <MyComponent value={10}/>);
    expect(val).toEqual(null);
});

test('renderIfVisible should return if visible property is true', () => {
    const MyComponent = (props: any) => {
        return <div>{props.value}</div>;
    };
    const val = renderIfVisible({':visible' : true}, <MyComponent value={10}/>);
    expect(val).toEqual(<MyComponent value={10}/>);
});

test('renderIfVisible should not return if visible property is unset', () => {
    const MyComponent = (props: any) => {
        return <div>{props.value}</div>;
    };
    const val = renderIfVisible({}, <MyComponent value={10}/>);
    expect(val).toEqual(null);
});

test('renderIfVisible should not return if props is not an object', () => {
    const MyComponent = (props: any) => {
        return <div>{props.value}</div>;
    };
    let res = renderIfVisible('', <MyComponent value={10}/>);
    expect(res).toBeNull();

    res = renderIfVisible(undefined, <MyComponent value={10}/>);
    expect(res).toBeNull();

    res = renderIfVisible(null, <MyComponent value={10}/>);
    expect(res).toBeNull();

    res = renderIfVisible(true, <MyComponent value={10}/>);
    expect(res).toBeNull();

    res = renderIfVisible(false, <MyComponent value={10}/>);
    expect(res).toBeNull();

    res = renderIfVisible(1, <MyComponent value={10}/>);
    expect(res).toBeNull();

    res = renderIfVisible([], <MyComponent value={10}/>);
    expect(res).toBeNull();
});