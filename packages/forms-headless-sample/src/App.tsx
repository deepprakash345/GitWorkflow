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
    let [value, setValue] = React.useState('https://author-p9552-e11552-cmstg.adobeaemcloud.com/api/assets/vdua-test/contact-us.json/renditions/original');
    let [token, setToken] = React.useState('eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEtc3RnMS1rZXktMS5jZXIifQ.eyJpZCI6IjE2MzA0OTk5OTM0NzRfMWQ4YThkMTctOWJkNC00ZWI1LWEyNGQtMmFkYmQxNTFhOTI5X3VlMSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJkZXYtY29uc29sZS1zdGFnZSIsInVzZXJfaWQiOiI4NDVBNjk4MDVDRDQ0OUJFMEE0OTQyMzRAYzYyZjI0Y2M1YjViN2UwZTBhNDk0MDA0Iiwic3RhdGUiOiJGNGRsblVqTlpndHBxUk5FZ0NqaTdmb3oiLCJhcyI6Imltcy1uYTEtc3RnMSIsImFhX2lkIjoiODQ1QTY5ODA1Q0Q0NDlCRTBBNDk0MjM0QGM2MmYyNGNjNWI1YjdlMGUwYTQ5NDAwNCIsImZnIjoiVlhUVFA2UjQ3WjVSQzZENUxHUk1BMllBWkE9PT09PT0iLCJzaWQiOiIxNjMwNDc3MTYwMzcwXzQ5MjFjNzFlLThlMjgtNDMwMi05MWY0LTUwMDFhNDc3NjYwOF91ZTEiLCJydGlkIjoiMTYzMDQ5OTk5MzQ3NF9kNzlhYmZiNy05NWE0LTRhNjctYmE0NC00Y2Q2MjM0MjdlZTJfdWUxIiwibW9pIjoiMjk1ZTI0MzIiLCJydGVhIjoiMTYzMTcwOTU5MzQ3NCIsIm9jIjoicmVuZ2EqbmExci1zdGcxKjE3YmExNWY3MTg1KjBKS0NQUE1IR1MyMUswUkFKUFpLRFlFUDJDIiwiZXhwaXJlc19pbiI6Ijg2NDAwMDAwIiwiY3JlYXRlZF9hdCI6IjE2MzA0OTk5OTM0NzQiLCJzY29wZSI6IkFkb2JlSUQsb3BlbmlkLHJlYWRfb3JnYW5pemF0aW9ucyxhZGRpdGlvbmFsX2luZm8ucHJvamVjdGVkUHJvZHVjdENvbnRleHQifQ.SJgvPsOkl6bIWWnE3gGeRzq1O_Ad81QNrq92kw6MvuGc5SQVPc8Wk7c7a4Cwl7pMKCBE4ZNlfuJ2lPkyfIvRmaSDf0JbpHIFTBxCIgLC1B-shjKBDdNg3pM6oZfx7s9q3xJwkccOZCQyx7NmRnqSGrSAKFVSNcaijY9s_HMs0Dh6gu7BndAW2cti_AZJ56dHJjM11JCvFkKl4G2_SVrfQNuJRFgsjzYdBNZqIGPUFvOAu23dfkskmG7OLohhy3pf9HJQczsjLtRxoKEAaiyteTxVcjmCUQB5FA_YOYtUBK_ohcOpJmyrw98TH81TrSOGPBpYzxtkOLqX1M9tqxkTEg');
    let [form, setForm] = React.useState<FormState>({});
    const aceEditor = useRef(null);
    const createForm = async (json: any) => {
        const controller = await createFormInstance(json)
        setForm({json: controller.getState(), controller})
    }
    const fetchAF = async () => {
        const data = await fetchForm(value, {
            'Authorization' : 'Bearer ' + token
        });
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
                    <TextField label="Enter Access Token" width="size-3600" value={token}
                               onChange={(v) => setToken(v)}></TextField>
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