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
  tokens/           design tokens (typography, colors, ...)
  components/
    Typography/      type-scale specimens
    Buttons/          (placeholder — not yet filled in)
    Inputs/           (placeholder — not yet filled in)
    shared/           shared building blocks (page chrome, empty state)
.storybook/          Storybook configuration
```

Sections are organized to mirror the Figma design system: Typography, Buttons, Inputs. New sections get filled in as their Figma frames are provided — until then they show a "not yet filled in" placeholder in Storybook.
