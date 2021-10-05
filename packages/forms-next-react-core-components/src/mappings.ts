import TextField from './components/TextField';
import Button from './components/Button';
import Panel from './components/Panel';
import Checkbox from './components/Checkbox';
import RadioGroup from './components/RadioButtonGroup';
import ComboBox from './components/DropDownList';
const mappings = {
    'fd/af/components/guidetextbox' : TextField,
    'fd/af/components/guidecheckbox' : Checkbox,
    'fd/af/components/guidebutton' : Button,
    'fd/af/components/rootPanel' : Panel,
    'fd/af/components/panel' : Panel,
    'fd/af/components/guideradiobutton' : RadioGroup,
    'fd/af/components/guidedatefield' : TextField,
    'fd/af/components/guidenumericfield' : TextField,
    'fd/af/components/guidedropdownlist' : ComboBox
};

export default mappings;