import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import TextField from '../../components/TextField';

const field = {
    ':name' : 'name',
    ':value' : 'john doe',
    ':title' : 'name'
};

test('field gets rendered without a provider', async() => {
    const {container} = render (<TextField {...field} />);
    const label = container.querySelector('label');
    expect(label?.innerHTML).toEqual('name');
    const input = container.querySelector('input');
    expect(input?.value).toEqual('john doe');
    expect(input?.getAttribute('name')).toEqual('name');
});

test('labels and inputs are mapped with for and id attribute', async() => {
    const {container} = render (<TextField {...field} />);
    const label = container.querySelector('label');
    const input = container.querySelector('input');
    expect(input?.getAttribute('id')).toEqual(label?.getAttribute('for'));
});