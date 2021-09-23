import React, {useEffect, useRef} from 'react';
import './App.css';
import {Grid, View} from '@adobe/react-spectrum'
import json from './samples/wizard.json';
import mappings from './mappings'
import AdaptiveForm from "@adobe/forms-next-react-core-components/lib/components/AdaptiveForm";


function App() {
    return (
        <Grid>
            <View gridArea="content">
                {json !== undefined ? (
                    <AdaptiveForm formJson={json} mappings={mappings} onSubmit={(data) => window.alert(JSON.stringify(data))}/>
                ) : 'Loading Form...'}
            </View>
        </Grid>
    );
}

export default App;