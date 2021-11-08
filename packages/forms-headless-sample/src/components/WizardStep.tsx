import { WizardStep as QWizardStep } from '@quarry/wizard'
import {FieldsetJson} from '@adobe/forms-next-core';
import formContext from '@adobe/forms-next-react-core-components/lib/react-mapper/FormContext';
import React, {useContext} from 'react';
import {renderChildren} from '@adobe/forms-next-react-core-components/lib/react-mapper/utils';
import {useRuleEngine} from '@adobe/forms-next-react-core-components/lib/react-mapper/hooks';
const WizardStep = function (originalProps: FieldsetJson) {
    const mappings = useContext(formContext).mappings;
    const [props, handlers] = useRuleEngine<FieldsetJson, string>(originalProps);

    if (props.visible) {
        return (<QWizardStep
            title={props.title}>
            <React.Fragment key=".0">
                {renderChildren(props, mappings, handlers)}
            </React.Fragment>
        </QWizardStep>)
    }
};

export default WizardStep;