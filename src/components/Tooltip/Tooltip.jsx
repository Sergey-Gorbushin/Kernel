import React, { useState } from 'react';
import { palette, colors } from '../../styles/tokens';
import { FONT_FAMILY } from '../../tokens/typography';
import { tooltipSizing } from '../../tokens/sizing';

const ARROWS = {
  bottom: { vb: '0 0 11 5.04', w: tooltipSizing.arrowLength, h: tooltipSizing.arrowDepth, d: 'M 11 0 L 6.974 4.392 C 6.182 5.256 4.818 5.256 4.026 4.392 L 0 0 L 11 0 Z', dir: 'column' },
  top: { vb: '0 0 11 5.04', w: tooltipSizing.arrowLength, h: tooltipSizing.arrowDepth, d: 'M 11 5.04 L 6.974 0.648 C 6.182 -0.216 4.818 -0.216 4.026 0.648 L 0 5.04 L 11 5.04 Z', dir: 'column-reverse' },
  left: { vb: '0 0 5.04 11', w: tooltipSizing.arrowDepth, h: tooltipSizing.arrowLength, d: 'M 5.04 11 L 0.648 6.974 C -0.216 6.182 -0.216 4.818 0.648 4.026 L 5.04 0 L 5.04 11 Z', dir: 'row-reverse' },
  right: { vb: '0 0 5.04 11', w: tooltipSizing.arrowDepth, h: tooltipSizing.arrowLength, d: 'M 0 11 L 4.392 6.974 C 5.256 6.182 5.256 4.818 4.392 4.026 L 0 0 L 0 11 Z', dir: 'row' },
};

// Where the bubble sits relative to the trigger, given the arrow side.
const POSITION = {
  bottom: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: tooltipSizing.offset },
  top: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: tooltipSizing.offset },
  left: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: tooltipSizing.offset },
  right: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: tooltipSizing.offset },
};

function Bubble({ label, arrow, style }) {
  const a = ARROWS[arrow] || ARROWS.bottom;
  return (
    <div role="tooltip" style={{ display: 'inline-flex', flexDirection: a.dir, alignItems: 'center', ...style }}>
      <div style={{
        height: tooltipSizing.height, boxSizing: 'border-box',
        padding: `${tooltipSizing.paddingY}px ${tooltipSizing.paddingX}px`,
        borderRadius: tooltipSizing.radius, background: palette.grey[7],
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: FONT_FAMILY, fontWeight: 400,
        fontSize: 12, lineHeight: '20px',
        color: colors.white, whiteSpace: 'nowrap',
      }}>{label}</div>
      <svg viewBox={a.vb} style={{ width: a.w, height: a.h, flexShrink: 0, display: 'block', fill: palette.grey[7] }}>
        <path d={a.d} />
      </svg>
    </div>
  );
}

/**
 * Tooltip — ported from the "For_claude.fig" /Tooltip frame. The frame had no
 * body fill (Figma export limitation), so colors were taken from the user's
 * screenshot: grey.7 body/arrow, a1 (white) text.
 *
 * Without `children` it renders the bubble statically (for the spec card).
 * With `children` it shows on hover/focus, positioned on the side opposite
 * `arrow`; pass `open` to control visibility directly.
 *
 * @example
 * <Tooltip label="Label" arrow="bottom"><Button size="sm">Hover me</Button></Tooltip>
 */
export function Tooltip({ label = 'Label', arrow = 'bottom', open, children, style }) {
  const [hover, setHover] = useState(false);
  if (!children) return <Bubble label={label} arrow={arrow} style={style} />;
  const visible = open ?? hover;
  return (
    <span
      style={{ position: 'relative', display: 'inline-flex', ...style }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)} onBlur={() => setHover(false)}
    >
      {children}
      {visible && <Bubble label={label} arrow={arrow} style={{ position: 'absolute', zIndex: 1000, pointerEvents: 'none', ...POSITION[arrow] }} />}
    </span>
  );
}
export const TOOLTIP_ARROW_NAMES = ['bottom', 'top', 'left', 'right'];
export default Tooltip;
