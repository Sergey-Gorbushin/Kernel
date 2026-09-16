import React from 'react';
import { colors, monoFontFamily } from '../../styles/tokens';

/** One row of the type scale: the styled sample name plus its size/line-height/weight spec. */
export function TypeSpecimen({ token }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 16,
        padding: '16px 0',
        borderBottom: `1px solid ${colors.borderFaint}`,
      }}
    >
      <div
        style={{
          fontFamily: token.fontFamily,
          fontWeight: token.weight,
          fontSize: token.size,
          lineHeight: `${token.lineHeight}px`,
          color: colors.textStrong,
        }}
      >
        {token.name}
      </div>
      <div style={{ flexShrink: 0, fontFamily: monoFontFamily, fontSize: 12, color: colors.textFaint }}>
        {token.spec}
      </div>
    </div>
  );
}
