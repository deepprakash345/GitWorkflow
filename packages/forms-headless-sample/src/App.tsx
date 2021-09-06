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
import {DialogTrigger, Dialog} from '@adobe/react-spectrum'
import {Heading, Divider, Content, ButtonGroup, ActionButton} from '@adobe/react-spectrum'
const { REACT_APP_AEM_URL } = process.env;
const token_required = process.env.REACT_APP_AUTH_REQUIRED === "true"


type FormState = {
    json?: any,
    controller?: Controller,
}


function App() {
    let [formUrl, setFormUrl] = React.useState('');
    let [token, setToken] = React.useState('');
    let [askToken, setAskToken] = React.useState(false)
    let [form, setForm] = React.useState<FormState>({});
    const aceEditor = useRef(null);
    const createForm = async (json: any) => {
        const controller = await createFormInstance(json)
        setForm({json: controller.getState(), controller})
    }
    const fetchAF = async () => {
        let auth = {}
        if (token.length > 0 || !token_required) {
            if (token.length > 0) {
                auth = {
                    'Authorization': 'Bearer ' + token
                }
            }
            setForm({});
            const data = await fetchForm(REACT_APP_AEM_URL + formUrl, auth);
            const currentJson = JSON.parse(data)
            await createForm(currentJson);
        } else if (token_required) {
            setAskToken(true)
        }
    }

    const forceRender = () => {
        fetchAF()
    }

    useEffect(() => {
        createForm(json);
        if (aceEditor.current) {
            const editor = (aceEditor as any).current.editor
        }
    }, [])

    const tokenEntered = (close : any) => {
        close();
        setAskToken(false);
        forceRender();
    }

    return (
        <Grid
            areas={['header header', 'sidebar content']}
            columns={['2fr', '2fr']}
            rows={['size-1000', 'auto']}
            marginX="size-400"
            marginTop="size-400"
            gap="size-500">
            <View gridArea="header">
                <Flex direction="row" width="100%" gap="size-1000" alignItems="end">
                    <TextField label="Enter Form URL" width="500px" value={formUrl}
                               onChange={(v) => setFormUrl(v)} />
                    <DialogTrigger type="modal" isOpen={askToken}>
                        <ActionButton onPress={() => forceRender()} isDisabled={formUrl.length === 0}>Fetch Form</ActionButton>
                        {(close) => (
                            <Dialog>
                                <Heading>Access Token Missing</Heading>
                                <Divider />
                                <Content>
                                    <TextArea label="Enter Access Token" width="100%" height="200px" value={token}
                                               onChange={(v) => setToken(v)} />
                                </Content>
                                <ButtonGroup>
                                    <Button variant="secondary" onPress={() => {
                                        setAskToken(false)
                                        setToken("")
                                        close()
                                    }}>
                                        Cancel
                                    </Button>
                                    <Button variant="secondary" onPress={() => tokenEntered(close)}>
                                        OK
                                    </Button>
                                </ButtonGroup>
                            </Dialog>
                        )}
                    </DialogTrigger>
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