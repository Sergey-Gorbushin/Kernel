import React from 'react';
import { DesignSystemSectionPage } from '../shared/DesignSystemSectionPage';
import { palette, monoFontFamily } from '../../styles/tokens';

export default {
  title: 'Design System/Colors',
  parameters: { layout: 'fullscreen' },
};

const LIGHT_TEXT_STEPS = new Set([5, 6, 7, 8, 9]);

function Ramp({ name, steps }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      {steps.map((hex, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 12px',
            background: hex,
            color: LIGHT_TEXT_STEPS.has(i) ? '#fff' : '#262626',
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 600 }}>{`${name}.${i}`}</div>
          <div style={{ fontSize: 10, fontFamily: monoFontFamily, opacity: 0.7 }}>{`--palette-${name.toLowerCase()}-${i}`}</div>
        </div>
      ))}
    </div>
  );
}

/** Five 10-step color ramps — Grey, Blue, Cryola, Green, Amethyst — 0 (lightest) to 9 (darkest), .5 is the base/reference shade. */
export const Palettes = () => (
  <DesignSystemSectionPage title="Цветовые палитры">
    <div style={{ display: 'flex', gap: 0, height: 600 }}>
      <Ramp name="Grey" steps={palette.grey} />
      <Ramp name="Blue" steps={palette.blue} />
      <Ramp name="Cryola" steps={palette.cryola} />
      <Ramp name="Green" steps={palette.green} />
      <Ramp name="Amethyst" steps={palette.amethyst} />
    </div>
  </DesignSystemSectionPage>
);
Palettes.parameters = { controls: { disable: true } };
