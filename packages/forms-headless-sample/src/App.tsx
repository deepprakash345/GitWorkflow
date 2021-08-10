import React from 'react';
import './App.css';
import { Grid, View, TextField, TextArea, Button, Flex } from '@adobe/react-spectrum'
import json from './samples/contact-us.json';
import { fetchForm, FormModel } from "@adobe/forms-next-core"
import Form from '@adobe/forms-next-react-core-components/lib/components/Form'
import mappings from '@adobe/forms-next-react-core-components/lib/mappings'
import {createFormInstance} from "@adobe/forms-next-core/lib";


function App() {
  let [value, setValue] = React.useState('');
  let [form, setForm] = React.useState<FormModel>(createFormInstance(json));

  const fetchAF = async () => {
    const data = await fetchForm(value);
    setForm(JSON.parse(data));
  }

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
        <TextArea label="JSON Model" minWidth="100%" minHeight="size-6000" value={JSON.stringify(form)} />
      </View>
      <View gridArea="content" >
        {form != null? <Form form={form} mappings={mappings}></Form> : ""}
      </View>
    </Grid>
  );
}

export default App;