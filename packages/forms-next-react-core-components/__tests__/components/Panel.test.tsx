import Panel from '../../src/components/Panel';
import React from 'react';
import {render} from '@testing-library/react';
import {createForm, Provider} from '../utils';
import {jsonString} from '@aemforms/forms-next-core/lib/utils/JsonUtils';

const emptyPanel = {
    'id' : 'emptypanel',
    'visible' : true,
    'items' : []
};

const panelWithField = {
    'id' : 'panelWithField',
    'visible' : true,
    'items' : [
        {
            'id' : 'field',
            'name' : 'f1',
            'viewType' : 'text-field',
            'title' : 'name',
            'visible' : true
        }
    ]
};


test('panel should get rendered if it is visible', () => {
    const panel = <Panel {...emptyPanel} />;
    const {container} = render(panel);
    expect(container.innerHTML.length).toBeGreaterThan(0);
});

test('panel should not get rendered if it is invisible', () => {
    const p = {
        ...emptyPanel,
        'visible' : false
    };
    const panel = <Panel {...p} />;
    const {container} = render(panel);
    expect(container.innerHTML.length).toEqual(0);
});

test('panel should get rendered if it has no children', () => {
    const panel = <Panel {...emptyPanel} />;
    const {container} = render(panel);
    expect(container.innerHTML.length).toBeGreaterThan(0);
});

test('panel should get rendered if no mapping is defined', async () => {
    const panel = <Panel {...panelWithField} />;
    const form = await createForm(emptyPanel);
    const wrapper = Provider(form, {});
    const {container} = render(panel, {wrapper});
    expect(container.innerHTML.length).toBeGreaterThan(0);
});

test('children without mapping should get rendered as undefined', async () => {
    const panel = <Panel {...panelWithField} />;
    const form = await createForm(emptyPanel);
    const wrapper = Provider(form, {});
    const {container} = render(panel, {wrapper});
    var expected = '<div><h4>Undefined Element</h4><pre>' + jsonString(panelWithField.items[0]) + '</pre></div>';
    expect(container.innerHTML).toContain(expected);
});

test('children with mapping should render the mapped component', async () => {
    const MyComponent = (props: any) => {
        return <div>My Field</div>;
    };

    const panel = <Panel {...panelWithField} />;
    const form = await createForm(emptyPanel);
    const wrapper = Provider(form, {'text-field' : MyComponent});
    const {container} = render(panel, {wrapper});
    var expected = '<div><h4>Undefined Element</h4><pre>' + jsonString(panelWithField.items[0]) + '</pre></div>';
    expect(container.innerHTML).not.toContain(expected);
    expect(container.innerHTML).toContain('<div>My Field</div>');
});