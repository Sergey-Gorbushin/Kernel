import React from 'react';
import { DesignSystemSectionPage } from '../shared/DesignSystemSectionPage';
import { SectionEmptyState } from '../shared/SectionEmptyState';

export default {
  title: 'Design System/Inputs',
  parameters: { layout: 'fullscreen' },
};

// No Figma frame has been provided for this section yet — mirrors the
// mockup's empty state until an input design is handed off.
export const NotYetFilledIn = () => (
  <DesignSystemSectionPage title="Инпуты">
    <SectionEmptyState sectionLabel="Инпуты" />
  </DesignSystemSectionPage>
);
