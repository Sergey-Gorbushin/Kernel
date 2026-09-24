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
    Modal/            modal template — title, Input field, footer actions (Button)
    TabBar/           tabs with optional counter, sliding active indicator, product-accent themes
    Notification/     dark toast card — icon, title, subtitle, description, up to two text actions
    shared/           shared building blocks (page chrome, empty state, icons)
.storybook/          Storybook configuration
```

Sections are organized to mirror the Figma design system: Typography, Buttons, Inputs, Textarea, Select, Dropdown, Checkbox & Radio, Pagination, Modal, Tab bar, Notification. Inputs/Textarea/Select were built from the "For_claude.fig" Input-Example frame plus direct instruction for anything beyond it (label, clear, password, suffix, disabled, Textarea, Select). Buttons, Dropdown, Checkbox/Radio and Pagination were ported from their respective named frames in the same file — see each component's JSDoc for what's sourced vs. inferred. Modal is composed only of the existing Button and Input components, per the "Modal Template" frame in the same file. Tab bar was ported from the "Tab-Bar" frame (`Tab Items`, State=Active/Default/Hover); its active color follows the product accent — set `data-theme="neutral" | "green" | "cryola" | "blue" | "amethyst"` on `<html>` or any wrapper (neutral by default, see `accentThemes` in `src/styles/tokens.js`). Notification was ported from the `/Notifications` frame (`Notification` symbol) — a dark toast card with an independently toggleable icon, subtitle, description, and two text actions.
