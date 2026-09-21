import React from 'react';
import { DesignSystemSectionPage } from '../shared/DesignSystemSectionPage';
import { Textarea } from './Textarea';
import { CONTROL_SIZE_NAMES } from '../../tokens/sizing';
import { colors, monoFontFamily } from '../../styles/tokens';

export default {
  title: 'Design System/Textarea',
  parameters: { layout: 'fullscreen' },
  argTypes: {
    showLabel: { control: 'boolean' },
    showCaption: { control: 'boolean' },
    showCounter: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { showLabel: true, showCaption: true, showCounter: true, error: false, disabled: false },
};

/** All five sizes side by side — sizes mirror Input; min-heights are inferred (not sourced from Figma). */
export const Sizes = (args) => (
  <DesignSystemSectionPage title="Textarea">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 360 }}>
      {CONTROL_SIZE_NAMES.map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Textarea
            size={size}
            placeholder="Placeholder"
            label={args.showLabel ? 'Field label' : undefined}
            error={args.error}
            disabled={args.disabled}
            caption={args.error ? 'Ошибка заполнения поля' : args.showCaption ? 'Caption' : undefined}
            counter={args.showCounter ? '0/200' : undefined}
          />
          <div style={{ fontFamily: monoFontFamily, fontSize: 11, color: colors.textFaint }}>{size}</div>
        </div>
      ))}
    </div>
  </DesignSystemSectionPage>
);
