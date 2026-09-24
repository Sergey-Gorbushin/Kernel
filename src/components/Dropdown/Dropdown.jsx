import React from 'react';
import { ChevronRight } from 'lucide-react';
import { colors, palette } from '../../styles/tokens';
import { FONT_FAMILY } from '../../tokens/typography';
import { shadows } from '../../tokens/elevation';
import { Checkbox } from '../CheckboxRadio/Checkbox';
import { Radio } from '../CheckboxRadio/Radio';
import { CheckIcon } from '../shared/icons';

const textStyle = (size, line, color) => ({ fontFamily: FONT_FAMILY, fontWeight: 400, fontSize: size, lineHeight: `${line}px`, color });

function Item({ item }) {
  if (item.divider) return <div style={{ height: 1, background: palette.grey[2], margin: '4px 0', marginTop: 0, marginBottom: 0 }} />;
  const disabled = !!item.disabled;
  return (
    <div
      onClick={(e) => { if (disabled) return; item.onClick && item.onClick(e); }}
      style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '8px 12px', borderRadius: 4, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = colors.pageBg; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: '1 1 auto', minWidth: 0 }}>
        {item.icon && <span style={{ display: 'flex', flexShrink: 0, width: 16, height: 16, color: colors.iconInput }}>{item.icon}</span>}
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <span style={{ ...textStyle(14, 22, colors.textBody), overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
          {item.caption && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ ...textStyle(12, 20, colors.iconInput), overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.caption}</span>
            </div>
          )}
        </div>
      </div>
      {(item.count != null || item.selected || item.endIcon || item.checkbox != null || item.radio != null) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {item.count != null && <span style={textStyle(14, 22, colors.textPlaceholder)}>{item.count}</span>}
          {item.checkbox != null && <Checkbox size="md" checked={!!item.checkbox} disabled={disabled} style={{ pointerEvents: 'none' }} />}
          {item.radio != null && <Radio size="md" checked={!!item.radio} disabled={disabled} style={{ pointerEvents: 'none' }} />}
          {item.selected && !item.checkbox && !item.radio && <span style={{ display: 'flex', width: 16, height: 16, color: colors.iconInput }}><CheckIcon size={16} /></span>}
          {item.endIcon && !item.checkbox && !item.radio && <span style={{ display: 'flex', width: 16, height: 16, color: colors.iconInput }}>{item.endIcon}</span>}
        </div>
      )}
    </div>
  );
}

/**
 * Generic dropdown menu — ported from the "For_claude.fig" file's `Dropdown`
 * frame. Trigger-agnostic per direct instruction: attaches to ANY trigger
 * element (button, link, select field, icon) by cloning it with an onClick
 * handler, not tied to Input/Select styling. Panel: white, radius 8,
 * `shadows.dropdown` elevation, max-height 280 with scroll (the frame's
 * custom scrollbar track was decorative and isn't reproduced — falls back to
 * the native scrollbar). Each item: optional 16px leading icon, label
 * (14/22, `colors.textBody`), optional caption line (12px, `colors.iconInput`
 * grey), optional trailing count (`colors.textPlaceholder`), a `selected`
 * checkmark, and/or a trailing 16px icon/checkbox/radio (`selected` is drawn
 * before `endIcon`, and both are suppressed once a checkbox/radio is set).
 * `items` also accepts `{ divider: true }` rows.
 * Closes on outside click, Escape, or item select (unless `closeOnSelect` is
 * false).
 *
 * @example
 * <Dropdown trigger={<Button>Menu</Button>} items={[{ label: 'Profile' }, { divider: true }, { label: 'Log out' }]} />
 */
export function Dropdown({ trigger, items = [], open: openProp, onOpenChange, disabled = false, width, closeOnSelect = true, placement = 'bottom-start', style }) {
  const isControlled = openProp !== undefined;
  const [innerOpen, setInnerOpen] = React.useState(false);
  const open = isControlled ? openProp : innerOpen;
  const setOpen = (v) => { if (!isControlled) setInnerOpen(v); onOpenChange && onOpenChange(v); };
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    function onDocMouseDown(e) { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); }
    function onKeyDown(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('mousedown', onDocMouseDown); document.removeEventListener('keydown', onKeyDown); };
  }, []);

  const toggle = () => { if (!disabled) setOpen(!open); };
  const triggerEl = React.cloneElement(trigger, {
    onClick: (e) => { trigger.props.onClick && trigger.props.onClick(e); toggle(); },
    'aria-expanded': open,
  });

  const alignRight = placement === 'bottom-end';

  return (
    <div ref={wrapRef} style={{ position: 'relative', display: 'inline-flex', ...style }}>
      {triggerEl}
      {open && !disabled && (
        <div style={{
          position: 'absolute', top: '100%', [alignRight ? 'right' : 'left']: 0, marginTop: 4,
          width: width || 251, maxHeight: 280, overflowY: 'auto', zIndex: 999,
          background: colors.white, borderRadius: 8, boxShadow: shadows.dropdown,
          padding: 4, display: 'flex', flexDirection: 'column', gap: 2, boxSizing: 'border-box',
        }}>
          {items.map((item, i) => (
            <div key={item.value ?? i} onClick={() => { if (!item.divider && closeOnSelect) setOpen(false); }}>
              <Item item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export { ChevronRight as DropdownChevronIcon };
export default Dropdown;
