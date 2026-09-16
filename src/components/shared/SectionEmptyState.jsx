import React from 'react';
import { colors } from '../../styles/tokens';

/**
 * Placeholder shown for design-system sections that haven't been filled in
 * from Figma yet (matches the `isEmpty` branch in the original mockup).
 */
export function SectionEmptyState({ sectionLabel }) {
  return (
    <div
      style={{
        border: `1px dashed ${colors.borderDashed}`,
        borderRadius: 10,
        padding: '64px 24px',
        textAlign: 'center',
        color: colors.textFaint,
        fontSize: 14,
      }}
    >
      {`Раздел пока не заполнен — пришлите набросок из Figma для «${sectionLabel}»`}
    </div>
  );
}
