import React, {useEffect, useRef} from 'react';
import './App.css';
import {Grid, View} from '@adobe/react-spectrum'
import json from './samples/wizard.json';
import mappings from './mappings'
import DynamicForm from "@adobe/forms-next-react-core-components/lib/components/DynamicForm";


function App() {
    return (
        <Grid>
            <View gridArea="content">
                {json !== undefined ? (
                    <DynamicForm formJson={json} mappings={mappings} onSubmit={(data) => window.alert(JSON.stringify(data))}/>
                ) : 'Loading Form...'}
            </View>
        </Grid>
    );
}

export default App;