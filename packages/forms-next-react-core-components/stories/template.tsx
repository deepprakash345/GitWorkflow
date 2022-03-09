import {Provider as Spectrum3Provider, defaultTheme} from '@adobe/react-spectrum';
import {action} from '@storybook/addon-actions';
import {Action} from '@aemforms/forms-core';
import Example from "./Example";
import React, {useState} from "react";

//@ts-ignore
export const logData = (e: Action) => action('onFieldChanged')(e.target.exportData());

export const logAction = (name: string) => (e: Action) => action(name)(e.target.exportData());

export const base = {
    'adaptiveform': '0.0.17-pre',
    'metadata': {
        'grammar': 'json-formula-1.0.0',
        'version': '1.0.0'
    }
}


export const form = (...items) => {
    return {
        ...base,
        items
    }
}

export const formWithSubmit = (...items) => {
    return form(...[...items, submitButton()])
}


export const submitButton = (label = "Submit") => {
    return {
        fieldType: 'button',
        label: {
            value: "Submit"
        },
        'events': {"click": "submitForm()"}
    }
}


export const decorator = (Story, context) => {
    const {args, viewMode} = context
    const highlights = context.parameters.highlights;

    const [data, setData] = useState(null)

    const wrapSubmit = (action) => {
        setData(action.target.exportData())
    }

    return (<Spectrum3Provider theme={defaultTheme}>
        {viewMode === "story" ? <Story/> :
            (<Example args={args} highlights={highlights} data={data}>
                <div key="story">
                    <Story args={{...args, onSubmit: wrapSubmit}}/>
                </div>
            </Example>)}
    </Spectrum3Provider>)
}

export const argTypes = {
    formJson: {
        control: {
            type: 'object'
        }
    }
}