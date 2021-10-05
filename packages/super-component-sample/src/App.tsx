import React from 'react';
import './App.css';
import {Grid, View, Flex} from '@adobe/react-spectrum'
import { RadioGroup, Radio } from '@adobe/react-spectrum';
import wizard from './samples/wizard.json';
import contentFragment from './samples/contentFragment.json';
import assets from './samples/assets.json';
import mappings from './mappings'
import AdaptiveForm from "@adobe/forms-next-react-core-components/lib/components/AdaptiveForm";
import {FormJson} from "@adobe/forms-next-core";

function App() {
    let [selected, setSelected] = React.useState('wizard');
    function getFormDefintion(selection: String) {
        let jsonDefinition : FormJson = wizard;
        if (selection === "contentFragment") {
            jsonDefinition = contentFragment
        } else if (selection === "assets") {
            jsonDefinition = assets
        }
        return jsonDefinition;
    }
    return (
        <Grid
            areas={['header', 'content']}
            columns={['2fr', '2fr']}
            rows={['size-1000', 'auto']}
            marginX="size-400"
            marginTop="size-400"
            gap="size-500">
            <View gridArea="header">
                <RadioGroup
                    label="Select Form Model Definition"
                    defaultValue="wizard"
                    value={selected}
                    onChange={setSelected}
                    isEmphasized>
                    <Radio value="wizard">Quarry</Radio>
                    <Radio value="contentFragment">Content Fragment</Radio>
                    <Radio value="assets">Service Integration</Radio>
                </RadioGroup>
            </View>
            <View gridArea="content">
                {getFormDefintion(selected) !== undefined ? (
                    <AdaptiveForm formJson={getFormDefintion(selected)} mappings={mappings} onSubmit={(data) => window.alert(JSON.stringify(data.payload))}/>
                ) : 'Loading Form...'}
            </View>
        </Grid>
    );
}

export default App;