import React, {useEffect, useRef} from 'react';
import './App.css';
import { Grid, View, TextField, TextArea, Button, Flex } from '@adobe/react-spectrum'
import json from './samples/contact-us.json';
import { fetchForm, FormModel } from "@adobe/forms-next-core"
import Form from '@adobe/forms-next-react-core-components/lib/components/Form'
import mappings from '@adobe/forms-next-react-core-components/lib/mappings'
import {createFormInstance} from "@adobe/forms-next-core/lib";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import ace from 'ace-builds'

function App() {
  let [value, setValue] = React.useState('');
  let [form, setForm] = React.useState(json);
  const aceEditor = useRef(null);
  const fetchAF = async () => {
    const data = await fetchForm(value);
    setForm(JSON.parse(data));
  }

    useEffect(() => {
        if (aceEditor.current) {
            const editor = (aceEditor as any).current.editor
        }
    })



  return (
    <Grid
      areas={['header  header', 'sidebar content']}
      columns={['1fr', '3fr']}
      rows={['size-1000', 'auto']}
      height="100%"
      marginX="size-400"
      marginTop="size-400"
      gap="size-500">
      <View gridArea="header" >
        <Flex direction="row" width="100%" gap="size-1000" alignItems="end">
          <TextField label="Enter Form URL" width="size-3600" value={value} onChange={(v) => setValue(v)}></TextField>
          <Button variant="primary" width="size-3600" onPress={() => fetchAF()}>Fetch Form</Button>
        </Flex>
      </View>
      <View gridArea="sidebar" padding="size-200" paddingBottom="size-1000" >
          <AceEditor
              ref={aceEditor}
              className="form_ace_editor"
              mode="json"
              value={JSON.stringify(form, null, 2)}
              theme="github"
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
              tabSize={2}
              onChange={(value: any) => setForm(value)}
              setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true
              }}
          />
      </View>
      <View gridArea="content" >
        {form != null? <Form formJson={form} mappings={mappings}></Form> : ""}
      </View>
    </Grid>
  );
}

export default App;