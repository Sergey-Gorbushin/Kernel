import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { colors, palette } from '../../styles/tokens';
import { FONT_FAMILY } from '../../tokens/typography';
import { shadows } from '../../tokens/elevation';

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
export const BUTTON_VARIANT_NAMES = ['neutral', 'secondary', 'accent', 'outline'];
export const BUTTON_ACCENT_COLOR_NAMES = ['blue', 'cryola', 'green', 'amethyst'];

const SPIN_KEYFRAMES_ID = 'kernel-button-spin-keyframes';
function ensureSpinKeyframes() {
  if (typeof document === 'undefined' || document.getElementById(SPIN_KEYFRAMES_ID)) return;
  const style = document.createElement('style');
  style.id = SPIN_KEYFRAMES_ID;
  style.textContent = '@keyframes kernel-button-spin { to { transform: translate(-50%, -50%) rotate(360deg); } }';
  document.head.appendChild(style);
}

function variantColors(variant, color, hovered) {
  if (variant === 'outline') {
    return {
      fill: hovered ? palette.grey[0] : colors.white,
      text: palette.grey[6],
      border: `1px solid ${palette.grey[3]}`,
      boxShadow: shadows.buttonOutline,
    };
  }
  if (variant === 'secondary') {
    return {
      fill: hovered ? colors.surfaceButtonSecondaryFillHover : colors.surfaceButtonSecondaryFill,
      text: colors.surfaceButtonSecondaryText,
    };
  }
  if (variant === 'accent') {
    const ramp = palette[color];
    if (!ramp) {
      // No explicit palette — follow the product accent (data-theme).
      return { fill: hovered ? colors.surfaceButtonAccentHover : colors.surfaceButtonAccent, text: colors.textOnDark };
    }
    return { fill: hovered ? ramp[4] : ramp[5], text: colors.textOnDark };
  }
  return {
    fill: hovered ? colors.surfaceButtonFillHover : colors.surfaceButtonFill,
    text: colors.textOnDark,
  };
}

/**
 * Primary/secondary/accent button. Optional left/right icon slots default to
 * the lucide "menu" glyph, standing in for the source Figma file's own
 * placeholder icon component.
 *
 * `variant="accent"` fills with the palette's .5 shade (hover .4). Pass
 * `color` to pin a palette; omit it to follow the product accent set by a
 * `data-theme` wrapper (neutral by default — see accentThemes in tokens.js).
 * `variant="outline"` is a1 fill with a 1px grey.3 border and a soft shadow,
 * hover grey.0, grey.6 text/icons — per the user's reference screenshot.
 *
 * @example
 * <Button size="default" variant="accent" showLeftIcon>Button Title</Button>
 * <Button variant="accent" color="blue">Always blue</Button>
 */
export function Button({
  size = 'default',
  variant = 'neutral',
  color,
  disabled = false,
  loading = false,
  showLeftIcon = false,
  showRightIcon = false,
  icon,
  children = 'Button Title',
  style,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) {
  const s = BUTTON_SIZES[size] || BUTTON_SIZES.default;
  const [hovered, setHovered] = useState(false);
  if (loading) ensureSpinKeyframes();
  const { fill, text, border, boxShadow } = variantColors(variant, color, hovered);

  return (
    <button
      type="button"
      disabled={disabled}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); onMouseLeave?.(e); }}
      {...rest}
      style={{
        position: 'relative',
        width: 'fit-content',
        height: s.height,
        minWidth: s.minWidth,
        borderRadius: s.radius,
        backgroundColor: fill,
        display: 'flex',
        flexDirection: 'row',
        gap: s.gap,
        padding: s.padding,
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        boxSizing: 'border-box',
        border: border || 'none',
        boxShadow: boxShadow || 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        pointerEvents: disabled || loading ? 'none' : 'auto',
        color: text,
        ...style,
      }}
    >
      {loading && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: s.icon / 2,
            height: s.icon / 2,
            borderRadius: '50%',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            animation: 'kernel-button-spin 0.7s linear infinite',
          }}
        />
      )}
      {showLeftIcon && (
        <span style={{ display: 'flex', flexShrink: 0, margin: `0 ${s.iconGap}px`, color: text, visibility: loading ? 'hidden' : 'visible' }}>
          {icon || <Menu size={s.icon} />}
        </span>
      )}
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: 400,
          fontSize: s.fontSize,
          lineHeight: `${s.lineHeight}px`,
          whiteSpace: 'nowrap',
          color: text,
          margin: `0 ${s.textGap}px`,
          visibility: loading ? 'hidden' : 'visible',
        }}
      >
        {children}
      </span>
      {showRightIcon && (
        <span style={{ display: 'flex', flexShrink: 0, margin: `0 ${s.iconGap}px`, color: text, visibility: loading ? 'hidden' : 'visible' }}>
          {icon || <Menu size={s.icon} />}
        </span>
      )}
    </button>
  );
}
export default Button;
