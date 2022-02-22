import { Mark } from 'tiptap';
import { toggleMark, markInputRule, markPasteRule } from 'tiptap-commands';

export default class Bold extends Mark {
  get name() {
    return 'superscript';
  }

  get schema() {
    return {
      parseDOM: [
        {
          tag: 'sup',
        },
      ],
      toDOM: () => ['sup', 0],
    };
  }

  keys({ type }) {
    return {
      'Mod-.': toggleMark(type),
    };
  }

  commands({ type }) {
    return () => toggleMark(type);
  }

  inputRules({ type }) {
    return [markInputRule(/(?:\*\*|__)([^*_]+)(?:\*\*|__)$/, type)];
  }

  pasteRules({ type }) {
    return [markPasteRule(/(?:\*\*|__)([^*_]+)(?:\*\*|__)/g, type)];
  }
}
