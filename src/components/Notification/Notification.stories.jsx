import React from 'react';
import { DesignSystemSectionPage } from '../shared/DesignSystemSectionPage';
import { Notification } from './Notification';

export default {
  title: 'Design System/Notification',
  parameters: { layout: 'fullscreen' },
  argTypes: {
    showIcon: { control: 'boolean' },
    showSubtitle: { control: 'boolean' },
    showActions: { control: 'boolean' },
  },
  args: { showIcon: true, showSubtitle: false, showActions: false },
};

/** Toggle the Controls panel (icon / subtitle / actions) to cover the frame's example variants. */
export const Template = (args) => {
  const [visible, setVisible] = React.useState(true);
  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setVisible(true), 2000);
  };
  return (
    <DesignSystemSectionPage title="Уведомление">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>{visible && <Notification {...args} onClose={handleClose} />}</div>
    </DesignSystemSectionPage>
  );
};
