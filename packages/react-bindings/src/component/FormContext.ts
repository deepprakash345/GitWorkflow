import React from 'react';
import {FormModel} from '@aemforms/crispr-core/lib';


type viewApiMap = {
    setFocus: () => void
}

export type IFormContext = {
    mappings: any,
    form: FormModel,
    modelId: string,
    refMap: {
        [key: string]: viewApiMap;
    }
};

//@ts-ignore
const FormContext = React.createContext<IFormContext>({});

export default FormContext;