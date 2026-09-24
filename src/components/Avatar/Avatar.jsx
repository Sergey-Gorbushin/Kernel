import React from 'react';
import { colors, palette } from '../../styles/tokens';
import { FONT_FAMILY } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';
import highIcon from '../../assets/icons/reliability/high.png';
import averageIcon from '../../assets/icons/reliability/average.png';
import lowIcon from '../../assets/icons/reliability/low.png';
import unknownIcon from '../../assets/icons/reliability/unknown.png';

const RELIABILITY_ICONS = { high: highIcon, average: averageIcon, low: lowIcon, unknown: unknownIcon };

/** Calm fills for person avatars (avatar-only, not palette tokens). */
const AVATAR_PERSON_COLORS = [
  '#E1F490', '#C9EBD9', '#F7DCC4', '#DDD3F5', '#C7DFF5', '#F5D0DA', '#DCE8BE', '#F3E5B0',
  '#B9E6E6', '#F6C9B8', '#D2E0F8', '#E8D0F0', '#C4E8C0', '#F8E0A0', '#D6D9F7', '#F2D4C9',
  '#BEE0D8', '#EAE0C8', '#CFE7F2', '#F0CFE3', '#D9ECA8', '#F5D7A8', '#C8D8E8', '#E3D6C2',
];
const AVATAR_COMPANY_COLOR = '#799DF8';

const PATH_SCORE = 'M32.0088 0C38.2888 0 44.1459 1.80882 49.0887 4.93262C47.1461 7.80599 46.0126 11.2708 46.0126 15C46.0126 24.9353 54.0642 32.9895 64 32.999C63.472 50.2098 49.3524 64 32.0088 64C14.3308 64 0 49.6731 0 32C0 14.3269 14.3308 0 32.0088 0Z';
const PATH_SHIELD = 'M32.1367 0C38.0167 7.07316e-05 43.5273 1.57359 48.2686 4.31934L48.249 4.95703C47.9452 14.4585 49.2242 20.4026 51.7061 24.8223C54.2283 29.3137 58.0392 32.3204 63.2256 35.6768L64 36.1777C61.9443 51.8766 48.4629 63.9998 32.1367 64C14.3883 64 0 49.6731 0 32C0 14.3269 14.3883 0 32.1367 0Z';
const ICON_POS = { unknown: { left: '75.78125cqw', top: '-1.5625cqw' }, shield: { left: '78.125cqw', top: '1.5625cqw' } };
const ALT = { high: 'Высокая надёжность', average: 'Средняя надёжность', low: 'Низкая надёжность', unknown: 'Надёжность неизвестна' };

/** Name + surname → 2 letters; one word → 1 letter; only e-mail → first letter of e-mail. */
export function getInitials(name, email) {
  const words = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  if (words.length === 1) return words[0][0].toUpperCase();
  return String(email || '').trim().charAt(0).toUpperCase();
}

/** Random-but-stable pick: same person always gets the same color. */
export function getPersonColor(seed) {
  const s = String(seed || '');
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return AVATAR_PERSON_COLORS[h % AVATAR_PERSON_COLORS.length];
}

const initialsStyle = { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(38,38,38,0.40)', textAlign: 'center', fontFamily: FONT_FAMILY, fontSize: '31.25cqw', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.625cqw' };

