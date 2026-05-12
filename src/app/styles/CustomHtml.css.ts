import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { color, config, DefaultReset, toRem } from 'folds';
import { ContainerColor } from './ContainerColor.css';

// Word-document single-spaced. 1.15 matches MS Word default single line spacing.
const TightLineHeight = '1.15';

export const MarginSpaced = style({
  marginBottom: 0,
  marginTop: 0,
  lineHeight: TightLineHeight,
});

export const Paragraph = style([DefaultReset, { lineHeight: TightLineHeight }]);

export const Heading = style([
  DefaultReset,
  MarginSpaced,
  {
    marginTop: 0,
    marginBottom: 0,
    lineHeight: '1.15',
  },
]);

export const BlockQuote = style([
  DefaultReset,
  MarginSpaced,
  {
    paddingLeft: config.space.S200,
    borderLeft: `${config.borderWidth.B700} solid ${color.SurfaceVariant.ContainerLine}`,
    fontStyle: 'italic',
  },
]);

const BaseCode = style({
  color: color.SurfaceVariant.OnContainer,
  background: color.SurfaceVariant.Container,
  border: `${config.borderWidth.B300} solid ${color.SurfaceVariant.ContainerLine}`,
  borderRadius: config.radii.R300,
});
const CodeFont = style({
  fontFamily: 'monospace',
});

export const Code = style([
  DefaultReset,
  BaseCode,
  CodeFont,
  {
    padding: `0 ${config.space.S100}`,
    // Keep the inline pill from stretching its parent row beyond body
    // line-height. Without these, monospace metrics + border push li rows
    // visibly taller than 1.15.
    lineHeight: '1.15',
    fontSize: '0.92em',
    verticalAlign: 'baseline',
  },
]);

export const Spoiler = recipe({
  base: [
    DefaultReset,
    {
      padding: `0 ${config.space.S100}`,
      backgroundColor: color.SurfaceVariant.ContainerActive,
      borderRadius: config.radii.R300,
      selectors: {
        '&[aria-pressed=true]': {
          color: 'transparent',
        },
      },
    },
  ],
  variants: {
    active: {
      true: {
        color: 'transparent',
      },
    },
  },
});

export const CodeBlock = style([
  DefaultReset,
  BaseCode,
  MarginSpaced,
  {
    fontStyle: 'normal',
    position: 'relative',
    overflow: 'hidden',
  },
]);
export const CodeBlockHeader = style([
  ContainerColor({ variant: 'Surface' }),
  {
    padding: `0 ${config.space.S200} 0 ${config.space.S300}`,
    borderBottomWidth: config.borderWidth.B300,
    gap: config.space.S200,
  },
]);
export const CodeBlockInternal = style([
  CodeFont,
  {
    padding: `${config.space.S200} ${config.space.S200} 0`,
    minWidth: toRem(200),
  },
]);

export const CodeBlockBottomShadow = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  pointerEvents: 'none',

  height: config.space.S400,
  background: `linear-gradient(to top, #00000022, #00000000)`,
});

export const List = style([
  DefaultReset,
  MarginSpaced,
  {
    padding: `0 ${config.space.S100}`,
    paddingLeft: config.space.S600,
  },
]);

// The inline-code pill inside an <li> inflates the line-box to its own
// line-height; forcing every child of li down to 1 collapses that.
globalStyle(`${List} > li`, {
  margin: 0,
  padding: 0,
  lineHeight: 1.05,
});
globalStyle(`${List} > li *`, {
  lineHeight: 1.05,
});
globalStyle(`${List} > li > p`, {
  margin: 0,
  display: 'inline',
});

export const Img = style([
  DefaultReset,
  MarginSpaced,
  {
    maxWidth: toRem(296),
    borderRadius: config.radii.R300,
  },
]);

export const InlineChromiumBugfix = style({
  fontSize: 0,
  lineHeight: 0,
});

export const Mention = recipe({
  base: [
    DefaultReset,
    {
      backgroundColor: color.SurfaceVariant.Container,
      color: color.SurfaceVariant.OnContainer,
      boxShadow: `0 0 0 ${config.borderWidth.B300} ${color.SurfaceVariant.ContainerLine}`,
      padding: `0 ${toRem(2)}`,
      borderRadius: config.radii.R300,
      fontWeight: config.fontWeight.W500,
    },
  ],
  variants: {
    highlight: {
      true: {
        backgroundColor: color.Success.Container,
        color: color.Success.OnContainer,
        boxShadow: `0 0 0 ${config.borderWidth.B300} ${color.Success.ContainerLine}`,
      },
    },
    focus: {
      true: {
        boxShadow: `0 0 0 ${config.borderWidth.B300} ${color.SurfaceVariant.OnContainer}`,
      },
    },
  },
});

export const Command = recipe({
  base: [
    DefaultReset,
    {
      padding: `0 ${toRem(2)}`,
      borderRadius: config.radii.R300,
      fontWeight: config.fontWeight.W500,
    },
  ],
  variants: {
    focus: {
      true: {
        boxShadow: `0 0 0 ${config.borderWidth.B300} ${color.Warning.OnContainer}`,
      },
    },
    active: {
      true: {
        backgroundColor: color.Warning.Container,
        color: color.Warning.OnContainer,
        boxShadow: `0 0 0 ${config.borderWidth.B300} ${color.Warning.ContainerLine}`,
      },
    },
  },
});

