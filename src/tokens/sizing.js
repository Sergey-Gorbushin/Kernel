// Control sizing shared by Input, Select and (eventually) Button — ported from
// the "For_claude.fig" Buttons frame: sm 28 / md 36 / default 40 / lg 44 / xl 52,
// all with hug width and the same corner radius per size. Input and Select were
// built to match these 1:1 per direct instruction ("инпуты, соответствующие
// размерам высоты кнопок").
export const controlSizes = {
  sm: { height: 28, radius: 6, padding: '0 8px', fontSize: 12, lineHeight: 20, iconSize: 12, iconGap: 4 },
  md: { height: 36, radius: 8, padding: '0 8px', fontSize: 14, lineHeight: 22, iconSize: 16, iconGap: 8 },
  default: { height: 40, radius: 8, padding: '0 12px', fontSize: 14, lineHeight: 22, iconSize: 16, iconGap: 8 },
  lg: { height: 44, radius: 8, padding: '0 12px', fontSize: 14, lineHeight: 22, iconSize: 16, iconGap: 8 },
  xl: { height: 52, radius: 8, padding: '0 16px', fontSize: 14, lineHeight: 22, iconSize: 16, iconGap: 8 },
};

// Textarea min-heights are NOT from the Figma source — inferred to scale with
// Input's proportions, flagged as an assumption (per README's "Intentional
// additions" note carried over from the Claude Design handoff).
export const textareaSizes = {
  sm: { minHeight: 64, radius: 6, padding: '6px 8px', fontSize: 12, lineHeight: 20 },
  md: { minHeight: 72, radius: 8, padding: '8px 8px', fontSize: 14, lineHeight: 22 },
  default: { minHeight: 96, radius: 8, padding: '10px 12px', fontSize: 14, lineHeight: 22 },
  lg: { minHeight: 112, radius: 8, padding: '11px 12px', fontSize: 14, lineHeight: 22 },
  xl: { minHeight: 128, radius: 8, padding: '14px 16px', fontSize: 14, lineHeight: 22 },
};

export const CONTROL_SIZE_NAMES = ['sm', 'md', 'default', 'lg', 'xl'];
