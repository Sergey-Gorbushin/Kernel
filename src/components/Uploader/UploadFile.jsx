import React from 'react';
import { colors, palette } from '../../styles/tokens';
import { FONT_FAMILY } from '../../tokens/typography';
import { TrashIcon } from '../shared/icons';
import { fileFormatIcons } from './fileFormatIcons';

const EXT_ALIASES = { docx: 'doc', xlsx: 'xls', pptx: 'ppt', jpeg: 'jpg', '7z': 'zip' };

export function getFileFormat(name = '') {
  const ext = String(name).split('.').pop().toLowerCase();
  const key = EXT_ALIASES[ext] || ext;
  return fileFormatIcons[key] ? key : 'file';
}

export function formatFileSize(bytes) {
  return (bytes / (1024 * 1024)).toFixed(1) + ' МБ';
}

const SPIN_KEYFRAMES_ID = 'kernel-upload-keyframes';
function ensureSpinKeyframes() {
  if (typeof document === 'undefined' || document.getElementById(SPIN_KEYFRAMES_ID)) return;
  const style = document.createElement('style');
  style.id = SPIN_KEYFRAMES_ID;
  style.textContent =
    '@keyframes kernel-upload-spin{to{transform:rotate(360deg)}}' +
    '@keyframes kernel-upload-dot1{0%,24.9%{opacity:0}25%,100%{opacity:1}}' +
    '@keyframes kernel-upload-dot2{0%,49.9%{opacity:0}50%,100%{opacity:1}}' +
    '@keyframes kernel-upload-dot3{0%,74.9%{opacity:0}75%,100%{opacity:1}}';
  document.head.appendChild(style);
}

function LoaderIcon() {
  ensureSpinKeyframes();
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={palette.cryola[5]} strokeWidth="1.5" strokeLinecap="round" style={{ flexShrink: 0, animation: 'kernel-upload-spin 1s linear infinite' }}>
      <path d="M5.99972 0.856873V2.32626" />
      <path d="M9.63588 2.36357L8.59687 3.40259" />
      <path d="M11.1426 5.99973H9.67319" />
      <path d="M9.63588 9.63588L8.59687 8.59687" />
      <path d="M5.99972 11.1426V9.67319" />
      <path d="M2.36356 9.63588L3.40257 8.59687" />
      <path d="M0.856857 5.99973H2.32625" />
      <path d="M2.36356 2.36357L3.40257 3.40259" />
    </svg>
  );
}

/** Three dots appear one by one, then all hide; 4 phases × 400ms. Always in layout so the text doesn't shift. */
function LoadingDots() {
  ensureSpinKeyframes();
  return (
    <span aria-hidden="true">
      {[1, 2, 3].map((i) => (
        <span key={i} style={{ animation: `kernel-upload-dot${i} 1.6s infinite` }}>.</span>
      ))}
    </span>
  );
}

function SuccessIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
      <rect width="12" height="12" rx="6" fill={palette.green[3]} />
      <path d="M3.61398 6.46156L5.23656 8.003L8.5 4.5" stroke={colors.white} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
      <rect width="12" height="12" rx="6" fill={colors.dustRed6} />
      <path d="M6 3V6" stroke={colors.white} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 8.57143V9" stroke={colors.white} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const metaText = { fontFamily: FONT_FAMILY, fontWeight: 400, fontSize: 12, lineHeight: '20px', whiteSpace: 'nowrap' };

/**
 * One file row of the uploader: format icon, name, size/progress meta,
 * status, remove button, progress bar (uploading only). Ported from the
 * "/UploadFile" frame.
 *
 * @example
 * <UploadFile name="report.pdf" size={2400000} status="success" />
 */
export function UploadFile({ name = 'my_filename.pdf', size = 0, loaded = 0, status = 'uploading', errorText = 'Текст ошибки', onRemove, style }) {
  const [hover, setHover] = React.useState(false);
  const format = getFileFormat(name);
  const pct = size > 0 ? Math.min(100, (loaded / size) * 100) : 0;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 44 }}>
        <img src={fileFormatIcons[format]} alt={format} style={{ width: 40, height: 'auto', flexShrink: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <span title={name} style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 14, lineHeight: '22px', color: palette.grey[7], overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {name}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {status === 'error' ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <ErrorIcon />
                <span style={{ ...metaText, color: colors.dustRed6 }}>{errorText}</span>
              </span>
            ) : (
              <React.Fragment>
                <span style={{ ...metaText, color: palette.grey[5] }}>
                  {status === 'success' ? formatFileSize(size) : `${formatFileSize(loaded)} из ${formatFileSize(size)}`}
                </span>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: palette.grey[3], flexShrink: 0 }} />
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {status === 'success' ? <SuccessIcon /> : <LoaderIcon />}
                  <span style={{ ...metaText, color: palette.grey[7] }}>
                    {status === 'success' ? 'Выполнено' : <React.Fragment>Загрузка<LoadingDots /></React.Fragment>}
                  </span>
                </span>
              </React.Fragment>
            )}
          </div>
        </div>
        <button
          type="button"
          aria-label="Удалить файл"
          onClick={onRemove}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, flexShrink: 0, marginRight: -12, padding: 0, border: 'none', background: 'none', cursor: 'pointer', color: hover ? palette.grey[6] : palette.grey[5] }}
        >
          <TrashIcon size={20} />
        </button>
      </div>
      {status === 'uploading' && (
        <div role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} style={{ height: 6, borderRadius: 3, background: palette.grey[2], overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, borderRadius: 4, background: palette.blue[5], transition: 'width 0.2s ease' }} />
        </div>
      )}
    </div>
  );
}

export default UploadFile;
