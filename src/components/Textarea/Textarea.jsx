import React from 'react';
import { colors } from '../../styles/tokens';
import { FONT_FAMILY } from '../../tokens/typography';
import { textareaSizes } from '../../tokens/sizing';

/**
 * Multi-line text field — corner radii and type scale mirror Input; min-
 * heights are not specified upstream (inferred to roughly match Input's
 * proportions at each size). Label above (12px at sm, 14px otherwise),
 * optional caption/counter below, error and disabled states match Input.
 * No icon/suffix/clear — not part of the textarea pattern in the source kit.
 *
 * @example
 * <Textarea label="Comment" counter="0/200" />
 */
export function Textarea({
  size = 'default',
  placeholder = 'Placeholder',
  label,
  caption,
  counter,
  error = false,
  disabled = false,
  style,
  onFocus,
  onBlur,
  onChange,
  value,
  defaultValue,
  ...rest
}) {
  const s = textareaSizes[size] || textareaSizes.default;
  const [focused, setFocused] = React.useState(false);
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = React.useState(defaultValue || '');
  const currentValue = isControlled ? value : innerValue;

  const boxShadow = error
    ? `inset 0 0 0 1px ${colors.borderInputError}${focused ? `, 0 0 0 2px ${colors.ringInputFocus}` : ''}`
    : focused
    ? `inset 0 0 0 1px ${colors.borderInputFocus}, 0 0 0 2px ${colors.ringInputFocus}`
    : `inset 0 0 0 1px ${colors.border}`;

  const fieldEl = (
    <textarea
      {...rest}
      value={currentValue}
      placeholder={placeholder}
      disabled={disabled}
      onFocus={(e) => { setFocused(true); onFocus && onFocus(e); }}
      onBlur={(e) => { setFocused(false); onBlur && onBlur(e); }}
      onChange={(e) => { if (!isControlled) setInnerValue(e.target.value); onChange && onChange(e); }}
      style={{
        minHeight: s.minHeight,
        borderRadius: s.radius,
        padding: s.padding,
        width: '100%',
        boxSizing: 'border-box',
        resize: 'vertical',
        backgroundColor: disabled ? colors.pageBg : colors.white,
        border: 'none',
        boxShadow,
        outline: 'none',
        color: disabled ? colors.textPlaceholder : colors.textBody,
        cursor: disabled ? 'not-allowed' : 'text',
        fontFamily: FONT_FAMILY,
        fontWeight: 400,
        fontSize: s.fontSize,
        lineHeight: `${s.lineHeight}px`,
        ...style,
      }}
    />
  );

  const labelStyle = {
    fontFamily: FONT_FAMILY,
    fontWeight: 400,
    fontSize: size === 'sm' ? 12 : 14,
    lineHeight: size === 'sm' ? '20px' : '22px',
    color: disabled ? colors.textPlaceholder : colors.textBody,
  };
  const footerStyle = { fontFamily: FONT_FAMILY, fontWeight: 400, fontSize: 12, lineHeight: '20px', color: error ? colors.textError : colors.textCaption };

  if (!label && !caption && !counter) return fieldEl;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      {label && <span style={labelStyle}>{label}</span>}
      {fieldEl}
      {(caption || counter) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <span style={footerStyle}>{caption}</span>
          {counter && <span style={{ ...footerStyle, flexShrink: 0 }}>{counter}</span>}
        </div>
      )}
    </div>
  );
}
