import React from 'react';
import { DesignSystemSectionPage } from '../shared/DesignSystemSectionPage';
import { Pagination } from './Pagination';
import { colors, monoFontFamily } from '../../styles/tokens';

export default {
  title: 'Design System/Pagination',
  parameters: { layout: 'fullscreen' },
};

function Demo({ label, initialPage, totalPages }) {
  const [page, setPage] = React.useState(initialPage);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      <div style={{ fontFamily: monoFontFamily, fontSize: 11, color: colors.textFaint }}>{label}</div>
    </div>
  );
}

/** The Figma frame's three configs, reproduced as live/interactive examples instead of hardcoded page numbers. */
export const Configs = () => (
  <DesignSystemSectionPage title="Пагинация">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <Demo label="Basic — few pages, no ellipsis" initialPage={2} totalPages={5} />
      <Demo label="More pages — ellipsis on the right" initialPage={2} totalPages={20} />
      <Demo label="Last pages — ellipsis on the left" initialPage={19} totalPages={20} />
    </div>
  </DesignSystemSectionPage>
);
Configs.parameters = { controls: { disable: true } };
