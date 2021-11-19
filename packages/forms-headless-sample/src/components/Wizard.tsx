import { Wizard as QWizard } from '@quarry/wizard'
import {FieldsetJson} from '@aemforms/forms-next-core';
import React, {useContext} from 'react';
import {useRuleEngine, renderChildren, FormContext} from "@aemforms/forms-next-react-bindings";
const Wizard = function (fieldset: FieldsetJson & {id: string}) {
    const mappings = useContext(FormContext).mappings;
    const [props, handlers] = useRuleEngine(fieldset);

    if(props.visible) {
        return (<QWizard cancelLabel="Cancel"
                         confirmLabel="Confirm"
                         mode="fullscreen"
                         open
                         title={props.label?.value}
                         onClose={function noRefCheck() {
                         }}>
            {renderChildren(props, mappings, handlers)}
        </QWizard>);
    }
};

export default Wizard;