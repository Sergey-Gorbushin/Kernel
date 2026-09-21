import React from 'react';
import { DesignSystemSectionPage } from '../shared/DesignSystemSectionPage';
import { Input } from './Input';
import { CONTROL_SIZE_NAMES } from '../../tokens/sizing';
import { colors, monoFontFamily } from '../../styles/tokens';

const SPECS = {
  sm: 'height 28 · radius 6 · font 12/20',
  md: 'height 36 · radius 8 · font 14/22',
  default: 'height 40 · radius 8 · font 14/22',
  lg: 'height 44 · radius 8 · font 14/22',
  xl: 'height 52 · radius 8 · font 14/22',
};

export default {
  title: 'Design System/Inputs',
  parameters: { layout: 'fullscreen' },
  argTypes: {
    showIcon: { control: 'boolean' },
    showLabel: { control: 'boolean' },
    showCaption: { control: 'boolean' },
    showCounter: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { showIcon: true, showLabel: true, showCaption: true, showCounter: true, error: false, disabled: false },
};

/** All five sizes side by side — toggle the Controls panel to flip icon/label/caption/counter/error/disabled across every row at once. */
export const Sizes = (args) => (
  <DesignSystemSectionPage title="Инпуты">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64, maxWidth: 360 }}>
      {CONTROL_SIZE_NAMES.map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Input
            size={size}
            placeholder="Placeholder"
            label={args.showLabel ? 'Field label' : undefined}
            showIcon={args.showIcon}
            error={args.error}
            disabled={args.disabled}
            caption={args.error ? 'Ошибка заполнения поля' : args.showCaption ? 'Caption' : undefined}
            counter={args.showCounter ? '0/200' : undefined}
          />
          <div style={{ fontFamily: monoFontFamily, fontSize: 11, color: colors.textFaint }}>
            {size} · {SPECS[size]}
          </div>
        </div>
      ))}
    </div>
  </DesignSystemSectionPage>
);

export const Password = () => (
  <DesignSystemSectionPage title="Инпуты">
    <div style={{ maxWidth: 360 }}>
      <Input size="default" type="password" label="Пароль" placeholder="Placeholder" />
    </div>
  </DesignSystemSectionPage>
);
Password.parameters = { controls: { disable: true } };

export const Suffix = () => (
  <DesignSystemSectionPage title="Инпуты">
    <div style={{ maxWidth: 360 }}>
      <Input size="default" label="Вес" placeholder="0" suffix="кг" />
    </div>
  </DesignSystemSectionPage>
);
Suffix.parameters = { controls: { disable: true } };
