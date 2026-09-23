import React from 'react';
import { colors } from '../../styles/tokens';
import { FONT_FAMILY } from '../../tokens/typography';
import { motion } from '../../tokens/motion';

/**
 * TabItem — ported from the "For_claude.fig" `Tab Items` component
 * (State=Active/Default/Hover). The Figma nesting is flattened to
 * button (4px vertical inset) > pill (12px padding, 8px radius, 4px gap,
 * baseline-aligned). Label is Body 12/17 Bold; the optional counter is
 * Caption 10/13 (Medium by default, Bold when active/hover) — the counter
 * exists only in the tab bar. Active underline: 3px, inset 12px, at the
 * bottom edge. `state` forces a visual state (docs/demo use).
 */
export function TabItem({ label, counter, active = false, state, underline = true, onClick, style, className }) {
  const [hover, setHover] = React.useState(false);
  const s = state || (active ? 'active' : hover ? 'hover' : 'default');
  const on = s !== 'default';
  return (
    <button
      type="button"
      role="tab"
      aria-selected={s === 'active'}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={className}
      style={{
        position: 'relative',
        display: 'flex',
        padding: '4px 0',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        flexShrink: 0,
        ...style,
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          gap: 4,
          padding: 12,
          borderRadius: 8,
          background: s === 'hover' ? colors.surfaceTabHover : 'transparent',
          fontFamily: FONT_FAMILY,
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 12, lineHeight: '17px', color: on ? colors.textTabActive : colors.textTab }}>
          {label}
        </span>
        {counter != null && (
          <span
            style={{
              fontWeight: on ? 700 : 500,
              fontSize: 10,
              lineHeight: '13px',
              color: on ? colors.textTabActive : colors.textTabCounter,
            }}
          >
            {counter}
          </span>
        )}
      </span>
      {underline && s === 'active' && (
        <span style={{ position: 'absolute', left: 12, right: 12, bottom: 0, height: 3, background: colors.borderTabActive }} />
      )}
    </button>
  );
}

/**
 * TabBar — horizontal row of TabItem, controlled via `value` + `onChange`.
 * Instead of each item drawing its own underline, one shared indicator
 * slides to the selected tab and resizes to its label width
 * (motion.durationMd / motion.easeStandard). Active color follows the
 * product accent: wrap in `data-theme="green" | "cryola" | "blue" | "amethyst"`
 * (neutral by default).
 *
 * @example
 * <TabBar items={[{ value: 'info', label: 'ОБЩАЯ ИНФОРМАЦИЯ', counter: 22 }]} value={tab} onChange={setTab} />
 */
export function TabBar({ items = [], value, onChange, style, className }) {
  const ref = React.useRef(null);
  const [indicator, setIndicator] = React.useState(null);
  const [animate, setAnimate] = React.useState(false);

  const measure = React.useCallback(() => {
    const root = ref.current;
    if (!root) return;
    const idx = items.findIndex((it) => it.value === value);
    const el = root.querySelectorAll('[role="tab"]')[idx];
    setIndicator(el ? { left: el.offsetLeft + 12, width: el.offsetWidth - 24 } : null);
  }, [items, value]);

  React.useLayoutEffect(() => {
    measure();
  }, [measure]);

  // Skip the transition on first paint so the indicator doesn't slide in from 0.
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Re-measure when a tab changes width (font load, counter toggled, relabel).
  React.useEffect(() => {
    if (!ref.current || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(measure);
    ref.current.querySelectorAll('[role="tab"]').forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, [measure]);

  const t = `${motion.durationMd} ${motion.easeStandard}`;
  return (
    <div ref={ref} role="tablist" className={className} style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', ...style }}>
      {items.map((it) => (
        <TabItem
          key={it.value}
          label={it.label}
          counter={it.counter}
          active={it.value === value}
          underline={false}
          onClick={() => onChange && onChange(it.value)}
        />
      ))}
      {indicator && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 3,
            width: indicator.width,
            transform: `translateX(${indicator.left}px)`,
            background: colors.borderTabActive,
            transition: animate ? `transform ${t}, width ${t}` : 'none',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}
export default TabBar;
