import React from 'react';
import { DesignSystemSectionPage } from '../shared/DesignSystemSectionPage';
import { TypeGroup } from './TypeGroup';
import { TYPE_GROUPS } from '../../tokens/typography';

/** Full "Типографика" section: every type-scale group from the Figma type scale. */
export function TypographyShowcase() {
  return (
    <DesignSystemSectionPage title="Типографика">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        {TYPE_GROUPS.map((group) => (
          <TypeGroup key={group.title} group={group} />
        ))}
      </div>
    </DesignSystemSectionPage>
  );
}
