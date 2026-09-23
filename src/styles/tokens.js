// Five 10-step color ramps (0 lightest … 9 darkest, .5 is the base/reference
// shade). Source: design handoff "Color palettes + Button variants/states".
export const palette = {
  grey: ['#FAFAFA', '#F6F6F6', '#F0F0F0', '#D9D9D9', '#BFBFBF', '#8C8C8C', '#595959', '#262626', '#141414', '#161616'],
  blue: ['#EFF9FE', '#BAE7FF', '#91D5FF', '#69C0FF', '#40A9FF', '#1890FF', '#096DD9', '#0050B3', '#003A8C', '#002766'],
  cryola: ['#FFF7F5', '#FFE8E1', '#FED1C3', '#FDB29B', '#FD8F6D', '#FC6C40', '#F63D04', '#D33403', '#B02B03', '#9C2602'],
  green: ['#EBFCF4', '#DAF0E6', '#B6E3CE', '#84BFA3', '#6AA389', '#3E785D', '#33624D', '#2B4F3E', '#223C30', '#1A2922'],
  amethyst: ['#EFE4FC', '#DEC9F8', '#CDAEF4', '#BB94F0', '#A87AEB', '#9460E6', '#754DB3', '#583B83', '#3B2956', '#21182D'],
};

export const ACCENT_COLOR_NAMES = ['blue', 'cryola', 'green', 'amethyst'];

// Neutral / minimalist color tokens from the mockup (Storybook.dc.html).
export const colors = {
  pageBg: 'oklch(0.98 0.002 90)',
  textPrimary: 'oklch(0.22 0.005 90)',
  textStrong: 'oklch(0.15 0.005 90)',
  textMuted: 'oklch(0.4 0.005 90)',
  textFaint: 'oklch(0.55 0.005 90)',
  border: 'oklch(0.9 0.002 90)',
  borderFaint: 'oklch(0.93 0.002 90)',
  borderDashed: 'oklch(0.85 0.002 90)',
  navActiveBg: 'oklch(0.94 0.003 90)',
  navActiveText: 'oklch(0.18 0.005 90)',
  white: '#FFFFFF',

  // Form-control palette, introduced designing Input/Select/Textarea against
  // the "For_claude.fig" Input-Example frame. Numbered per the designer's own
  // temporary naming (no full ramp defined yet, just these shades).
  grey4: '#BFBFBF', // Grey-4 — placeholder text, captions/counters
  grey5: '#8C8C8C', // Grey-5 — icons inside form controls
  grey7: '#262626', // Grey-7 — entered text; also the base black for any text
  dustRed6: '#F5222D', // Dust Red-6 — error state (border + caption text)
  focusBlue: '#40A9FF', // focus ring inner border (1px)
  focusBlueStrong: '#1890FF', // focus ring outer glow, used at 20% opacity (2px)

  // Semantic aliases for form controls (Input, Select, Textarea).
  textBody: '#262626', // grey7
  textPlaceholder: '#BFBFBF', // grey4
  textCaption: '#BFBFBF', // grey4
  textError: '#F5222D', // dustRed6
  iconInput: '#8C8C8C', // grey5
  borderInputFocus: '#40A9FF', // focusBlue
  ringInputFocus: 'rgba(24, 144, 255, 0.2)', // focusBlueStrong @ 20%
  borderInputError: '#F5222D', // dustRed6

  // Introduced with Button/Checkbox/Radio/Pagination (Claude Design handoff,
  // "For_claude.fig" Buttons + CheckBox & Radio + Pagination frames).
  surfaceButtonFill: '#262626', // grey7
  textOnDark: '#FFFFFF', // white — Button/active-pagination-page text over surfaceButtonFill
  surfaceSelected: '#1890FF', // focusBlueStrong alias — Checkbox/Radio checked fill+ring
  surfaceHover: '#F0F0F0', // Pagination page-button hover background

  // Button variants/states (Color palettes + Button variants/states handoff).
  surfaceButtonFillHover: palette.grey[6],
  surfaceButtonSecondaryFill: palette.grey[2],
  surfaceButtonSecondaryFillHover: palette.grey[1],
  surfaceButtonSecondaryText: palette.grey[6],

  // Tab bar ("For_claude.fig" Tab-Bar frame, Tab Items: Active/Default/Hover).
  textTab: palette.grey[6], // label, default
  textTabCounter: palette.grey[5], // counter, default
  surfaceTabHover: palette.grey[1], // hover fill
  // Active/hover label + counter and the active underline follow the product
  // accent (see accentThemes) — resolved via CSS var so a data-theme wrapper
  // re-themes them without props.
  textTabActive: 'var(--color-accent, #262626)',
  borderTabActive: 'var(--color-accent, #262626)',

  // Accent Button with no explicit `color` — follows the product accent too.
  surfaceButtonAccent: 'var(--color-accent, #262626)',
  surfaceButtonAccentHover: 'var(--color-accent-hover, #595959)',
};

// Product accent — base .5 shade of the product's palette; neutral (grey.7)
// is the default. Used by tabs and accent buttons only; other
// components keep their fixed colors. Switched per product with
// data-theme="neutral" | "green" | "cryola" | "blue" | "amethyst" on <html> or
// any wrapper; the matching CSS rules live in global.css (keep the two in sync).
export const accentThemes = {
  neutral: { accent: palette.grey[7], hover: palette.grey[6] },
  green: { accent: palette.green[5], hover: palette.green[4] },
  cryola: { accent: palette.cryola[5], hover: palette.cryola[4] },
  blue: { accent: palette.blue[5], hover: palette.blue[4] },
  amethyst: { accent: palette.amethyst[5], hover: palette.amethyst[4] },
};
export const ACCENT_THEME_NAMES = Object.keys(accentThemes);

export const monoFontFamily = "'SF Mono', Menlo, monospace";
export const uiFontFamily = 'Helvetica, Arial, sans-serif';
