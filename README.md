# Kernel

Design system built with React and [Storybook](https://storybook.js.org/), for use by other agents, developers, and designers.

## Getting started

```bash
npm install
npm run storybook
```

Storybook starts at `http://localhost:6006`.

To build a static, deployable version:

```bash
npm run build-storybook
```

## Structure

```
src/
  tokens/           design tokens (typography, sizing, elevation, ...)
  styles/           color tokens + fonts, global.css
  components/
    Typography/      type-scale specimens
    Buttons/          primary button — sizes, left/right icon slots
    Inputs/           text input — sizes, label, icon, suffix, clear, password, error, disabled
    Textarea/         multi-line field — sizes/label/caption/counter/error/disabled mirror Input
    Select/           custom single/multi dropdown — mirrors Input, portal-rendered so it's never clipped
    Dropdown/         generic menu — attaches to any trigger (button, link, ...), not just Select
    CheckboxRadio/    checkbox + radio controls — 2 sizes, checked/indeterminate/disabled
    Pagination/       page controls — sliding-window ellipsis algorithm, any page/totalPages
    shared/           shared building blocks (page chrome, empty state, icons)
.storybook/          Storybook configuration
```

Sections are organized to mirror the Figma design system: Typography, Buttons, Inputs, Textarea, Select, Dropdown, Checkbox & Radio, Pagination. Inputs/Textarea/Select were built from the "For_claude.fig" Input-Example frame plus direct instruction for anything beyond it (label, clear, password, suffix, disabled, Textarea, Select). Buttons, Dropdown, Checkbox/Radio and Pagination were ported from their respective named frames in the same file — see each component's JSDoc for what's sourced vs. inferred.
