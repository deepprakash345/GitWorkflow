import defaultMappings from '../mappings';
import React from 'react';
import {Controller} from '@aemforms/forms-next-core/lib/controller/Controller';

export type IFormContext = {
    mappings: any,
    controller?: Controller
};

const FormContext = React.createContext<IFormContext>({
    mappings: defaultMappings
});

export default FormContext;