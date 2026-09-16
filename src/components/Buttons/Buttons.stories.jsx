import React from 'react';
import { DesignSystemSectionPage } from '../shared/DesignSystemSectionPage';
import { SectionEmptyState } from '../shared/SectionEmptyState';

export default {
  title: 'Design System/Buttons',
  parameters: { layout: 'fullscreen' },
};

// No Figma frame has been provided for this section yet — mirrors the
// mockup's empty state until a button design is handed off.
export const NotYetFilledIn = () => (
  <DesignSystemSectionPage title="Кнопки">
    <SectionEmptyState sectionLabel="Кнопки" />
  </DesignSystemSectionPage>
);
