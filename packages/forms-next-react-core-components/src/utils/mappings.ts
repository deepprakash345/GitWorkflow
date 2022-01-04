import TextField from '../components/TextField';
import Button from '../components/Button';
import Panel from '../components/Panel';
import Checkbox from '../components/Checkbox';
import RadioGroup from '../components/RadioButtonGroup';
import ComboBox from '../components/DropDownList';
import PlainText from '../components/PlainText';
import FileUploadComponent from '../components/FileUpload';
import Repeater from '../components/Repeater';
import NumberField from '../components/NumberField';
import Accordion from '../components/Accordion';
import Tabs from '../components/Tabs';
import DateField from '../components/Date';

const mappings = {
    'text-input' : TextField,
    'multiline-input' : TextField,
    'checkbox' : Checkbox,
    'button' : Button,
    'panel' : Panel,
    'radio-button' : RadioGroup,
    'number-input' : NumberField,
    'date-input' : DateField,
    'drop-down' : ComboBox,
    'plain-text' : PlainText,
    'file-input' : FileUploadComponent,
    'repeater' : Repeater,
    'accordion': Accordion,
    'tabs': Tabs
};

export default mappings;