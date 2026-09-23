import React from 'react';
import { DesignSystemSectionPage } from '../shared/DesignSystemSectionPage';
import { Checkbox } from '../CheckboxRadio/Checkbox';
import { TabBar } from './TabBar';
import { ACCENT_THEME_NAMES, colors, monoFontFamily, palette, uiFontFamily } from '../../styles/tokens';
import { shadows } from '../../tokens/elevation';

export default {
  title: 'Design System/Tab bar',
  parameters: { layout: 'fullscreen' },
};

const label = { fontFamily: monoFontFamily, fontSize: 11, color: colors.textFaint, marginBottom: 8 };

function Segmented({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 4, padding: 2, background: palette.grey[1], borderRadius: 8, width: 'fit-content' }}>
      {options.map((o) => {
        const on = value === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            style={{
              fontFamily: uiFontFamily,
              fontSize: 12,
              padding: '5px 10px',
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              background: on ? colors.white : 'transparent',
              color: on ? colors.textStrong : colors.textMuted,
              fontWeight: on ? 600 : 400,
              boxShadow: on ? shadows.dropdown : 'none',
            }}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

const ITEMS = [
  { value: 'info', label: 'ОБЩАЯ ИНФОРМАЦИЯ', counter: 22 },
  { value: 'docs', label: 'ДОКУМЕНТЫ', counter: 5 },
  { value: 'history', label: 'ИСТОРИЯ', counter: 12 },
];

/** Click / hover the tabs; the counter toggle applies to all items; the theme switch sets the product accent (data-theme). */
export const Default = () => {
  const [value, setValue] = React.useState('info');
  const [showCounter, setShowCounter] = React.useState(true);
  const [theme, setTheme] = React.useState('neutral');
  const items = showCounter ? ITEMS : ITEMS.map((it) => ({ ...it, counter: undefined }));
  return (
    <DesignSystemSectionPage title="Таб бар">
      <div data-theme={theme} style={{ padding: 24, background: colors.white }}>
        <div style={label}>product theme (data-theme)</div>
        <div style={{ marginBottom: 16 }}>
          <Segmented options={ACCENT_THEME_NAMES} value={theme} onChange={setTheme} />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, cursor: 'pointer', ...label }}>
          <Checkbox checked={showCounter} onChange={setShowCounter} />
          <span>show counter</span>
        </label>
        <TabBar items={items} value={value} onChange={setValue} />
      </div>
    </DesignSystemSectionPage>
  );
};
Default.parameters = { controls: { disable: true } };
