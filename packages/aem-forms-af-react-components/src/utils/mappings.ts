/*
 *
 *  Copyright 2022 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *   of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software distributed under
 *   the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

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
import DateField from '../components/Date';
import CheckboxGroup from '../components/CheckboxGroup';
import HorizontalFlex from '../components/flex/HorizontalFlex';
import VerticalFlex from '../components/flex/VerticalFlex';
import HorizontalTab from '../components/tabs/HorizontalTabs';
import VerticalTab from '../components/tabs/VerticalTabs';
import PasswordField from '../components/Password';

const mappings = {
    'text-input' : TextField,
    'multiline-input' : TextField,
    'checkbox' : Checkbox,
    'button' : Button,
    'panel' : Panel,
    'radio-group' : RadioGroup,
    'number-input' : NumberField,
    'date-input' : DateField,
    'drop-down' : ComboBox,
    'plain-text' : PlainText,
    'file-input' : FileUploadComponent,
    'repeater' : Repeater,
    'custom:accordion': Accordion,
    'checkbox-group': CheckboxGroup,
    'custom:vertical-flex': VerticalFlex,
    'custom:horizontal-flex': HorizontalFlex,
    'custom:vertical-tab': VerticalTab,
    'custom:horizontal-tab': HorizontalTab,
    'password-input' : PasswordField
};

export default mappings;