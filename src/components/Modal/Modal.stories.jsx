import React from 'react';
import { DesignSystemSectionPage } from '../shared/DesignSystemSectionPage';
import { Modal } from './Modal';

export default {
  title: 'Design System/Modal',
  parameters: { layout: 'fullscreen' },
};

export const Template = () => (
  <DesignSystemSectionPage title="Модальное окно">
    <Modal />
  </DesignSystemSectionPage>
);
Template.parameters = { controls: { disable: true } };
