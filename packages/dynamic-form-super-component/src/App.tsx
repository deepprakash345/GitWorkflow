import React, {useEffect, useRef} from 'react';
import './App.css';
import {Grid, View} from '@adobe/react-spectrum'
import json from './samples/wizard.json';
import mappings from './mappings'
import DynamicForm from "@adobe/forms-next-react-core-components/lib/components/DynamicForm";

const {REACT_APP_AEM_URL} = process.env;
const token_required = process.env.REACT_APP_AUTH_REQUIRED === "true"



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