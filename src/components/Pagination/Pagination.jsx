import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { colors } from '../../styles/tokens';
import { FONT_FAMILY } from '../../tokens/typography';

function PageButton({ page, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button"
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        height: 32,
        minWidth: 32,
        padding: '0 8px',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        fontFamily: FONT_FAMILY,
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '22px',
        background: active ? colors.surfaceButtonFill : hover ? colors.surfaceHover : 'transparent',
        color: active ? colors.textOnDark : colors.textBody,
      }}
    >
      {page}
    </button>
  );
}

function ArrowButton({ direction, disabled, onClick }) {
  const [hover, setHover] = React.useState(false);
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={direction === 'prev' ? 'Previous page' : 'Next page'}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 32,
        height: 32,
        border: 'none',
        borderRadius: 8,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        background: hover && !disabled ? colors.surfaceHover : 'transparent',
        color: colors.textBody,
      }}
    >
      <Icon size={16} />
    </button>
  );
}

function getPages(current, total, siblingCount) {
  const totalSlots = siblingCount * 2 + 5;
  if (total <= totalSlots) return Array.from({ length: total }, (_, i) => i + 1);
  const left = Math.max(current - siblingCount, 1);
  const right = Math.min(current + siblingCount, total);
  const showLeftGap = left > 2;
  const showRightGap = right < total - 1;
  if (!showLeftGap && showRightGap) {
    const end = 3 + siblingCount * 2;
    return [...Array.from({ length: end }, (_, i) => i + 1), '…', total];
  }
  if (showLeftGap && !showRightGap) {
    const start = total - (3 + siblingCount * 2) + 1;
    return [1, '…', ...Array.from({ length: total - start + 1 }, (_, i) => start + i)];
  }
  return [1, '…', ...Array.from({ length: right - left + 1 }, (_, i) => left + i), '…', total];
}

/**
 * Pagination — ported from the "For_claude.fig" file's `Pagination` frame (3
 * configs: basic, more pages, last pages). One size (32px controls, 8px
 * radius). The frame's hardcoded per-config page numbers were replaced with
 * a standard sliding-window + ellipsis algorithm (`siblingCount` pages either
 * side of current, first/last always shown) so the component works for any
 * `page`/`totalPages` — the three frame configs are reproduced as live
 * examples in the story. Arrow/ellipsis icons are lucide
 * (`ChevronLeft`/`ChevronRight`/`MoreHorizontal`, 16px) — project convention
 * going forward is lucide first, custom SVG only when a needed glyph isn't in
 * the set. Optional leading/trailing arrow controls (`arrows`, default true)
 * disable at the first/last page.
 *
 * @example
 * <Pagination page={page} totalPages={20} onChange={setPage} />
 */
export function Pagination({ page = 1, totalPages = 1, onChange, siblingCount = 1, arrows = true, style, className }) {
  const pages = getPages(page, totalPages, siblingCount);
  const go = (p) => { if (p >= 1 && p <= totalPages && p !== page && onChange) onChange(p); };
  return (
    <nav className={className} style={{ display: 'flex', alignItems: 'center', gap: 4, ...style }}>
      {arrows && <ArrowButton direction="prev" disabled={page <= 1} onClick={() => go(page - 1)} />}
      {pages.map((p, i) =>
        p === '…' ? (
          <span key={'e' + i} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textBody, flexShrink: 0 }}>
            <MoreHorizontal size={16} />
          </span>
        ) : (
          <PageButton key={p} page={p} active={p === page} onClick={() => go(p)} />
        ),
      )}
      {arrows && <ArrowButton direction="next" disabled={page >= totalPages} onClick={() => go(page + 1)} />}
    </nav>
  );
}
export default Pagination;
