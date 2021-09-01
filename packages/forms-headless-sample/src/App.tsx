import React, {useEffect, useRef} from 'react';
import './App.css';
import {Grid, View, TextField, TextArea, Button, Flex} from '@adobe/react-spectrum'
import json from './samples/statement-financial-position.json';
import {fetchForm, FormModel, FormJson} from "@adobe/forms-next-core"
import mappings from '@adobe/forms-next-react-core-components/lib/mappings'
import FormContext from '@adobe/forms-next-react-core-components/lib/react-mapper/FormContext'
import {createFormInstance} from "@adobe/forms-next-core/lib";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import ace from 'ace-builds'
import {Controller} from "@adobe/forms-next-core/lib/controller/Controller";
import Form from "@adobe/forms-next-react-core-components/lib/components/Form";

type FormState = {
    json?: any,
    controller?: Controller,
}


function App() {
    let [value, setValue] = React.useState('');
    let [form, setForm] = React.useState<FormState>({});
    const aceEditor = useRef(null);
    const createForm = async (json: any) => {
        const controller = await createFormInstance(json)
        setForm({json: controller.getState(), controller})
    }
    const fetchAF = async () => {
        const data = await fetchForm(value);
        const currentJson = JSON.parse(data)
        await createForm(currentJson);
    }

    const forceRender = () => {
        setForm({});
        fetchAF()
    }

    useEffect(() => {
        createForm(json);
        if (aceEditor.current) {
            const editor = (aceEditor as any).current.editor
        }
    }, [])


    return (
        <Grid
            areas={['header  header', 'sidebar content']}
            columns={['1fr', '3fr']}
            rows={['size-1000', 'auto']}
            marginX="size-400"
            marginTop="size-400"
            gap="size-500">
            <View gridArea="header">
                <Flex direction="row" width="100%" gap="size-1000" alignItems="end">
                    <TextField label="Enter Form URL" width="size-3600" value={value}
                               onChange={(v) => setValue(v)}></TextField>
                    <Button variant="primary" width="size-3600" onPress={() => forceRender()}>Fetch Form</Button>
                </Flex>
            </View>
            <View gridArea="sidebar" padding="size-200" paddingBottom="size-1000">
                <AceEditor
                    ref={aceEditor}
                    className="form_ace_editor"
                    mode="json"
                    value={JSON.stringify(form.json || "loading Form", null, 2)}
                    theme="github"
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{$blockScrolling: true}}
                    tabSize={2}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true
                    }}
                />
            </View>
            <View gridArea="content">
                {form?.json !== undefined ? (
                    <FormContext.Provider value={{mappings: mappings, controller: form.controller}}>
                        {form != null ? <Form formJson={form.controller?.getState()}></Form> : ""}
                    </FormContext.Provider>
                ) : 'Loading Form...'}
            </View>
        </Grid>
    );
}

export default App;