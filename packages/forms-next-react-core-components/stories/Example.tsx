import {PrettyJson} from "./Pretty";
import {Tabs, TabList, Item, TabPanels} from '@adobe/react-spectrum'
import {Provider as Spectrum3Provider, defaultTheme} from '@adobe/react-spectrum';
import ReactJson from 'react-json-view'
import React, {useState} from "react";
import {Code} from "./Code";
import { Source } from '@storybook/components';

const appCode = `import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum'
import Form from './Form.tsx
function App() {
  return (
    <Spectrum3Provider theme={defaultTheme}>
      <Form />
    </Spectrum3Provider>
  );
} 
`

const Example = ({children, args, highlights, data}) => {
    const json = args.formJson
    const callbacks = Object.keys(args).filter(x => x.startsWith('on'))
    return (<Tabs marginBottom="size-400">
            <TabList>
                <Item key="form">HTML</Item>
                <Item key="json">demo.form.json</Item>
                <Item key="code">Form.tsx</Item>
                <Item key="app">App.tsx</Item>
            </TabList>
            <TabPanels>
                <Item  key="json">
                    <PrettyJson json={json} highlights={highlights}/>
                </Item>
                <Item key="code">
                    <Code callbacks={callbacks}/>
                </Item>
                <Item key="app">
                    <Source language="javascript" code={appCode} />);
                </Item>
                <Item key="form">
                    {children}
                    {data == null ? null: (<><h4>Data</h4><PrettyJson json={data} highlights={[]}/></>)}
                </Item>
            </TabPanels>
        </Tabs>)
}

export default Example