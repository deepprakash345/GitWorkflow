import React from 'react';
import {FormModel} from '@aemforms/forms-next-core/lib';

export type IFormContext = {
    mappings: any,
    form: FormModel,
    modelId: string
};

//@ts-ignore
const FormContext = React.createContext<IFormContext>({});

export default FormContext;