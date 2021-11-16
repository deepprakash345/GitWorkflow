import TextField from './components/TextField';
import Button from './components/Button';
import Panel from './components/Panel';
import Checkbox from './components/Checkbox';
import RadioGroup from './components/RadioButtonGroup';
import ComboBox from './components/DropDownList';
import PlainText from './components/PlainText';
import FileUploadComponent from './components/FileUpload';
const mappings = {
    'text-input' : TextField,
    'multiline-input' : TextField,
    'checkbox' : Checkbox,
    'button' : Button,
    'panel' : Panel,
    'radio-button' : RadioGroup,
    'number-input' : TextField,
    'date-input' : TextField,
    'drop-down' : ComboBox,
    'plain-text' : PlainText,
    'file-input' : FileUploadComponent
};

export default mappings;