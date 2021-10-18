import React, {useEffect} from 'react';
import './App.css';
import {Divider, Flex, Grid, View} from '@adobe/react-spectrum'
import mappings from './mappings'
import AdaptiveForm from "@adobe/forms-next-react-core-components/lib/components/AdaptiveForm";
import {Action} from "@adobe/forms-next-core/lib/controller/Controller";
import application from './samples/Application.json'
import {jsonString} from "@adobe/forms-next-core/lib/utils/JsonUtils";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import {TabList, TabPanels, Tabs, Item} from '@adobe/react-spectrum'
import {exportDataSchema} from "@adobe/forms-next-core/lib/utils/SchemaUtils";
import {fetchForm} from "@adobe/forms-next-core/lib";
const {REACT_APP_AEM_URL} = process.env;
const token_required = process.env.REACT_APP_AUTH_REQUIRED === "true"


function App() {
    let [formToRender, setFormToRender] = React.useState('');
    let [formJson, setFormJson] = React.useState('');
    let [dataSchema, setDataSchema] = React.useState('');
    let [application, setApplication] = React.useState('')
    const onSubmit= (data: Action) => {
        console.log(data.payload)
    }

    const loadForm = (action: Action) => {
        console.log(action.target.getState());
        const form = "model" in action.payload ? action.payload.model : action.payload
        const formJson = jsonString(form)
        setFormJson(formJson)
        setFormToRender('');
        setFormToRender(formJson)
        const dataSchema = exportDataSchema(form)
        console.error(dataSchema)
        setDataSchema(jsonString(dataSchema))
    }

    useEffect(() => {
        (async () => {
            const response = await fetch('/pages/livecycle/af2-docs/examples/generated/Application.form.json')
            const form = await response.text()
            setApplication(form)
        })()
    })

    return (
        <Flex gap="size-500" direction="column" marginX="size-400" >
            <h1>Goa Playground - Checkout your Headless Form Definitions</h1>
            <Flex direction="row" gap="size-500" marginBottom="2rem">
                <View width="50%">
                    <h1>Choose a Form To Render</h1>
                    <Tabs>
                        <TabList>
                            <Item key="configuration"> Form Configuration </Item>
                            <Item key="form-model"> Form Model </Item>
                            <Item key="data-model"> Data Model </Item>
                            <Item key="references"> References </Item>
                        </TabList>
                        <TabPanels>
                            <Item key="configuration">
                                {application.length > 0 ? (<AdaptiveForm
                                     formJson={JSON.parse(application)}
                                     mappings={mappings}
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
                                               const formJson = editor.getValue();
                                               try {
                                                   JSON.parse(formJson)
                                                   setFormToRender('');
                                                   setFormToRender(formJson)
                                               } catch (e) {
                                                   console.log(e)
                                               }
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
                                           value={dataSchema}
                                           theme="github"
                                           name="DATA_JSON"
                                           editorProps={{$blockScrolling: true}}
                                           tabSize={2}
                                           onChange={(value: string) => {
                                               setDataSchema(value)
                                           }}
                                           onBlur={(e: any, editor: any) => {

                                           }}
                                           setOptions={{
                                               enableBasicAutocompletion: true,
                                               enableLiveAutocompletion: true,
                                               enableSnippets: true
                                           }}
                                />
                            </Item>
                            <Item key="references">
                                <h2>Specification</h2>
                                <ul>
                                    <li>
                                        <a href="https://wiki.corp.adobe.com/display/lc/Form+Model+Definition">Form Model Definition</a>
                                    </li>
                                    <li>
                                        <a href="https://wiki.corp.adobe.com/display/lc/Rule+Grammar+Specification">Rule Grammar- JSON Formula</a>
                                    </li>
                                    <li>
                                        <a href="https://wiki.corp.adobe.com/display/lc/Form+Headless+API+Specification">Adaptive Form APIs</a>
                                    </li>
                                </ul>
                                <h2>Git Links</h2>
                                <ul>
                                    <li>
                                        <a href="https://git.corp.adobe.com/livecycle/af2-docs/tree/gh-pages/examples">
                                            Sample Form Definitions
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://git.corp.adobe.com/livecycle/af2-docs/tree/gh-pages/schema">
                                            Form Definition Schema
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://git.corp.adobe.com/livecycle/af2-web-runtime/tree/main/packages/forms-headless-sample">
                                            Playground code
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://git.corp.adobe.com/livecycle/af2-expression-parser/tree/main/af-expression-parser-ts">
                                            Rule Grammar JavaScript Implementation
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://git.corp.adobe.com/livecycle/af2-web-runtime/blob/main/packages/forms-next-react-core-components/src/components/AdaptiveForm.tsx">
                                            Adptive Form Component
                                        </a>
                                    </li>
                                </ul>
                            </Item>
                        </TabPanels>
                    </Tabs>
                </View>
                <Divider orientation="vertical" size={"M"}/>
                <View width={"50%"} >
                    <h1>Rendered Form</h1>
                    <View marginTop={"size-200"}>
                        {formToRender ? <AdaptiveForm
                            formJson={JSON.parse(formToRender)}
                            mappings={mappings}
                            onSubmit={onSubmit}/> : 'No Form Selected...'}
                     </View>
                </View>
            </Flex>
        </Flex>
    );
}

export default App;