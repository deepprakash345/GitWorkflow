import React, {useEffect, useRef} from 'react';
import './App.css';
import {Grid, View, TextField, TextArea, Button, Flex, ComboBox, Item} from '@adobe/react-spectrum'
import financialPosition from './samples/statement-financial-position.json';
import assets from './samples/assets.json';
import contentFragment from './samples/contentFragment.json';
import wizard from './samples/wizard.json';
import {fetchForm, FormJson} from "@adobe/forms-next-core"
import {jsonString} from "@adobe/forms-next-core/lib/utils/JsonUtils";
import mappings from './mappings'
import FormContext from '@adobe/forms-next-react-core-components/lib/react-mapper/FormContext'
import {createFormInstance} from "@adobe/forms-next-core/lib";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import Form from "@adobe/forms-next-react-core-components/lib/components/Form";
import {DialogTrigger, Dialog} from '@adobe/react-spectrum'
import {Heading, Divider, Content, ButtonGroup, ActionButton} from '@adobe/react-spectrum'
import Help from "./Help";
import {TabList, TabPanels, Tabs} from '@adobe/react-spectrum'
import {Checkbox} from '@adobe/react-spectrum';
import AdaptiveForm from "@adobe/forms-next-react-core-components/lib/components/AdaptiveForm";

const {REACT_APP_AEM_URL} = process.env;
const token_required = process.env.REACT_APP_AUTH_REQUIRED === "true"

function App() {
    let [formUrl, setFormUrl] = React.useState('');
    let [token, setToken] = React.useState('');
    let [askToken, setAskToken] = React.useState(false)
    let [form, setForm] = React.useState<any>(jsonString(financialPosition));
    let [inputForm, setInputForm] = React.useState(jsonString(financialPosition));
    let [serverUrl, setServerUrl] = React.useState(REACT_APP_AEM_URL)
    let [authRequired, setAuthRequired] = React.useState(token_required)
    let [modelDefinition, setModelDefinition] = React.useState('');
    const aceEditor = useRef(null);
    const getFormDefinition = (selection: String) => {
        let jsonDefinition : any = financialPosition;
        if (selection === "contentfragment") {
            jsonDefinition = contentFragment
        } else if (selection === "assets") {
            jsonDefinition = assets
        } else if (selection === 'quarry') {
            jsonDefinition = wizard
        } else if (selection === 'financialpostiion') {
            jsonDefinition = financialPosition
        }
        return jsonDefinition;
    }

    const fetchAF = async () => {
        let auth = {}
        if (token.length > 0 || !authRequired) {
            if (token.length > 0) {
                auth = {
                    'Authorization': 'Bearer ' + token
                }
            }
            setInputForm("")
            setForm("");
            const data = await fetchForm(serverUrl + formUrl, auth);
            setInputForm(data);
            setForm(data);
        } else if (authRequired) {
            setAskToken(true)
        }
    }

    const forceRender = () => {
        fetchAF()
    }

    const tokenEntered = (close: any) => {
        close();
        setAskToken(false);
        forceRender();
    }

    let comboBoxOptions = [
        {id: 'quarry', name: 'Quarry'},
        {id: 'contentfragment', name: 'Content Fragment'},
        {id: 'assets', name: 'Assets'},
        {id: 'financialpostiion', name: 'Financial Position'}
    ]

    return (
        <Grid
            areas={['header header', 'sidebar content']}
            columns={['2fr', '2fr']}
            rows={['size-1000', 'auto']}
            marginX="size-400"
            marginTop="size-400"
            gap="size-500">
            <View gridArea="header">
                <Flex direction="row" width="100%" gap="size-200" alignItems="center">
                    <Flex direction="column">
                        <TextField label="Enter Server URL" value={serverUrl}
                                   onChange={(v) => setServerUrl(v)}/>
                        <Checkbox isSelected={authRequired}
                                  onChange={(v) => {
                                      setToken('');
                                      setAuthRequired(v)
                                  }}>Authenticate</Checkbox>
                    </Flex>
                   <TextField label="Enter Form URL" width="500px" alignSelf="start" value={formUrl}
                               onChange={(v) => setFormUrl(v)}/>
                    <DialogTrigger type="modal" isOpen={askToken}>
                        <ActionButton onPress={() => forceRender()} isDisabled={formUrl.length === 0}>Fetch
                            Form</ActionButton>
                        {(close) => (
                            <Dialog>
                                <Heading>Access Token Missing</Heading>
                                <Divider/>
                                <Content>
                                    <TextArea label="Enter Access Token" width="100%" height="200px" value={token}
                                              onChange={(v) => setToken(v)}/>
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
                    <Help/>
                </Flex>
                <Flex direction="row" width="100%" gap="size-200" alignItems="center">
                    <Flex direction="column">
                        <ComboBox
                            label="Select Form Model Definition"
                            defaultItems={comboBoxOptions}
                            onSelectionChange={(key) => {
                                setModelDefinition(key as string);
                                const json = jsonString(getFormDefinition(key as string));
                                setForm(json);
                                setInputForm(json);
                            }}>
                            {(item) => <Item>{item.name}</Item>}
                        </ComboBox>

                    </Flex>
                </Flex>
            </View>
            <View gridArea="sidebar" padding="size-200" paddingBottom="size-1000">
                <Tabs>
                    <TabList>
                        <Item key="json"> Form Json </Item>
                    </TabList>
                    <TabPanels>
                        <Item key="json">
                            <AceEditor mode="json"
                                       value={form}
                                       theme="github"
                                       name="UNIQUE_ID_OF_DIV"
                                       editorProps={{$blockScrolling: true}}
                                       tabSize={2}
                                       onChange={(value: any) => {
                                           setForm(value);
                                           setInputForm("");
                                           setInputForm(value);
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
            <View gridArea="content">
                {inputForm ? <AdaptiveForm formJson={JSON.parse(inputForm)} mappings={mappings} onSubmit={(data) => window.alert(JSON.stringify(data.payload))}/> : 'Loading Form...'}
            </View>
        </Grid>
    );
}

export default App;