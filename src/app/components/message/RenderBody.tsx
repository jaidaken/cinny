import React from 'react';
import parse, { HTMLReactParserOptions } from 'html-react-parser';
import Linkify from 'linkify-react';
import { Opts } from 'linkifyjs';
import { marked } from 'marked';
import { MessageEmptyContent } from './content';
import { sanitizeCustomHtml } from '../../utils/sanitize';
import { highlightText, scaleSystemEmoji } from '../../plugins/react-custom-html-parser';
import { useClientConfig } from '../../hooks/useClientConfig';

type RenderBodyProps = {
  body: string;
  customBody?: string;

  highlightRegex?: RegExp;
  htmlReactParserOptions: HTMLReactParserOptions;
  linkifyOpts: Opts;
  senderId?: string;
};
export function RenderBody({
  body,
  customBody,
  highlightRegex,
  htmlReactParserOptions,
  linkifyOpts,
  senderId,
}: RenderBodyProps) {
  const streamingBotMxids = useClientConfig().streamingBotMxids ?? [];
  const isStreamingBot = !!senderId && streamingBotMxids.includes(senderId);

  if (body === '') <MessageEmptyContent />;
  if (customBody) {
    if (customBody === '') <MessageEmptyContent />;
    return parse(sanitizeCustomHtml(customBody), htmlReactParserOptions);
  }
  // Auto-render markdown for known bot senders that omit formatted_body.
  // GFM enabled to match microclaw's pulldown_cmark feature set.
  if (isStreamingBot) {
    const html = marked.parse(body, { async: false, gfm: true, breaks: true }) as string;
    return parse(sanitizeCustomHtml(html), htmlReactParserOptions);
  }
  return (
    <Linkify options={linkifyOpts}>
      {highlightRegex
        ? highlightText(highlightRegex, scaleSystemEmoji(body))
        : scaleSystemEmoji(body)}
    </Linkify>
  );
}
