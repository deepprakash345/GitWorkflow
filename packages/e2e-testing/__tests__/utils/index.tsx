import React from 'react';
import { render } from '@testing-library/react';
// @ts-ignore
import Spectrum2Provider from '@react/react-spectrum/Provider';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum';
import { AdaptiveForm } from "@aemforms/forms-super-component";
import { mappings } from '@aemforms/forms-react-components';

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