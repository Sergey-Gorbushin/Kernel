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
    Tooltip/           bubble + arrow, static or hover/focus-triggered on any trigger
    Avatar/            person/company profile mark + name block — reliability icon, size, caption
    Uploader/          FileUploader (pick + list) and UploadFile row — uploading/success/error, file-format icons
    shared/           shared building blocks (page chrome, empty state, icons)
  assets/
    icons/reliability/ high/average/low/unknown PNGs used by Avatar's reliability cut-out
.storybook/          Storybook configuration
```

Sections are organized to mirror the Figma design system: Typography, Buttons, Inputs, Textarea, Select, Dropdown, Checkbox & Radio, Pagination, Modal, Tab bar, Notification, Tooltip, Avatar, Uploader. Inputs/Textarea/Select were built from the "For_claude.fig" Input-Example frame plus direct instruction for anything beyond it (label, clear, password, suffix, disabled, Textarea, Select). Buttons, Dropdown, Checkbox/Radio and Pagination were ported from their respective named frames in the same file — see each component's JSDoc for what's sourced vs. inferred. Modal is composed only of the existing Button and Input components, per the "Modal Template" frame in the same file. Tab bar was ported from the "Tab-Bar" frame (`Tab Items`, State=Active/Default/Hover); its active color follows the product accent — set `data-theme="neutral" | "green" | "cryola" | "blue" | "amethyst"` on `<html>` or any wrapper (neutral by default, see `accentThemes` in `src/styles/tokens.js`). Notification was ported from the `/Notifications` frame (`Notification` symbol) — a dark toast card with an independently toggleable icon, subtitle, description, and two text actions. Tooltip was ported from the `/Tooltip` frame — a bubble + arrow (`arrow`: bottom/top/left/right) that renders statically without `children`, or on hover/focus of any trigger with them. Avatar/AvatarMark are a person or company profile mark — random-but-stable fill and initials for a person, or a fixed accent + building icon and linked-person mini-mark for a company — plus a reliability shield/score cut-out (high/average/low/unknown) and a name block that mirrors the `/ProfileName` frame's rules; `size` scales the mark only, via container query units.

`Uploader/FileUploader` ("Добавить файл" → system file picker → `UploadFile` rows appear in the button's place; the button moves below them when `multiple`, or hides once `maxFiles` is reached — not a dropzone) and `Uploader/UploadFile` (one file row: format icon, name, size/progress meta, uploading/success/error status, remove button, progress bar) were ported from the `/UploadFile` frame, filling a gap missed by earlier handoffs. `getFileFormat`/`fileFormatIcons` cover common extensions (docx→doc, xlsx→xls, pptx→ppt, jpeg→jpg, unknown→file) via inlined SVG data URIs.

Button also gained an `outline` variant (a1 fill, 1px grey.3 border, soft shadow via `--shadow-button-outline`, hover grey.0, grey.6 text/icons) from the user's reference screenshot, and the root button no longer clips its own shadow with `overflow: hidden`. `src/tokens/spacing.js` adds a `--space-*`-equivalent scale (2px steps 2–32, then 36/40/44/48/56/64), first used by Avatar's name block.

**Design-system source of truth:** this repo is canonical — the Figma file is a reference for layouts, spacing and values, not a checklist. Components absent from, or named differently than, the Figma kit are expected; kit-coverage and naming mismatches are informational, not gaps to fill.
