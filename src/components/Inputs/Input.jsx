import React from 'react';
import { colors } from '../../styles/tokens';
import { FONT_FAMILY } from '../../tokens/typography';
import { controlSizes } from '../../tokens/sizing';
import { SearchIcon, ClearIcon, EyeIcon } from '../shared/icons';

/**
 * Text input — sizes mirror Button (height + corner radius per size name).
 * Optional label above the field. Optional leading icon (hidden by default;
 * sm = 12px, all other sizes = 16px, defaults to a search glyph). Optional
 * trailing text suffix. `clearable` (default true) shows a trailing clear
 * (×) button once the field has text. `type="password"` automatically adds
 * a show/hide toggle. `error` and `disabled` states supported.
 *
 * @example
 * <Input label="Search" showIcon caption="Optional hint" />
 */
export function Input({
  size = 'default',
  placeholder = 'Placeholder',
  showIcon = false,
  icon,
  label,
  suffix,
  caption,
  counter,
  error = false,
  disabled = false,
  clearable = true,
  style,
  onFocus,
  onBlur,
  onChange,
  value,
  defaultValue,
  type,
  ...rest
}) {
  const s = controlSizes[size] || controlSizes.default;
  const [focused, setFocused] = React.useState(false);
  const [revealed, setRevealed] = React.useState(false);
  const isPassword = type === 'password';
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = React.useState(defaultValue || '');
  const currentValue = isControlled ? value : innerValue;
  const inputRef = React.useRef(null);
  const rightRef = React.useRef(null);
  const [rightWidth, setRightWidth] = React.useState(0);
  const sidePad = parseInt(s.padding.split(' ')[1], 10);
  const showClear = !disabled && clearable && String(currentValue || '').length > 0;
  const hasRight = !disabled && (!!suffix || showClear || isPassword);

  React.useLayoutEffect(() => {
    if (rightRef.current) setRightWidth(rightRef.current.offsetWidth);
  }, [suffix, showClear, isPassword, currentValue]);

  const handleClear = () => {
    if (!isControlled) setInnerValue('');
    if (inputRef.current) {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(inputRef.current, '');
      inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
      inputRef.current.focus();
    }
  };

  const boxShadow = error
    ? `inset 0 0 0 1px ${colors.borderInputError}${focused ? `, 0 0 0 2px ${colors.ringInputFocus}` : ''}`
    : focused
    ? `inset 0 0 0 1px ${colors.borderInputFocus}, 0 0 0 2px ${colors.ringInputFocus}`
    : `inset 0 0 0 1px ${colors.border}`;

  const fieldEl = (
    <div style={{ position: 'relative', width: '100%' }}>
      {showIcon && (
        <span
          style={{
            position: 'absolute',
            left: sidePad,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            color: disabled ? colors.textPlaceholder : colors.iconInput,
            pointerEvents: 'none',
          }}
        >
          {icon || <SearchIcon size={s.iconSize} />}
        </span>
      )}
      <input
        {...rest}
        ref={inputRef}
        type={isPassword ? (revealed ? 'text' : 'password') : type}
        value={currentValue}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={(e) => { setFocused(true); onFocus && onFocus(e); }}
        onBlur={(e) => { setFocused(false); onBlur && onBlur(e); }}
        onChange={(e) => { if (!isControlled) setInnerValue(e.target.value); onChange && onChange(e); }}
        style={{
          height: s.height,
          borderRadius: s.radius,
          padding: s.padding,
          paddingLeft: showIcon ? sidePad + s.iconSize + s.iconGap : sidePad,
          paddingRight: hasRight ? sidePad + rightWidth + s.iconGap : sidePad,
          width: '100%',
          boxSizing: 'border-box',
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
      {hasRight && (
        <div ref={rightRef} style={{ position: 'absolute', right: sidePad, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: s.iconGap }}>
          {suffix && (
            <span style={{ fontFamily: FONT_FAMILY, fontWeight: 400, fontSize: s.fontSize, lineHeight: `${s.lineHeight}px`, color: colors.textPlaceholder, whiteSpace: 'nowrap' }}>
              {suffix}
            </span>
          )}
          {showClear && (
            <span onClick={handleClear} style={{ display: 'flex', color: colors.iconInput, cursor: 'pointer' }}>
              <ClearIcon size={s.iconSize} />
            </span>
          )}
          {isPassword && (
            <span onClick={() => setRevealed((r) => !r)} style={{ display: 'flex', color: colors.iconInput, cursor: 'pointer' }}>
              <EyeIcon size={s.iconSize} off={revealed} />
            </span>
          )}
        </div>
      )}
    </div>
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
