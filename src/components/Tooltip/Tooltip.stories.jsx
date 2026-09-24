import React from 'react';
import { DesignSystemSectionPage } from '../shared/DesignSystemSectionPage';
import { Button } from '../Buttons/Button';
import { Tooltip, TOOLTIP_ARROW_NAMES } from './Tooltip';

export default {
  title: 'Design System/Tooltip',
  parameters: { layout: 'fullscreen' },
  argTypes: {
    label: { control: 'text' },
  },
  args: { label: 'Label' },
};

/** Static bubble per arrow side — this is how the "/Tooltip" frame itself looked. */
export const Arrows = (args) => (
  <DesignSystemSectionPage title="Tooltip">
    <div style={{ display: 'flex', gap: 48, alignItems: 'center', padding: 40 }}>
      {TOOLTIP_ARROW_NAMES.map((arrow) => (
        <div key={arrow} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <Tooltip label={args.label} arrow={arrow} />
          <span style={{ fontSize: 11, color: '#8C8C8C' }}>{arrow}</span>
        </div>
      ))}
    </div>
  </DesignSystemSectionPage>
);

/** Hover/focus a trigger to reveal the tooltip on the side opposite its arrow. */
export const OnHover = (args) => (
  <DesignSystemSectionPage title="Tooltip">
    <div style={{ display: 'flex', gap: 48, alignItems: 'center', padding: 60 }}>
      {TOOLTIP_ARROW_NAMES.map((arrow) => (
        <Tooltip key={arrow} label={args.label} arrow={arrow}>
          <Button size="sm" variant="outline">{arrow}</Button>
        </Tooltip>
      ))}
    </div>
  </DesignSystemSectionPage>
);
OnHover.parameters = { controls: { disable: true } };
