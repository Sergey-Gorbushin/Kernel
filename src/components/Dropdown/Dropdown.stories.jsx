import React from 'react';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { DesignSystemSectionPage } from '../shared/DesignSystemSectionPage';
import { Dropdown } from './Dropdown';
import { Button } from '../Buttons/Button';

export default {
  title: 'Design System/Dropdown',
  parameters: { layout: 'fullscreen' },
};

const MENU_ITEMS = [
  { label: 'Profile', caption: 'View and edit', icon: <User size={16} /> },
  { label: 'Settings', icon: <Settings size={16} /> },
  { divider: true },
  { label: 'Log out', icon: <LogOut size={16} /> },
];

/** Attached to a Button trigger — any element works, the trigger is cloned with an onClick handler. */
export const OnButton = () => (
  <DesignSystemSectionPage title="Дропдаун">
    <Dropdown trigger={<Button showRightIcon icon={<ChevronDown size={16} />}>Menu</Button>} items={MENU_ITEMS} />
  </DesignSystemSectionPage>
);
OnButton.parameters = { controls: { disable: true } };

/** Trailing count, checkbox and disabled rows, alongside plain items. */
export const ItemVariants = () => (
  <DesignSystemSectionPage title="Дропдаун">
    <Dropdown
      trigger={<Button>Open</Button>}
      items={[
        { label: 'Inbox', count: 12 },
        { label: 'Notify me', checkbox: true },
        { label: 'Archived', disabled: true },
        { divider: true },
        { label: 'Delete' },
      ]}
    />
  </DesignSystemSectionPage>
);
ItemVariants.parameters = { controls: { disable: true } };
