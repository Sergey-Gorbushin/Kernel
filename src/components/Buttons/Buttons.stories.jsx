import React from 'react';
import { DesignSystemSectionPage } from '../shared/DesignSystemSectionPage';
import { Button, BUTTON_SIZE_NAMES } from './Button';
import { colors, monoFontFamily } from '../../styles/tokens';

const SPECS = {
  sm: 'height 28 · font 12/20',
  md: 'height 36 · font 12/20',
  default: 'height 40 · font 14/22',
  lg: 'height 44 · font 16/24',
  xl: 'height 52 · font 16/24',
};

export default {
  title: 'Design System/Buttons',
  parameters: { layout: 'fullscreen' },
  argTypes: {
    showLeftIcon: { control: 'boolean' },
    showRightIcon: { control: 'boolean' },
  },
  args: { showLeftIcon: false, showRightIcon: false },
};

/** All five sizes side by side — toggle the Controls panel to flip left/right icons across every row at once. */
export const Sizes = (args) => (
  <DesignSystemSectionPage title="Кнопки">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-start' }}>
      {BUTTON_SIZE_NAMES.map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
          <Button size={size} showLeftIcon={args.showLeftIcon} showRightIcon={args.showRightIcon}>
            Button Title
          </Button>
          <div style={{ fontFamily: monoFontFamily, fontSize: 11, color: colors.textFaint }}>
            {size} · {SPECS[size]}
          </div>
        </div>
      ))}
    </div>
  </DesignSystemSectionPage>
);

export const Icons = () => (
  <DesignSystemSectionPage title="Кнопки">
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Button showLeftIcon>Left icon</Button>
      <Button showRightIcon>Right icon</Button>
      <Button showLeftIcon showRightIcon>Both</Button>
    </div>
  </DesignSystemSectionPage>
);
Icons.parameters = { controls: { disable: true } };
