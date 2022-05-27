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

import {Provider as Spectrum3Provider, defaultTheme} from '@adobe/react-spectrum';
import {action} from '@storybook/addon-actions';
import {Action} from '@adobe/aem-forms-af-core';
import Example from "./Example";
import React, {useState} from "react";

//@ts-ignore
export const logData = (e: Action) => action('onFieldChanged')(e.target.exportData());

export const logAction = (name: string) => (e: Action) => action(name)(e.target.exportData());

export const base = {
    'adaptiveform': '0.10.0',
    'metadata': {
        'grammar': 'json-formula-1.0.0',
        'version': '1.0.0'
    }
}

export const form = (title, ...items) => {
    if (typeof title === "string") {
        return {
            ...base,
            title,
            items
        }
    }
    return {
        ...base,
        items: [
            title,
            ...items
        ]
    }
}

export const formWithSubmit = (title, ...items) => {
    return form(title, ...items, submitButton())
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