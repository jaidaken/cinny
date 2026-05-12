import { globalStyle, style } from '@vanilla-extract/css';
import { color, DefaultReset, config, toRem } from 'folds';

export const MessageBase = style({
  position: 'relative',
});

// Subtle left accent so streaming bot messages read distinct from human turns.
export const BotMessage = style({
  borderLeft: `${config.borderWidth.B500} solid ${color.Primary.Container}`,
  paddingLeft: config.space.S200,
});

// Tighter vertical rhythm inside bot bubbles. The default MarginSpaced gives
// human messages breathing room; bot multi-section turns read too airy.
globalStyle(
  `${BotMessage} h1, ${BotMessage} h2, ${BotMessage} h3, ${BotMessage} h4, ${BotMessage} h5, ${BotMessage} h6`,
  {
    marginTop: config.space.S200,
    marginBottom: config.space.S100,
  }
);
globalStyle(
  `${BotMessage} p, ${BotMessage} ul, ${BotMessage} ol, ${BotMessage} blockquote, ${BotMessage} table, ${BotMessage} pre`,
  {
    marginTop: config.space.S100,
    marginBottom: config.space.S100,
  }
);
globalStyle(`${BotMessage} li`, {
  marginTop: 0,
  marginBottom: 0,
});
globalStyle(`${BotMessage} hr`, {
  marginTop: config.space.S200,
  marginBottom: config.space.S200,
});
globalStyle(`${BotMessage} > *:first-child`, {
  marginTop: 0,
});
globalStyle(`${BotMessage} > *:last-child`, {
  marginBottom: 0,
});

export const MessageBaseBubbleCollapsed = style({
  paddingTop: 0,
});

export const MessageOptionsBase = style([
  DefaultReset,
  {
    position: 'absolute',
    top: toRem(-30),
    right: 0,
    zIndex: 1,
  },
]);
export const MessageOptionsBar = style([
  DefaultReset,
  {
    padding: config.space.S100,
  },
]);

export const BubbleAvatarBase = style({
  paddingTop: 0,
});

export const MessageAvatar = style({
  cursor: 'pointer',
});

export const MessageQuickReaction = style({
  minWidth: toRem(32),
});

export const MessageMenuGroup = style({
  padding: config.space.S100,
});

export const MessageMenuItemText = style({
  flexGrow: 1,
});

export const ReactionsContainer = style({
  selectors: {
    '&:empty': {
      display: 'none',
    },
  },
});

export const ReactionsTooltipText = style({
  wordBreak: 'break-word',
});
