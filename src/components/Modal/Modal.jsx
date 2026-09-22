import React from 'react';
import { Button } from '../Buttons/Button';
import { Input } from '../Inputs/Input';
import { colors, palette } from '../../styles/tokens';
import { FONT_FAMILY } from '../../tokens/typography';
import { shadows } from '../../tokens/elevation';

/**
 * Modal template composed only of existing Button and Input components, per
 * the "Modal Template" (`/Modal/Modal-Template`) frame in "For_claude.fig":
 * title, an Input field, and a footer with two Buttons (secondary/neutral).
 * The frame's file-upload dropzone and its link-style "Выбрать файл" button
 * were intentionally left out per direct instruction — not built.
 */
export function Modal({
  title = 'Загрузка списка',
  subtitle,
  inputLabel = 'Наименование списка',
  inputPlaceholder = 'Введите наименование',
  cancelText = 'Отменить',
  confirmText = 'Вперед',
  onCancel,
  onConfirm,
  style,
}) {
  return (
    <div
      style={{
        position: 'relative',
        width: 690,
        borderRadius: 14,
        backgroundColor: colors.white,
        boxShadow: shadows.dropdown,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{ padding: '24px 24px 0 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: 700,
            fontSize: 24,
            lineHeight: '32px',
            color: colors.textBody,
          }}
        >
          {title}
        </span>
        {subtitle && (
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontWeight: 400,
              fontSize: 12,
              lineHeight: '20px',
              color: palette.grey[6],
            }}
          >
            {subtitle}
          </span>
        )}
      </div>
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Input label={inputLabel} placeholder={inputPlaceholder} size="lg" />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 8,
          padding: '24px 24px 32px 24px',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Button variant="secondary" size="lg" onClick={onCancel} style={{ width: 166 }}>
          {cancelText}
        </Button>
        <Button variant="neutral" size="lg" onClick={onConfirm} style={{ width: 166 }}>
          {confirmText}
        </Button>
      </div>
    </div>
  );
}
export default Modal;
