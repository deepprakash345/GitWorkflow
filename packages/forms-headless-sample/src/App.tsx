import React from 'react';
import './App.css';
import { Grid, View, TextField, TextArea, Button, Flex } from '@adobe/react-spectrum'

function App() {
  let [value, setValue] = React.useState('');

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
          <Button variant="primary" width="size-3600">Fetch Form</Button>
        </Flex>
      </View>
      <View gridArea="sidebar" padding="size-200" paddingBottom="size-1000">
        <TextArea label="JSON Model" minWidth="100%" minHeight="size-6000" />
      </View>
      <View gridArea="content" >
        Display the Form Here
      </View>
    </Grid>
  );
}

export default App;