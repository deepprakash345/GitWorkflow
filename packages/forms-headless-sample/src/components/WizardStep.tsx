import { WizardStep as QWizardStep } from '@quarry/wizard'
import {FieldsetJson} from '@aemforms/forms-next-core';
import formContext from '@aemforms/forms-next-react-core-components/lib/react-mapper/FormContext';
import React, {useContext} from 'react';
import {renderChildren} from '@aemforms/forms-next-react-core-components/lib/react-mapper/utils';
import {useRuleEngine} from '@aemforms/forms-next-react-core-components/lib/react-mapper/hooks';
const WizardStep = function (originalProps: FieldsetJson & {id: string}) {
    const mappings = useContext(formContext).mappings;
    const [props, handlers] = useRuleEngine(originalProps);

    if (props.visible) {
        return (<QWizardStep
            title={props.label?.value}>
            <React.Fragment key=".0">
                {renderChildren(props, mappings, handlers)}
            </React.Fragment>
        </QWizardStep>)
    }
};

export default WizardStep;