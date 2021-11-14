import { Wizard as QWizard } from '@quarry/wizard'
import {FieldsetJson} from '@aemforms/forms-next-core';
import formContext from '@aemforms/forms-next-react-core-components/lib/react-mapper/FormContext';
import React, {useContext} from 'react';
import {renderChildren} from '@aemforms/forms-next-react-core-components/lib/react-mapper/utils';
import {useRuleEngine} from '@aemforms/forms-next-react-core-components/lib/react-mapper/hooks';
const Wizard = function (fieldset: FieldsetJson) {
    const mappings = useContext(formContext).mappings;
    const [props, handlers] = useRuleEngine<FieldsetJson, string>(fieldset);

    if(props.visible) {
        return (<QWizard cancelLabel="Cancel"
                         confirmLabel="Confirm"
                         mode="fullscreen"
                         open
                         title={props.title}
                         onClose={function noRefCheck() {
                         }}>
            {renderChildren(props, mappings, handlers)}
        </QWizard>);
    }
};

export default Wizard;