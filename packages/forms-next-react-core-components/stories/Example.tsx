import {PrettyJson} from "./Pretty";
import {Tabs, TabList, Item, TabPanels} from '@adobe/react-spectrum'
import {Provider as Spectrum3Provider, defaultTheme} from '@adobe/react-spectrum';
import ReactJson from 'react-json-view'
import {useState} from "react";
import {Code} from "./Code";
const Example = ({Component, args}) => {
    const [data, setData] = useState(null)
    const json = args.formJson
    const wrapSubmit = (action) => {
        setData(action.target.exportData())
    }
    const callbacks = Object.keys(args).filter(x => x.startsWith('on'))
    return (<Spectrum3Provider theme={defaultTheme}>
        <Tabs>
            <TabList>
                <Item key="form">HTML</Item>
                <Item key="json">Form.json</Item>
                <Item key="code">Form.tsx</Item>
            </TabList>
            <TabPanels>
                <Item  key="json">
                    <PrettyJson json={json} />
                </Item>
                <Item key="code">
                    <Code json={json} callbacks={callbacks}/>
                </Item>
                <Item key="form">
                    <Component args={{...args, onSubmit: args.onSubmit ? wrapSubmit : undefined}}/>
                    {data == null ? null: (<><h2>Data</h2><PrettyJson json={data} /></>)}
                </Item>
            </TabPanels>
        </Tabs>
    </Spectrum3Provider>)
}

export default Example