import Wizard from './components/Wizard';
import WizardStep from './components/WizardStep';
import mappings from "@aemforms/forms-next-react-core-components/lib/utils/mappings";
const newMappings: any = {
    'custom:fd/af/components/wizard' : Wizard,
    'custom:fd/af/components/wizardstep' : WizardStep,
    ...mappings
};

export default newMappings;