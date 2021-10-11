import React from 'react';
import './App.css';
import {Grid, View} from '@adobe/react-spectrum'
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
const {REACT_APP_AEM_URL} = process.env;
const token_required = process.env.REACT_APP_AUTH_REQUIRED === "true"

function App() {
    let [formToRender, setFormToRender] = React.useState('');
    let [formJson, setFormJson] = React.useState('');

    const onSubmit= (data: Action) => {
        console.log(data.payload)
    }

    const loadForm = (action: Action) => {
        console.log(action.target.getState());
        const form = action.payload;
        const formJson = jsonString(form)
        setFormJson(formJson)
        setFormToRender('');
        setFormToRender(formJson)
    }

    return (
        <Grid
            areas={['sidebar content']}
            columns={['2fr', '2fr']}
            marginX="size-400"
            marginTop="size-400"
            gap="size-500">
            <View gridArea="sidebar" padding="size-200" paddingBottom="size-1000">
                <h1>Choose a Form To Render</h1>
                <Tabs>
                    <TabList>
                        <Item key="configuration"> Form Configuration </Item>
                        <Item key="form-model"> Form Model </Item>
                        <Item key="data-model"> Data Model </Item>
                    </TabList>
                    <TabPanels>
                        <Item key="configuration">
                             <AdaptiveForm
                                 formJson={application}
                                 mappings={mappings}
                                 onLoadForm={loadForm}/>
                        </Item>
                        <Item key="form-model">
                            <AceEditor mode="json"
                                       value={formJson}
                                       theme="github"
                                       name="UNIQUE_ID_OF_DIV"
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
                            Work in Progress
                        </Item>
                    </TabPanels>
                </Tabs>
            </View>
            <View gridArea="content" paddingTop="size-200">
                <h1>Rendered Form</h1>
                <View marginTop={"size-200"}>
                    {formToRender ? <AdaptiveForm
                        formJson={JSON.parse(formToRender)}
                        mappings={mappings}
                        onSubmit={onSubmit}
                        onStateSuccess={(eventObj : Action) => {
                            // fetch data
                            let dataVar = "askhas"
                            // target returns a controller which could be used to interact with the form
                            //eventObj.target.getElement(eventObj.payload?.field).dispatch(new Change(dataVar));
                        }}/> : 'No Form Selected...'}
                 </View>
            </View>
        </Grid>
    );
}

export default App;