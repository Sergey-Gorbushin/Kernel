// Ported 1:1 from the Figma type scale captured in the Claude Design mockup
// (project/Storybook.dc.html, TYPE_GROUPS). Source of truth: "For_claude.fig" / Typography / Typography.

export const FONT_FAMILY =
  "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const RAW_GROUPS = [
  { title: 'Display 48', size: 48, lineHeight: 56, items: [{ weight: 700, name: 'Display / 48 / 56 / Bold' }] },
  { title: 'Display 40', size: 40, lineHeight: 48, items: [{ weight: 700, name: 'Display / 40 / 48 / Bold' }] },
  {
    title: 'Display 38',
    size: 38,
    lineHeight: 46,
    items: [
      { weight: 700, name: 'Display / 38 / 46 / Bold' },
      { weight: 800, name: 'Display / 38 / 46 / Extra Bold' },
    ],
  },
  {
    title: 'Display 30',
    size: 30,
    lineHeight: 38,
    items: [
      { weight: 400, name: 'Display / 30 / 38 / Regular' },
      { weight: 700, name: 'Display / 30 / 38 / Bold' },
      { weight: 900, name: 'Display / 30 / 38 / Black' },
    ],
  },
  {
    title: 'Heading 24',
    size: 24,
    lineHeight: 32,
    items: [
      { weight: 400, name: 'Heading / 24 / 32 / Regular' },
      { weight: 500, name: 'Heading / 24 / 32 / Medium' },
      { weight: 700, name: 'Heading / 24 / 32 / Bold' },
      { weight: 900, name: 'Heading / 24 / 32 / Black' },
    ],
  },
  {
    title: 'Heading 20',
    size: 20,
    lineHeight: 28,
    items: [
      { weight: 400, name: 'Heading / 20 / 28 / Regular' },
      { weight: 500, name: 'Heading / 20 / 28 / Medium' },
      { weight: 700, name: 'Heading / 20 / 28 / Bold' },
      { weight: 900, name: 'Heading / 20 / 28 / Black' },
    ],
  },
  {
    title: 'Heading 19',
    size: 19,
    lineHeight: 28,
    items: [
      { weight: 400, name: 'Heading / 19 / 28 / Regular' },
      { weight: 500, name: 'Heading / 19 / 28 / Medium' },
      { weight: 700, name: 'Heading / 19 / 28 / Bold' },
      { weight: 900, name: 'Heading / 19 / 28 / Black' },
    ],
  },
  {
    title: 'Subheading 16',
    size: 16,
    lineHeight: 24,
    items: [
      { weight: 400, name: 'Subheading / 16 / 24 / Regular' },
      { weight: 500, name: 'Subheading / 16 / 24 / Medium' },
      { weight: 700, name: 'Subheading / 16 / 24 / Bold' },
      { weight: 900, name: 'Subheading / 16 / 24 / Black' },
    ],
  },
  {
    title: 'Body 14',
    size: 14,
    lineHeight: 22,
    items: [
      { weight: 400, name: 'Body / 14 / 22 / Regular' },
      { weight: 500, name: 'Body / 14 / 22 / Medium' },
      { weight: 700, name: 'Body / 14 / 22 / Bold' },
    ],
  },
  {
    title: 'Body 12',
    size: 12,
    lineHeight: 20,
    items: [
      { weight: 400, name: 'Body / 12 / 20 / Regular' },
      { weight: 500, name: 'Body / 12 / 20 / Medium' },
      { weight: 700, name: 'Body / 12 / 20 / Bold' },
    ],
  },
  {
    title: 'Body 12 Tight',
    size: 12,
    lineHeight: 17,
    items: [
      { weight: 400, name: 'Body / 12 / 17 / Tight Regular' },
      { weight: 500, name: 'Body / 12 / 17 / Tight Medium' },
      { weight: 700, name: 'Body / 12 / 17 / Tight Bold' },
    ],
  },
  {
    title: 'Caption 11',
    size: 11,
    lineHeight: 16,
    items: [
      { weight: 400, name: 'Caption / 11 / 16 / Regular' },
      { weight: 500, name: 'Caption / 11 / 16 / Medium' },
      { weight: 700, name: 'Caption / 11 / 16 / Bold' },
    ],
  },
  {
    title: 'Caption 10',
    size: 10,
    lineHeight: 13,
    items: [
      { weight: 400, name: 'Caption / 10 / 13 / Regular' },
      { weight: 500, name: 'Caption / 10 / 13 / Medium' },
      { weight: 700, name: 'Caption / 10 / 13 / Bold' },
    ],
  },
];

export const TYPE_GROUPS = RAW_GROUPS.map((g) => ({
  title: g.title,
  items: g.items.map((it) => ({
    fontFamily: FONT_FAMILY,
    weight: it.weight,
    size: g.size,
    lineHeight: g.lineHeight,
    name: it.name,
    spec: `${g.size} / ${g.lineHeight} / ${it.weight}`,
  })),
}));