export const EmoticonBase = style([
  DefaultReset,
  {
    display: 'inline-block',
    padding: '0.05rem',
    height: '1em',
    verticalAlign: 'middle',
  },
]);

export const Emoticon = recipe({
  base: [
    DefaultReset,
    {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',

      height: '1em',
      minWidth: '1em',
      fontSize: '1.33em',
      lineHeight: '1em',
      verticalAlign: 'middle',
      position: 'relative',
      top: '-0.35em',
      borderRadius: config.radii.R300,
    },
  ],
  variants: {
    focus: {
      true: {
        boxShadow: `0 0 0 ${config.borderWidth.B300} ${color.SurfaceVariant.OnContainer}`,
      },
    },
  },
});

export const EmoticonImg = style([
  DefaultReset,
  {
    height: '1em',
    cursor: 'default',
  },
]);

export const highlightText = style([
  DefaultReset,
  {
    backgroundColor: 'yellow',
    color: 'black',
  },
]);

// Tool-card disclosure style for bot messages that emit <details><summary>
// for inline tool invocations.
export const Details = style([
  DefaultReset,
  MarginSpaced,
  {
    background: color.SurfaceVariant.Container,
    border: `${config.borderWidth.B300} solid ${color.SurfaceVariant.ContainerLine}`,
    borderRadius: config.radii.R400,
    padding: `${config.space.S100} ${config.space.S200}`,
  },
]);

export const Summary = style([
  DefaultReset,
  {
    cursor: 'pointer',
    fontWeight: config.fontWeight.W500,
    color: color.SurfaceVariant.OnContainer,
    listStyle: 'none',
    fontFamily: 'monospace',
    fontSize: toRem(13),
    padding: `${config.space.S100} 0`,
    userSelect: 'none',
    selectors: {
      '&::-webkit-details-marker': { display: 'none' },
      '&::marker': { display: 'none' },
      '&:hover': { color: color.Primary.Main },
    },
  },
]);

// GFM tables: pulldown_cmark emits them when ENABLE_TABLES is set.
export const Table = style([
  DefaultReset,
  MarginSpaced,
  {
    borderCollapse: 'collapse',
    width: 'auto',
    maxWidth: '100%',
    fontSize: toRem(14),
    border: `${config.borderWidth.B300} solid ${color.SurfaceVariant.ContainerLine}`,
    borderRadius: config.radii.R300,
    overflow: 'hidden',
  },
]);

export const Thead = style([
  DefaultReset,
  {
    background: color.SurfaceVariant.Container,
    color: color.SurfaceVariant.OnContainer,
  },
]);

export const Tr = style([
  DefaultReset,
  {
    selectors: {
      '&:not(:last-child)': {
        borderBottom: `${config.borderWidth.B300} solid ${color.SurfaceVariant.ContainerLine}`,
      },
    },
  },
]);

export const Th = style([
  DefaultReset,
  {
    padding: `${config.space.S100} ${config.space.S200}`,
    textAlign: 'left',
    fontWeight: config.fontWeight.W600,
    borderRight: `${config.borderWidth.B300} solid ${color.SurfaceVariant.ContainerLine}`,
    selectors: {
      '&:last-child': { borderRight: 'none' },
    },
  },
]);

export const Td = style([
  DefaultReset,
  {
    padding: `${config.space.S100} ${config.space.S200}`,
    verticalAlign: 'top',
    borderRight: `${config.borderWidth.B300} solid ${color.SurfaceVariant.ContainerLine}`,
    selectors: {
      '&:last-child': { borderRight: 'none' },
    },
  },
]);

// Horizontal rule: thin divider between sections.
export const Hr = style([
  DefaultReset,
  MarginSpaced,
  {
    border: 'none',
    borderTop: `${config.borderWidth.B300} solid ${color.SurfaceVariant.ContainerLine}`,
    height: 0,
  },
]);

// Strikethrough: soften from harsh black to subtle muted.
export const Strikethrough = style([
  DefaultReset,
  {
    textDecoration: 'line-through',
    color: color.SurfaceVariant.OnContainer,
    opacity: 0.7,
  },
]);

// Task-list checkbox: pulldown_cmark emits <input type=checkbox disabled>.
export const TaskCheckbox = style([
  DefaultReset,
  {
    marginRight: config.space.S100,
    accentColor: color.Primary.Main,
    cursor: 'default',
    verticalAlign: 'middle',
  },
]);

// Footnote section: separated and slightly muted to read as supplementary.
export const FootnoteSection = style([
  DefaultReset,
  {
    marginTop: config.space.S400,
    paddingTop: config.space.S200,
    borderTop: `${config.borderWidth.B300} solid ${color.SurfaceVariant.ContainerLine}`,
    fontSize: toRem(13),
    color: color.SurfaceVariant.OnContainer,
    opacity: 0.85,
  },
]);
