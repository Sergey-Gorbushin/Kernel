import React from 'react';
import { DesignSystemSectionPage } from '../shared/DesignSystemSectionPage';
import { Select } from './Select';
import { CONTROL_SIZE_NAMES } from '../../tokens/sizing';
import { colors, monoFontFamily } from '../../styles/tokens';

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Durian', 'Fig', 'Guava', 'Persimmon', 'Blueberry'];

export default {
  title: 'Design System/Select',
  parameters: { layout: 'fullscreen' },
  argTypes: {
    showIcon: { control: 'boolean' },
    showLabel: { control: 'boolean' },
    showCaption: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { showIcon: false, showLabel: true, showCaption: true, error: false, disabled: false },
};

/** All five sizes side by side — sizes, label, caption and error/disabled states mirror Input 1:1. */
export const Sizes = (args) => (
  <DesignSystemSectionPage title="Select">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64, maxWidth: 360 }}>
      {CONTROL_SIZE_NAMES.map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Select
            size={size}
            options={FRUITS}
            label={args.showLabel ? 'Field' : undefined}
            showIcon={args.showIcon}
            error={args.error}
            disabled={args.disabled}
            caption={args.error ? 'Ошибка заполнения поля' : args.showCaption ? 'Caption' : undefined}
          />
          <div style={{ fontFamily: monoFontFamily, fontSize: 11, color: colors.textFaint }}>{size}</div>
        </div>
      ))}
    </div>
  </DesignSystemSectionPage>
);

/** Multi-select with chips inside the field — chip styling is a placeholder pending a dedicated Figma handoff. */
export const Multiple = () => (
  <DesignSystemSectionPage title="Select">
    <div style={{ maxWidth: 360 }}>
      <Select size="default" label="Fruits" multiple options={FRUITS} defaultValue={['Banana', 'Fig']} caption="Можно выбрать несколько" />
    </div>
  </DesignSystemSectionPage>
);
Multiple.parameters = { controls: { disable: true } };

/** Typing filters the option list directly in the field — no separate search box inside the dropdown. */
export const Searchable = () => (
  <DesignSystemSectionPage title="Select">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 360 }}>
      <Select size="default" label="Fruit" searchable options={FRUITS} placeholder="Начните вводить..." />
      <Select size="default" label="Fruits (search + multiple)" searchable multiple options={FRUITS} placeholder="Начните вводить..." />
    </div>
  </DesignSystemSectionPage>
);
Searchable.parameters = { controls: { disable: true } };

/** Confirms the dropdown escapes a clipping/overlapping ancestor via a portal into document.body, instead of being covered by it. */
export const OverlapStressTest = () => (
  <DesignSystemSectionPage title="Select">
    <div style={{ position: 'relative', maxWidth: 360 }}>
      <div style={{ overflow: 'hidden', height: 90, border: `1px solid ${colors.border}`, borderRadius: 8, padding: 12, boxSizing: 'border-box' }}>
        <Select size="default" label="Fruit (parent clips overflow)" options={FRUITS} />
      </div>
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 40,
          width: 200,
          height: 120,
          background: colors.navActiveBg,
          border: `1px solid ${colors.border}`,
          borderRadius: 8,
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: monoFontFamily,
          fontSize: 11,
          color: colors.textFaint,
        }}
      >
        sibling with z-index: 5
      </div>
    </div>
  </DesignSystemSectionPage>
);
OverlapStressTest.parameters = { controls: { disable: true } };
