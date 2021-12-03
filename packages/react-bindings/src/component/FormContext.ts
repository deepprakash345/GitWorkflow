import React from 'react';
import {FormModel} from '@aemforms/forms-next-core/lib';

export type IFormContext = {
    mappings: any,
    form?: FormModel
};

const FormContext = React.createContext<IFormContext>({
    mappings: {}
});

export default FormContext;