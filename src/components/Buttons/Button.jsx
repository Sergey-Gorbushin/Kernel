import React from 'react';
import { Menu } from 'lucide-react';
import { colors } from '../../styles/tokens';
import { FONT_FAMILY } from '../../tokens/typography';

// Ported from the "For_claude.fig" Buttons page (Primary Buttons V2 component
// set). Heights/radii match the shared control sizes (Input/Select), but
// Button's own type scale and icon/text gaps are a separate axis defined in
// the frame — not a 1:1 reuse of tokens/sizing.js's controlSizes.
const BUTTON_SIZES = {
  sm: { height: 28, radius: 6, minWidth: 48, padding: '2px 6px', gap: 0, iconGap: 2, textGap: 4, fontSize: 12, lineHeight: 20, icon: 12 },
  md: { height: 36, radius: 8, minWidth: 48, padding: '2px 8px', gap: 0, iconGap: 2, textGap: 4, fontSize: 12, lineHeight: 20, icon: 12 },
  default: { height: 40, radius: 8, minWidth: 72, padding: '9px 12px', gap: 4, iconGap: 2, textGap: 4, fontSize: 14, lineHeight: 22, icon: 16 },
  lg: { height: 44, radius: 8, minWidth: 88, padding: '10px 12px', gap: 4, iconGap: 2, textGap: 4, fontSize: 16, lineHeight: 24, icon: 18 },
  xl: { height: 52, radius: 8, minWidth: 96, padding: '14px 16px', gap: 4, iconGap: 2, textGap: 4, fontSize: 16, lineHeight: 24, icon: 18 },
};

export const BUTTON_SIZE_NAMES = ['sm', 'md', 'default', 'lg', 'xl'];

/**
 * Primary (filled) button — sizes only for now; color palette and other
 * button types (outline/link/dashed/ghost) and a hover/disabled visual spec
 * are not yet defined in the design system, so only the fill color
 * (`colors.surfaceButtonFill`) and text color (`colors.textOnDark`) are set.
 * Optional left/right icon slots default to the lucide "menu" glyph, standing
 * in for the source Figma file's own placeholder icon component.
 *
 * @example
 * <Button size="default" showLeftIcon>Button Title</Button>
 */
export function Button({ size = 'default', showLeftIcon = false, showRightIcon = false, icon, children = 'Button Title', style, ...rest }) {
  const s = BUTTON_SIZES[size] || BUTTON_SIZES.default;
  return (
    <button
      type="button"
      {...rest}
      style={{
        width: 'fit-content',
        height: s.height,
        minWidth: s.minWidth,
        overflow: 'hidden',
        borderRadius: s.radius,
        backgroundColor: colors.surfaceButtonFill,
        display: 'flex',
        flexDirection: 'row',
        gap: s.gap,
        padding: s.padding,
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        boxSizing: 'border-box',
        border: 'none',
        cursor: 'pointer',
        ...style,
      }}
    >
      {showLeftIcon && (
        <span style={{ display: 'flex', flexShrink: 0, margin: `0 ${s.iconGap}px`, color: colors.textOnDark }}>
          {icon || <Menu size={s.icon} />}
        </span>
      )}
      <span style={{ fontFamily: FONT_FAMILY, fontWeight: 400, fontSize: s.fontSize, lineHeight: `${s.lineHeight}px`, whiteSpace: 'nowrap', color: colors.textOnDark, margin: `0 ${s.textGap}px` }}>
        {children}
      </span>
      {showRightIcon && (
        <span style={{ display: 'flex', flexShrink: 0, margin: `0 ${s.iconGap}px`, color: colors.textOnDark }}>
          {icon || <Menu size={s.icon} />}
        </span>
      )}
    </button>
  );
}
export default Button;
