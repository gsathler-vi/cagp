import React from 'react';
import { LinearHud } from './LinearHud';
import { ExtensionForm } from './ExtensionForm';
import { AacForm } from './AacForm';

export const Calculator600h: React.FC = () => {
  return (
    <div className="space-y-4">
      <LinearHud />
      <ExtensionForm />
      <AacForm />
    </div>
  );
};