function Shape({ kind, fill }) {
  if (kind === 'circle') return <div style={{ position: 'absolute', inset: 0, backgroundColor: fill, borderRadius: '50%' }} />;
  return (
    <svg viewBox="0 0 64 64" fill="none" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
      <path d={kind === 'shield' ? PATH_SHIELD : PATH_SCORE} fill={fill} />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={colors.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', width: '39.0625cqw', height: '39.0625cqw', left: '30.46875cqw', top: '30.46875cqw' }}>
      <path d="M10 12h4" /><path d="M10 8h4" /><path d="M14 21v-3a2 2 0 0 0-4 0v3" />
      <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
      <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
    </svg>
  );
}

/** The round/cut-out avatar mark alone. Everything inside scales with `size` via container query units. */
export function AvatarMark({ name, email, company, reliability, color, size = 36 }) {
  const isCompany = !!company;
  const kind = !reliability ? 'circle' : reliability === 'unknown' ? 'unknown' : 'shield';
  const personFill = color || getPersonColor(email || name);
  const initials = getInitials(name, email);
  return (
    <div style={{ position: 'relative', width: size, height: size, containerType: 'size', flexShrink: 0 }}>
      <Shape kind={kind} fill={isCompany ? AVATAR_COMPANY_COLOR : personFill} />
      {isCompany ? <BuildingIcon /> : <span style={initialsStyle}>{initials}</span>}
      {isCompany && (
        <div style={{ position: 'absolute', width: '46.875cqw', height: '46.875cqw', right: '-23.828125cqw', bottom: '-6.25cqw', containerType: 'size' }}>
          <Shape kind="circle" fill={personFill} />
          <span style={initialsStyle}>{initials}</span>
        </div>
      )}
      {reliability && (
        <img src={RELIABILITY_ICONS[reliability]} alt={ALT[reliability]} style={{ position: 'absolute', width: '50cqw', height: '50cqw', ...ICON_POS[kind] }} />
      )}
    </div>
  );
}

const lineBase = { fontFamily: FONT_FAMILY, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', alignSelf: 'stretch' };

/**
 * Avatar — person or company profile, built with the user step by step (no
 * Figma frame of its own beyond the `/ProfileName` name block). A company
 * profile always shows its linked person as a mini-mark in the bottom-right
 * corner (never with a reliability icon).
 *
 * @example
 * <Avatar name="Иван Петров" reliability="high" caption="ИНН 7701234567" />
 */
export function Avatar({ name, email, company, reliability, color, size = 36, caption, captionUppercase = false, showName = true, style }) {
  const mark = <AvatarMark name={name} email={email} company={company} reliability={reliability} color={color} size={size} />;
  if (!showName) return <div style={{ display: 'inline-flex', ...style }}>{mark}</div>;
  const isCompany = !!company;
  const title = isCompany ? company : (name || email);
  const parts = Array.isArray(caption) ? caption : caption != null && caption !== '' ? [caption] : [];
  return (
    <div style={{ display: 'flex', alignItems: 'center', minWidth: 0, ...style }}>
      {mark}
      <div style={{ flex: '1 1 auto', minWidth: 0, height: spacing[36], display: 'flex', flexDirection: 'column', padding: `0 ${spacing[12]}px`, justifyContent: 'center', alignItems: 'flex-start', boxSizing: 'border-box' }}>
        <span style={isCompany
          ? { ...lineBase, fontWeight: 500, fontSize: 12, lineHeight: '20px', color: palette.grey[7], textTransform: 'uppercase' }
          : { ...lineBase, fontWeight: 500, fontSize: 14, lineHeight: '22px', color: palette.grey[7] }}>{title}</span>
        {parts.length > 0 && (
          <span style={captionUppercase
            ? { ...lineBase, height: spacing[20], marginTop: -spacing[4], display: 'flex', alignItems: 'center', gap: spacing[16], fontWeight: 400, fontSize: 10, lineHeight: '13px', color: palette.grey[5], textTransform: 'uppercase' }
            : { ...lineBase, height: spacing[20], marginTop: -spacing[4], display: 'flex', alignItems: 'center', gap: spacing[16], fontWeight: 400, fontSize: 12, lineHeight: '20px', color: palette.grey[5] }}>
            {parts.map((p, i) => <span key={i} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{p}</span>)}
          </span>
        )}
      </div>
    </div>
  );
}
Avatar.personColors = AVATAR_PERSON_COLORS;
Avatar.companyColor = AVATAR_COMPANY_COLOR;
export default Avatar;
