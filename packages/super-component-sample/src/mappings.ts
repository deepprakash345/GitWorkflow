import Wizard from './components/Wizard';
import WizardStep from './components/WizardStep';
import mappings from '@adobe/forms-next-react-core-components/lib/mappings'
const newMappings: any = {
    'fd/af/components/wizard' : Wizard,
    'fd/af/components/wizardstep' : WizardStep,
    ...mappings
};

export default newMappings;