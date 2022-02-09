import React from 'react';
import './App.css';
// @ts-ignore
import mappings from "@aemforms/forms-next-react-core-components/lib/utils/mappings";
// @ts-ignore
import { AdaptiveForm } from "@aemforms/forms-next-react-bindings";
// import formJson from "./JSON/form.json";
import formJson from "./JSON/smallForm.json";


const App = () => {
  return <div className="container"><AdaptiveForm formJson={formJson} mappings={mappings} /></div >
}
export default App;