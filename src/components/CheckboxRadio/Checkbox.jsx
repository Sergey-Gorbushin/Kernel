import React from 'react';
import { colors } from '../../styles/tokens';

const SIZES = {
  md: { box: 16, radius: 2, icon: { w: 9.624, h: 7.622, x: 3.188, y: 4.618, d: 'M 3.417 7.604 L 3.4 7.622 L 0 4.222 L 1.433 2.789 L 3.418 4.774 L 8.192 0 L 9.624 1.433 L 3.435 7.622 L 3.417 7.604 Z' }, dash: { w: 8.8, h: 1.84, x: 3.6, y: 7.08 } },
  lg: { box: 20, radius: 4, icon: { w: 12.03, h: 9.527, x: 3.985, y: 5.771, d: 'M 4.272 9.505 L 4.25 9.527 L 0 5.277 L 1.791 3.486 L 4.272 5.968 L 10.239 0 L 12.03 1.791 L 4.294 9.527 L 4.272 9.505 Z' }, dash: { w: 11, h: 2.3, x: 4.5, y: 8.85 } },
};

export const CHECKBOX_SIZE_NAMES = ['md', 'lg'];

function CheckGlyph({ w, h, x, y, d, color }) {
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" style={{ position: 'absolute', left: x, top: y }}>
      <path d={d} fill={color} />
    </svg>
  );
}

function DashGlyph({ w, h, x, y, color }) {
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" style={{ position: 'absolute', left: x, top: y }}>
      <rect width={w} height={h} fill={color} />
    </svg>
  );
}

/**
 * Checkbox — ported from the "For_claude.fig" file (CheckBox & Radio frame).
 * Two sizes (md 16 / lg 20), states: unchecked, checked, indeterminate,
 * disabled. Checked fill uses `colors.surfaceSelected` (alias for the
 * existing input-focus blue); disabled background/border reuse
 * `colors.pageBg`/`colors.border`, matching Input's disabled convention.
 * Only the bare control is built — the frame's labeled (checkbox+text)
 * variants weren't selected for this handoff.
 *
 * @example
 * <Checkbox checked onChange={setChecked} />
 */
export function Checkbox({ size = 'lg', checked = false, indeterminate = false, disabled = false, onChange, style, className, ...rest }) {
  const s = SIZES[size] || SIZES.lg;
  const isMarked = checked || indeterminate;
  const filled = isMarked && !disabled;
  const glyphColor = disabled ? colors.border : colors.white;
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
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
        borderRadius: s.radius,
        cursor: disabled ? 'default' : 'pointer',
        background: filled ? colors.surfaceSelected : disabled ? colors.pageBg : colors.white,
        boxShadow: filled ? 'none' : `inset 0 0 0 1px ${colors.border}`,
        ...style,
      }}
      {...rest}
    >
      {checked && !indeterminate && <CheckGlyph {...s.icon} color={glyphColor} />}
      {indeterminate && <DashGlyph {...s.dash} color={glyphColor} />}
    </button>
  );
}
export default Checkbox;
