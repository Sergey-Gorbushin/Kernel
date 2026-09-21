import React from 'react';
import { DesignSystemSectionPage } from '../shared/DesignSystemSectionPage';
import { Checkbox, CHECKBOX_SIZE_NAMES } from './Checkbox';
import { Radio, RADIO_SIZE_NAMES } from './Radio';
import { colors, monoFontFamily } from '../../styles/tokens';

export default {
  title: 'Design System/Checkbox & Radio',
  parameters: { layout: 'fullscreen' },
};

function Row({ label, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <div style={{ width: 120, fontFamily: monoFontFamily, fontSize: 11, color: colors.textFaint }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>{children}</div>
    </div>
  );
}

export const Checkboxes = () => {
  const [checked, setChecked] = React.useState(true);
  return (
    <DesignSystemSectionPage title="Чекбоксы и радио">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {CHECKBOX_SIZE_NAMES.map((size) => (
          <Row key={size} label={size}>
            <Checkbox size={size} checked={false} />
            <Checkbox size={size} checked={checked} onChange={setChecked} />
            <Checkbox size={size} indeterminate />
            <Checkbox size={size} checked disabled />
            <Checkbox size={size} disabled />
          </Row>
        ))}
      </div>
    </DesignSystemSectionPage>
  );
};
Checkboxes.parameters = { controls: { disable: true } };

export const Radios = () => {
  const [checked, setChecked] = React.useState('a');
  return (
    <DesignSystemSectionPage title="Чекбоксы и радио">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {RADIO_SIZE_NAMES.map((size) => (
          <Row key={size} label={size}>
            <Radio size={size} checked={checked === 'a'} onChange={() => setChecked('a')} />
            <Radio size={size} checked={checked === 'b'} onChange={() => setChecked('b')} />
            <Radio size={size} checked disabled />
            <Radio size={size} disabled />
          </Row>
        ))}
      </div>
    </DesignSystemSectionPage>
  );
};
Radios.parameters = { controls: { disable: true } };
