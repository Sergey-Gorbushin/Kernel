import React from 'react';
import { colors } from '../../styles/tokens';
import { TypeSpecimen } from './TypeSpecimen';

export function TypeGroup({ group }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: colors.textFaint,
        }}
      >
        {group.title}
      </div>
      {group.items.map((item) => (
        <TypeSpecimen key={item.name} token={item} />
      ))}
    </div>
  );
}
