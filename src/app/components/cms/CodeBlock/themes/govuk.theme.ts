import { PrismTheme } from 'prism-react-renderer'

export const theme: PrismTheme = {
  plain: {
    backgroundColor: 'var(--colour-code-background)',
    color: 'var(--colour-code-text)',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata', 'punctuation'],
      style: {
        color: 'var(--colour-code-grey)',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['tag', 'boolean', 'number', 'constant', 'symbol', 'deleted', 'selector', 'keyword'],
      style: {
        color: 'var(--colour-code-dark-red)',
      },
    },
    {
      types: ['attr-name', 'char', 'builtin', 'inserted', 'function', 'property'],
      style: {
        color: 'var(--colour-code-green)',
      },
    },
    {
      types: ['regex', 'important', 'atrule', 'operator', 'entity', 'url'],
      style: {
        color: 'var(--colour-code-light-red)',
      },
    },
    {
      types: ['keyword', 'string'],
      languages: ['css'],
      style: {
        color: 'var(--colour-code-light-red)',
      },
    },
    {
      types: ['attr-value', 'string', 'variable'],
      style: {
        color: 'var(--colour-code-blue)',
      },
    },
    {
      types: ['number'],
      languages: ['scss', 'css'],
      style: {
        color: 'var(--colour-code-text)',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['entity'],
      style: {
        cursor: 'help',
      },
    },
  ],
}
