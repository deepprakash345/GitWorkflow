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

import React from 'react';
import { render } from '@testing-library/react';
// @ts-ignore
import Spectrum2Provider from '@react/react-spectrum/Provider';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import { AdaptiveForm } from "@adobe/aem-forms-af-super-component";
import { mappings } from '@adobe/aem-forms-af-react-components';

interface RenderType {
  formJson: any,
  onInitialize?: any,
  localizationMessages?: any,
  locale?: any
}

export const renderComponent = (params: RenderType) => {
  return render(
    <Spectrum2Provider >
      <Spectrum3Provider theme={defaultTheme}>
        <AdaptiveForm mappings={mappings} locale='en' {...params} />
      </Spectrum3Provider>
    </Spectrum2Provider >
  );
};