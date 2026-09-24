// Spacing scale from the 24.09 handoff: 2px step from 2 to 32, then coarser
// steps (36/40/44/48/56/64) for larger layout gaps. First consumer: Avatar's
// name-block padding/height and caption gap.
export const spacing = {
  2: 2, 4: 4, 6: 6, 8: 8, 10: 10, 12: 12, 14: 14, 16: 16, 18: 18, 20: 20,
  22: 22, 24: 24, 26: 26, 28: 28, 30: 30, 32: 32,
  36: 36, 40: 40, 44: 44, 48: 48, 56: 56, 64: 64,
};

export const SPACING_STEP_NAMES = Object.keys(spacing).map(Number);
