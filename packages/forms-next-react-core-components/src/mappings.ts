import TextField from './components/TextField';
import Button from './components/Button';
import Panel from './components/Panel';
import Checkbox from './components/Checkbox';
const mappings: any = {
    'fd/af/components/guidetextbox' : TextField,
    'fd/af/components/guidecheckbox' : Checkbox,
    'fd/af/components/guidebutton' : Button,
    'fd/af/components/rootPanel' : Panel
};

export default mappings;