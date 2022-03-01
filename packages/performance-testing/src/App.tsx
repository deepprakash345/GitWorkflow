import React from 'react';
import './App.css';
// @ts-ignore
import { mappings } from "@aemforms/crispr-react-core-components";
// @ts-ignore
import { AdaptiveForm } from "@aemforms/crispr-react-bindings";
// import formJson from "./JSON/form.json";
import formJson from "./JSON/smallForm.form.json";


const App = () => {
  return <div className="container"><AdaptiveForm formJson={formJson} mappings={mappings} /></div >
}
export default App;