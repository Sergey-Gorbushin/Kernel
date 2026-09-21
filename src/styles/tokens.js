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
  surfaceButtonFill: '#262626', // grey7 — Button's fill; no accent palette defined yet
  textOnDark: '#FFFFFF', // white — Button/active-pagination-page text over surfaceButtonFill
  surfaceSelected: '#1890FF', // focusBlueStrong alias — Checkbox/Radio checked fill+ring
  surfaceHover: '#F0F0F0', // Pagination page-button hover background
};

export const monoFontFamily = "'SF Mono', Menlo, monospace";
export const uiFontFamily = 'Helvetica, Arial, sans-serif';
