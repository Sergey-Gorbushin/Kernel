import React from 'react';
import { colors } from '../../styles/tokens';

const SIZES = { md: { box: 16, dot: 8 }, lg: { box: 20, dot: 10 } };

export const RADIO_SIZE_NAMES = ['md', 'lg'];

/**
 * Radio — ported from the "For_claude.fig" file (CheckBox & Radio frame).
 * Two sizes (md 16 / lg 20), states: unchecked, checked, disabled. Checked
 * ring/dot use `colors.surfaceSelected` (same blue alias as Checkbox);
 * disabled background/border reuse `colors.pageBg`/`colors.border`.
 *
 * @example
 * <Radio checked onChange={setChecked} />
 */
export function Radio({ size = 'lg', checked = false, disabled = false, onChange, style, className, ...rest }) {
  const s = SIZES[size] || SIZES.lg;
  const dotColor = disabled ? colors.border : colors.surfaceSelected;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange && onChange(!checked)}
      className={className}
      style={{
        width: s.box,
        height: s.box,
        padding: 0,
        border: 'none',
        position: 'relative',
        flexShrink: 0,
        borderRadius: '50%',
        cursor: disabled ? 'default' : 'pointer',
        background: disabled ? colors.pageBg : colors.white,
        boxShadow: checked && !disabled ? `inset 0 0 0 1px ${colors.surfaceSelected}` : `inset 0 0 0 1px ${colors.border}`,
        ...style,
      }}
      {...rest}
    >
      {checked && (
        <span style={{ position: 'absolute', left: (s.box - s.dot) / 2, top: (s.box - s.dot) / 2, width: s.dot, height: s.dot, borderRadius: '50%', background: dotColor }} />
      )}
    </button>
  );
}
export default Radio;
