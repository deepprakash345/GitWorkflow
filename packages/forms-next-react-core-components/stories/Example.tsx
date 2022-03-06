import {PrettyJson} from "./Pretty";
import {Tabs, TabList, Item, TabPanels} from '@adobe/react-spectrum'
import {Provider as Spectrum3Provider, defaultTheme} from '@adobe/react-spectrum';
import ReactJson from 'react-json-view'
import {useState} from "react";
import {Code} from "./Code";

const Example = ({children, args, highlights, data}) => {
    const json = args.formJson
    const callbacks = Object.keys(args).filter(x => x.startsWith('on'))
    return (<Tabs marginBottom="size-400">
            <TabList>
                <Item key="form">HTML</Item>
                <Item key="json">Form.json</Item>
                <Item key="code">Form.tsx</Item>
            </TabList>
            <TabPanels>
                <Item  key="json">
                    <PrettyJson json={json} highlights={highlights}/>
                </Item>
                <Item key="code">
                    <Code json={json} callbacks={callbacks}/>
                </Item>
                <Item key="form">
                    {children}
                    {data == null ? null: (<><h4>Data</h4><PrettyJson json={data} highlights={[]}/></>)}
                </Item>
            </TabPanels>
        </Tabs>)
}

export default Example