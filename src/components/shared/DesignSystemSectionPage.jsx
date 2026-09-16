import React from 'react';
import { colors, uiFontFamily } from '../../styles/tokens';

/**
 * Shared page chrome for a design-system section: title, divider, content.
 * Mirrors the <main> content pane from the original mockup (Storybook.dc.html).
 */
export function DesignSystemSectionPage({ title, children }) {
  return (
    <div
      style={{
        fontFamily: uiFontFamily,
        color: colors.textPrimary,
        display: 'flex',
        justifyContent: 'center',
        padding: '56px 64px',
        background: colors.pageBg,
      }}
    >
      <div style={{ width: '100%', maxWidth: 720 }}>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em', margin: '0 0 8px' }}>{title}</h1>
        <div style={{ height: 1, background: colors.border, margin: '20px 0 40px' }} />
        {children}
      </div>
    </div>
  );
}
