import React from 'react';
import { createPortal } from 'react-dom';
import { colors } from '../../styles/tokens';
import { FONT_FAMILY } from '../../tokens/typography';
import { controlSizes } from '../../tokens/sizing';
import { SearchIcon, ClearIcon, ChevronDownIcon, CheckIcon } from '../shared/icons';

function normalize(options) {
  return (options || []).map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
}

/**
 * Custom single/multi dropdown — sizes, label, caption/counter, error and
 * disabled states mirror Input 1:1. `multiple` shows chips for each selected
 * value inside the field. `searchable` lets the user type a filter query
 * directly into the field itself (no separate search box in the dropdown).
 * `clearable` (default true) shows a trailing clear (×) once something is
 * selected. The open dropdown renders through a portal into `document.body`
 * so it's never clipped or covered by an ancestor's overflow/stacking
 * context — it always renders above the rest of the page.
 *
 * @example
 * <Select label="Fruit" options={['Apple', 'Banana']} searchable />
 */
export function Select({
  size = 'default',
  placeholder = 'Select...',
  showIcon = false,
  icon,
  label,
  caption,
  counter,
  error = false,
  disabled = false,
  clearable = true,
  multiple = false,
  searchable = false,
  options,
  value,
  defaultValue,
  onChange,
  noOptionsText = 'No options found',
  style,
}) {
  const s = controlSizes[size] || controlSizes.default;
  const sidePad = parseInt(s.padding.split(' ')[1], 10);
  const opts = normalize(options);

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [dropdownRect, setDropdownRect] = React.useState(null);
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = React.useState(defaultValue !== undefined ? defaultValue : (multiple ? [] : null));
  const currentValue = isControlled ? value : innerValue;
  const selectedArr = multiple ? (currentValue || []) : (currentValue != null ? [currentValue] : []);

  const containerRef = React.useRef(null);
  const fieldRef = React.useRef(null);
  const dropdownRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const updateDropdownRect = React.useCallback(() => {
    if (!fieldRef.current) return;
    const rect = fieldRef.current.getBoundingClientRect();
    setDropdownRect({ top: rect.bottom + 4, left: rect.left, width: rect.width });
  }, []);

  React.useLayoutEffect(() => {
    if (open) updateDropdownRect();
  }, [open, updateDropdownRect]);

  React.useEffect(() => {
    if (!open) return undefined;
    function onDocMouseDown(e) {
      if (
        (containerRef.current && containerRef.current.contains(e.target)) ||
        (dropdownRef.current && dropdownRef.current.contains(e.target))
      ) {
        return;
      }
      setOpen(false);
      setQuery('');
    }
    function onReposition() {
      updateDropdownRect();
    }
    document.addEventListener('mousedown', onDocMouseDown);
    window.addEventListener('scroll', onReposition, true);
    window.addEventListener('resize', onReposition);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      window.removeEventListener('scroll', onReposition, true);
      window.removeEventListener('resize', onReposition);
    };
  }, [open, updateDropdownRect]);

  const commit = (v) => {
    if (!isControlled) setInnerValue(v);
    onChange && onChange(v);
  };

  const handleSelect = (opt) => {
    if (disabled) return;
    if (multiple) {
      const next = selectedArr.includes(opt.value) ? selectedArr.filter((v) => v !== opt.value) : [...selectedArr, opt.value];
      commit(next);
      setQuery('');
      if (searchable && inputRef.current) inputRef.current.focus();
    } else {
      commit(opt.value);
      setOpen(false);
      setQuery('');
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    commit(multiple ? [] : null);
    setQuery('');
  };

  const removeChip = (v, e) => {
    e.stopPropagation();
    commit(selectedArr.filter((x) => x !== v));
  };

  const filtered = searchable && query ? opts.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())) : opts;
  const hasValue = multiple ? selectedArr.length > 0 : currentValue != null && currentValue !== '';
  const showClear = !disabled && clearable && hasValue;
  const selectedLabel = !multiple && currentValue != null ? (opts.find((o) => o.value === currentValue) || {}).label : '';

  const boxShadow = error
    ? `inset 0 0 0 1px ${colors.borderInputError}${open ? `, 0 0 0 2px ${colors.ringInputFocus}` : ''}`
    : open
    ? `inset 0 0 0 1px ${colors.borderInputFocus}, 0 0 0 2px ${colors.ringInputFocus}`
    : `inset 0 0 0 1px ${colors.border}`;

  const textStyle = { fontFamily: FONT_FAMILY, fontWeight: 400, fontSize: s.fontSize, lineHeight: `${s.lineHeight}px` };

  const chip = (opt) => (
    <span
      key={opt.value}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        background: colors.navActiveBg,
        borderRadius: 4,
        padding: '2px 6px',
        fontFamily: FONT_FAMILY,
        fontWeight: 400,
        fontSize: 12,
        lineHeight: '20px',
        color: colors.textBody,
        maxWidth: '100%',
      }}
    >
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{opt.label}</span>
      {!disabled && (
        <span onClick={(e) => removeChip(opt.value, e)} style={{ display: 'flex', color: colors.iconInput, cursor: 'pointer', flexShrink: 0 }}>
          <ClearIcon size={10} />
        </span>
      )}
    </span>
  );

  const chipObjs = multiple ? selectedArr.map((v) => opts.find((o) => o.value === v) || { value: v, label: v }) : [];

  const content = multiple ? (
    <React.Fragment>
      {chipObjs.map(chip)}
      {searchable && (
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); if (!open) setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={chipObjs.length === 0 ? placeholder : ''}
          disabled={disabled}
          style={{ ...textStyle, border: 'none', outline: 'none', background: 'transparent', flex: '1 1 40px', minWidth: 40, color: colors.textBody, padding: 0 }}
        />
      )}
      {!searchable && chipObjs.length === 0 && <span style={{ ...textStyle, color: colors.textPlaceholder }}>{placeholder}</span>}
    </React.Fragment>
  ) : searchable ? (
    <input
      ref={inputRef}
      value={open ? query : (selectedLabel || '')}
      onChange={(e) => { setQuery(e.target.value); if (!open) setOpen(true); }}
      onFocus={() => { setOpen(true); setQuery(''); }}
      placeholder={placeholder}
      disabled={disabled}
      style={{ ...textStyle, border: 'none', outline: 'none', background: 'transparent', width: '100%', color: disabled ? colors.textPlaceholder : colors.textBody, padding: 0, cursor: disabled ? 'not-allowed' : 'text' }}
    />
  ) : (
    <span
      style={{
        ...textStyle,
        color: hasValue ? (disabled ? colors.textPlaceholder : colors.textBody) : colors.textPlaceholder,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {selectedLabel || placeholder}
    </span>
  );

  const labelStyle = {
    fontFamily: FONT_FAMILY,
    fontWeight: 400,
    fontSize: size === 'sm' ? 12 : 14,
    lineHeight: size === 'sm' ? '20px' : '22px',
    color: disabled ? colors.textPlaceholder : colors.textBody,
  };
  const footerStyle = { fontFamily: FONT_FAMILY, fontWeight: 400, fontSize: 12, lineHeight: '20px', color: error ? colors.textError : colors.textCaption };

  const dropdown = open && !disabled && dropdownRect && createPortal(
    <div
      ref={dropdownRef}
      style={{
        position: 'fixed',
        top: dropdownRect.top,
        left: dropdownRect.left,
        width: dropdownRect.width,
        background: colors.white,
        borderRadius: s.radius,
        boxShadow: `inset 0 0 0 1px ${colors.border}, 0 8px 24px rgba(0,0,0,0.08)`,
        maxHeight: 240,
        overflowY: 'auto',
        zIndex: 9999,
        padding: 4,
        boxSizing: 'border-box',
      }}
    >
      {filtered.length === 0 && <div style={{ ...textStyle, color: colors.textPlaceholder, padding: '8px 8px' }}>{noOptionsText}</div>}
      {filtered.map((opt) => {
        const isSelected = selectedArr.includes(opt.value);
        return (
          <div
            key={opt.value}
            onClick={() => handleSelect(opt)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 8px', borderRadius: 4, cursor: 'pointer', background: isSelected && !multiple ? colors.navActiveBg : 'transparent' }}
            onMouseEnter={(e) => { if (!(isSelected && !multiple)) e.currentTarget.style.background = colors.pageBg; }}
            onMouseLeave={(e) => { if (!(isSelected && !multiple)) e.currentTarget.style.background = 'transparent'; }}
          >
            {multiple && (
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 3,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isSelected ? 'none' : `inset 0 0 0 1px ${colors.border}`,
                  background: isSelected ? colors.grey7 : 'transparent',
                  color: colors.white,
                }}
              >
                {isSelected && <CheckIcon size={10} />}
              </span>
            )}
            <span style={{ ...textStyle, color: colors.textBody, flex: '1 1 auto', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{opt.label}</span>
            {!multiple && isSelected && (
              <span style={{ display: 'flex', color: colors.iconInput, flexShrink: 0 }}>
                <CheckIcon size={14} />
              </span>
            )}
          </div>
        );
      })}
    </div>,
    document.body,
  );

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: label || caption || counter ? 2 : 0, width: '100%', ...style }}>
      {label && <span style={labelStyle}>{label}</span>}
      <div
        ref={fieldRef}
        onClick={() => { if (!disabled) { setOpen((o) => !o); if (searchable && inputRef.current) inputRef.current.focus(); } }}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Escape') { setOpen(false); setQuery(''); }
          if (!searchable && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) { e.preventDefault(); setOpen(true); }
        }}
        tabIndex={disabled || searchable ? -1 : 0}
        style={{
          minHeight: s.height,
          borderRadius: s.radius,
          padding: multiple ? `4px ${sidePad}px` : s.padding,
          display: 'flex',
          alignItems: 'center',
          flexWrap: multiple ? 'wrap' : 'nowrap',
          gap: multiple ? 4 : s.iconGap,
          width: '100%',
          boxSizing: 'border-box',
          backgroundColor: disabled ? colors.pageBg : colors.white,
          boxShadow,
          cursor: disabled ? 'not-allowed' : searchable ? 'text' : 'pointer',
          outline: 'none',
        }}
      >
        {showIcon && (
          <span style={{ display: 'flex', flexShrink: 0, color: disabled ? colors.textPlaceholder : colors.iconInput }}>
            {icon || <SearchIcon size={s.iconSize} />}
          </span>
        )}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: multiple ? 'wrap' : 'nowrap', gap: 4, flex: '1 1 auto', minWidth: 0 }}>{content}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: s.iconGap, flexShrink: 0 }}>
          {showClear && (
            <span onClick={handleClear} style={{ display: 'flex', color: colors.iconInput, cursor: 'pointer' }}>
              <ClearIcon size={s.iconSize} />
            </span>
          )}
          <span style={{ display: 'flex', color: disabled ? colors.textPlaceholder : colors.iconInput }}>
            <ChevronDownIcon size={s.iconSize} open={open} />
          </span>
        </div>
      </div>
      {(caption || counter) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <span style={footerStyle}>{caption}</span>
          {counter && <span style={{ ...footerStyle, flexShrink: 0 }}>{counter}</span>}
        </div>
      )}
      {dropdown}
    </div>
  );
}
