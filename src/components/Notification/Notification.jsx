import React from 'react';
import { colors, palette } from '../../styles/tokens';
import { FONT_FAMILY } from '../../tokens/typography';
import { shadows } from '../../tokens/elevation';
import { ClearIcon } from '../shared/icons';

function MessageIcon({ size = 16 }) {
  return (
    <span style={{ position: 'relative', width: size, height: size, display: 'inline-block' }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={colors.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
      <span style={{ position: 'absolute', left: size * 0.656, top: size * 0.0625, width: size * 0.375, height: size * 0.375, borderRadius: '50%', backgroundColor: palette.cryola[6] }} />
    </span>
  );
}

function ActionButton({ onClick, children }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: FONT_FAMILY, fontWeight: 400, fontSize: 12, lineHeight: '20px', color: hover ? colors.white : palette.grey[3] }}
    >
      {children}
    </button>
  );
}

function CloseButton({ onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', width: 28, height: 28, alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'none', border: 'none', padding: 0, cursor: 'pointer', position: 'absolute', left: 302, top: 2, zIndex: 1, color: hover ? colors.white : palette.grey[5] }}
    >
      <ClearIcon size={16} />
    </button>
  );
}

/**
 * Dark toast-style notification card — ported from the "For_claude.fig"
 * file's `/Notifications` frame (`Notification` symbol). Icon, title +
 * close, optional subtitle, description, and up to two text actions are
 * all independently toggleable to cover the frame's example variants.
 *
 * @example
 * <Notification showActions onPrimaryAction={...} onSecondaryAction={...} />
 */
export function Notification({
  showIcon = true,
  title = 'Title',
  showSubtitle = false,
  subtitle = 'Subtitle',
  description = 'Description. Includes the all new dashboard view. Pages Includes the all new dashboard view. Pages',
  showActions = false,
  primaryAction = 'Action',
  secondaryAction = 'Action',
  onClose,
  onPrimaryAction,
  onSecondaryAction,
  style,
}) {
  return (
    <div
      style={{
        position: 'relative',
        width: 336,
        overflow: 'hidden',
        borderRadius: 12,
        backgroundColor: colors.surfaceNotificationDark,
        boxShadow: shadows.dropdown,
        display: 'flex',
        flexDirection: 'row',
        padding: '8px 6px',
        gap: 0,
        alignItems: 'flex-start',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <CloseButton onClick={onClose} />
      {showIcon && (
        <span style={{ display: 'flex', width: 22, height: 22, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 2 }}>
          <MessageIcon size={16} />
        </span>
      )}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1, minWidth: 0, padding: '0 6px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', height: 22, boxSizing: 'border-box' }}>
          <span style={{ flexGrow: 1, fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 12, lineHeight: '20px', color: colors.white }}>{title}</span>
        </div>
        {showSubtitle && (
          <span style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 10, lineHeight: '13px', color: colors.white, opacity: 0.94 }}>{subtitle}</span>
        )}
        <span style={{ marginBottom: 4, fontFamily: FONT_FAMILY, fontWeight: 400, fontSize: 10, lineHeight: '13px', color: colors.white, opacity: 0.94 }}>{description}</span>
        {showActions && (
          <div style={{ display: 'flex', flexDirection: 'row', gap: 16, alignItems: 'center', height: 24 }}>
            <ActionButton onClick={onPrimaryAction}>{primaryAction}</ActionButton>
            <ActionButton onClick={onSecondaryAction}>{secondaryAction}</ActionButton>
          </div>
        )}
      </div>
    </div>
  );
}
export default Notification;
