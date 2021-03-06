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

import React, {Key, useEffect} from 'react';
import './App.css';
import {Divider, Flex, Grid, View} from '@adobe/react-spectrum'
import mappings from './mappings'
import {AdaptiveForm} from "@adobe/aem-forms-af-react-renderer";
import {jsonString, exportDataSchema, Action} from "@adobe/aem-forms-af-core";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import {TabList, TabPanels, Tabs, Item} from '@adobe/react-spectrum'
import {useLocale} from '@react-aria/i18n';


let currentForm:any = null
let currentConfig: any = null;

function App() {
    let [formToRender, setFormToRender] = React.useState<any>({});
    let [formJson, setFormJson] = React.useState('');
    let [dictionary, setDictionary] = React.useState('' as any);
    let [dataSchema, setDataSchema] = React.useState('');
    let [dataModel, setDataModel] = React.useState('');
    // todo: add utility to fetch locale from local storage, context, domain or path later
    // todo: today this only tries to fetch browser/system locale
    let {locale, direction} = useLocale();
    let [localeState, setLocaleState] = React.useState(locale);

    let [application, setApplication] = React.useState<any>({})

    const onSubmit= (data: Action) => {
        console.log(data.payload)
    }

    const fetchFormDictionary = async (path: string) => {
        let result = '';
        try {
            const response = await fetch(path)
            result = await response.text()
        } catch (ex) {
            console.log('error handled');
        }
        if (result) {
            setDictionary(result);
        }
    };

    useEffect( () => {
        if (Object.keys(application).length === 0) {
            (async () => {
                console.log("making a get request")
                const response = await fetch('./examples/generated/Application.form.json')
                const form = await response.text()
                setApplication(JSON.parse(form))
            })()
        }
        if (Object.keys(formToRender).length > 1) {
            let path = formToRender?.properties?.['afs:links']?.['i18n']?.['href'];
            fetchFormDictionary(path);
        }
    }, [formToRender])

    const loadLocale = (action: Action) => {
        if (action.payload && action.payload.changes) {
            const { changes = [] } = action.payload;
            const field = changes.find((field: any) => field.propertyName === 'value') || {}
            setLocaleState(field.currentValue);
        }
    }
    const loadForm = (action: Action) => {
        const form = "model" in action.payload ? action.payload.model : action.payload
        const formJson = jsonString(form)
        setFormJson(formJson)
        setFormToRender(form)
        const dataSchema = exportDataSchema(form)
        setDataSchema(jsonString(dataSchema))
    }

    const formInitialized = (action: Action) => {
        currentForm = action.target
    }

    const configInitialized = (action: Action) => {
        currentConfig = action.target
    }

    const tabChanged =  (id: Key) => {
        if (id === "data-model" && currentForm != null) {
            let data = currentForm.getState().data;
            setDataModel(jsonString(data))
        } else if (id === "configuration" && currentConfig != null) {
            const app = application;
            app.data = currentConfig.getState().data;
            setApplication(app);
        }
    }

    return (
        <Flex gap="size-500" direction="column" marginX="size-400" >
            <h1>Playground - Checkout your Headless Form Definitions</h1>
            <Flex direction="row" gap="size-500" marginBottom="2rem">
                <View width="50%">
                    <h1>Choose a Form To Render</h1>
                    <Tabs onSelectionChange={tabChanged}>
                        <TabList>
                            <Item key="configuration"> Form Configuration </Item>
                            <Item key="form-model"> Form Model </Item>
                            <Item key="data-model"> Data Model </Item>
                            <Item key="data-schema"> Data Schema </Item>
                        </TabList>
                        <TabPanels>
                            <Item key="configuration">
                                {Object.keys(application).length > 0 ? (<AdaptiveForm
                                    onLocaleChange={loadLocale}
                                    formJson={application}
                                    mappings={mappings}
                                    onInitialize={configInitialized}
                                    onLoadForm={loadForm}/>) : 'Preparing Configuration'}
                            </Item>
                            <Item key="form-model">
                                <AceEditor mode="json"
                                           value={formJson}
                                           theme="github"
                                           name="FORM_JSON"
                                           editorProps={{$blockScrolling: true}}
                                           tabSize={2}
                                           onChange={(value: string) => {
                                               setFormJson(value)
                                           }}
                                           onBlur={(e: any, editor: any) => {
                                               const current = editor.getValue();
                                               if (current !== jsonString(formToRender)) {
                                                   try {
                                                       const json = JSON.parse(current)
                                                       const dataSchema = exportDataSchema(json)
                                                       setDataSchema(jsonString(dataSchema))
                                                       //json.data = currentForm.getState().data
                                                       setFormToRender(json)
                                                   } catch (e) {
                                                       console.error(e)
                                                   }
                                               }
                                           }}
                                           setOptions={{
                                               enableBasicAutocompletion: true,
                                               enableLiveAutocompletion: true,
                                               enableSnippets: true
                                           }}
                                />
                            </Item>
                            <Item key="data-schema">
                                <AceEditor mode="json"
                                           value={dataSchema}
                                           theme="github"
                                           name="DATA_SCHEMA_JSON"
                                           editorProps={{$blockScrolling: true}}
                                           tabSize={2}
                                           onChange={(value: string) => {
                                               setDataSchema(value)
                                           }}
                                           setOptions={{
                                               enableBasicAutocompletion: true,
                                               enableLiveAutocompletion: true,
                                               enableSnippets: true
                                           }}
                                />
                            </Item>
                            <Item key="data-model">
                                <AceEditor mode="json"
                                           value={dataModel}
                                           theme="github"
                                           name="DATA_MODEL_JSON"
                                           editorProps={{$blockScrolling: true}}
                                           tabSize={2}
                                           onChange={(value: string) => {
                                               setDataModel(value)
                                           }}
                                           setOptions={{
                                               enableBasicAutocompletion: true,
                                               enableLiveAutocompletion: true,
                                               enableSnippets: true
                                           }}
                                />
                            </Item>
                        </TabPanels>
                    </Tabs>
                </View>
                <Divider orientation="vertical" size={"M"}/>
                <View width={"50%"} >
                    <h1>Rendered Form</h1>
                    <View marginTop={"size-200"}>
                        {Object.keys(formToRender).length > 0 ? <AdaptiveForm
                            locale={localeState}
                            localizationMessages={dictionary}
                            onInitialize={formInitialized}
                            formJson={formToRender}
                            mappings={mappings}
                            onSubmit={onSubmit}/> : 'No Form Selected...'}
                     </View>
                </View>
            </Flex>
        </Flex>
    );
}

export default App;