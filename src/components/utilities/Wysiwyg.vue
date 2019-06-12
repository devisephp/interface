<template>
  <div class="dvs-bg-white dvs-rounded">
    <editor-menu-bar
      :editor="editor"
      v-slot="{ commands, isActive }"
    >
      <div class="dvs-bg-grey-light dvs-flex dvs-flex-wrap dvs-items-center dvs-rounded dvs-rounded-b-none">

        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold"
          :class="{ 'dvs-bg-grey': isActive.bold() }"
          @click="commands.bold"
        >
          <bold-icon />
        </button>

        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold"
          :class="{ 'dvs-bg-grey': isActive.italic() }"
          @click="commands.italic"
        >
          <italic-icon />
        </button>

        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold"
          :class="{ 'dvs-bg-grey': isActive.strike() }"
          @click="commands.strike"
        >
          <strike-icon />
        </button>

        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold"
          :class="{ 'dvs-bg-grey': isActive.underline() }"
          @click="commands.underline"
        >
          <underline-icon />
        </button>

        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold"
          :class="{ 'dvs-bg-grey': isActive.underline() }"
          @click="launchMediaManager(commands.image)"
        >
          <image-icon />
        </button>

        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold"
          :class="{ 'dvs-bg-grey': isActive.code() }"
          @click="commands.code"
        >
          <code-icon />
        </button>

        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold"
          :class="{ 'dvs-bg-grey': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          P
        </button>

        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold"
          :class="{ 'dvs-bg-grey': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold"
          :class="{ 'dvs-bg-grey': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold"
          :class="{ 'dvs-bg-grey': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold"
          :class="{ 'dvs-bg-grey': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <menu-icon />
        </button>

        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold"
          :class="{ 'dvs-bg-grey': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <list-icon />
        </button>

        <button
          class="dvs-p-2 dvs-text-2xl dvs-font-bold dvs-font-display"
          style="line-height:0.5;"
          :class="{ 'dvs-bg-grey': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          &quot;
        </button>

        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold"
          :class="{ 'dvs-bg-grey': isActive.code_block() }"
          @click="commands.code_block"
        >
          <code-icon />
        </button>
        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold"
          :class="{ 'is-active': isActive.alignment({ textAlign: 'left' }) }"
          @click="commands.alignment({ textAlign: 'left' })"
        >
          <align-left-icon />
        </button>

        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold"
          :class="{ 'is-active': isActive.alignment({ textAlign: 'center' }) }"
          @click="commands.alignment({ textAlign: 'center' })"
        >
          <align-center-icon />
        </button>

        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold"
          :class="{ 'is-active': isActive.alignment({ textAlign: 'center' }) }"
          @click="commands.alignment({ textAlign: 'right' })"
        >
          <align-right-icon />
        </button>

        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold"
          @click="commands.horizontal_rule"
        >
          <minus-icon />
        </button>

        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold"
          @click="commands.undo"
        >
          <corner-up-left-icon />
        </button>

        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold"
          @click="commands.redo"
        >
          <corner-up-right-icon />
        </button>

        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold fill-current"
          @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })"
        >
          <table-icon />
        </button>

        <button
          class="dvs-p-2 dvs-text-xs dvs-font-bold"
          :class="{ 'dvs-bg-grey': showSource }"
          @click="showSource = !showSource"
        >
          <code-icon />
        </button>

        <span
          v-if="isActive.table()"
          class="dvs-bg-grey dvs-flex dvs-items-center"
        >
          <span class="dvs-text-2xs dvs-uppercase dvs-px-2 dvs-text-grey-darker">Table Controls</span>
          <button
            class="dvs-p-2 dvs-text-xs dvs-font-bold"
            @click="commands.deleteTable"
          >
            <delete-table-icon />
          </button>
          <button
            class="dvs-p-2 dvs-text-xs dvs-font-bold"
            @click="commands.addColumnBefore"
          >
            <add-col-before-icon />
          </button>
          <button
            class="dvs-p-2 dvs-text-xs dvs-font-bold"
            @click="commands.addColumnAfter"
          >
            <add-col-after-icon />
          </button>
          <button
            class="dvs-p-2 dvs-text-xs dvs-font-bold"
            @click="commands.deleteColumn"
          >
            <delete-col-icon />
          </button>
          <button
            class="dvs-p-2 dvs-text-xs dvs-font-bold"
            @click="commands.addRowBefore"
          >
            <add-row-before-icon />
          </button>
          <button
            class="dvs-p-2 dvs-text-xs dvs-font-bold"
            @click="commands.addRowAfter"
          >
            <add-row-after-icon />
          </button>
          <button
            class="dvs-p-2 dvs-text-xs dvs-font-bold"
            @click="commands.deleteRow"
          >
            <delete-row-icon />
          </button>
          <button
            class="dvs-p-2 dvs-text-xs dvs-font-bold"
            @click="commands.toggleCellMerge"
          >
            <combine-cells-icon />
          </button>
        </span>

      </div>
    </editor-menu-bar>

    <editor-content
      v-if="!showSource"
      style="all: unset;"
      :editor="editor"
    />
    <textarea
      v-if="showSource"
      v-model="localValue"
      class="dvs-p-8"
    >
    </textarea>

    <div
      v-if="imageToManage !== null"
      class="dvs-absolute dvs-absolute-center dvs-shadow-lg dvs-p-8 dvs-rounded dvs-z-50 dvs-bg-white"
    >
      <h4 class="dvs-pb-4">Image Positioning:</h4>

      <div class="dvs-flex dvs-mb-4">
        <button
          class="dvs-btn dvs-mr-2"
          :style="theme.actionButton"
          @click="setImageFloat('left')"
        >Float Left</button>
        <button
          class="dvs-btn dvs-mr-2"
          :style="theme.actionButton"
          @click="setImageFloat('')"
        >No Float</button>
        <button
          class="dvs-btn dvs-mr-2"
          :style="theme.actionButton"
          @click="setImageFloat('right')"
        >Float Right</button>
      </div>

      <div class="dvs-mb-4">
        <fieldset class="dvs-fieldset">
          <label>Margin</label>
          <input
            type="number"
            ref="marginsetting"
            min="0"
            max="200"
            @keyup="setImageMargin"
          >
        </fieldset>
      </div>

      <div class="dvs-pb-8">
        <fieldset class="dvs-fieldset">
          <button
            class="dvs-btn"
            :style="theme.actionButton"
            @click="doneEditingImageStyles"
          >Done</button>
        </fieldset>
      </div>

      <h4 class="dvs-pb-4">Remove Image:</h4>

      <div>
        <fieldset class="dvs-fieldset">
          <button
            class="dvs-btn"
            :style="theme.actionButton"
            @click="removeImage"
          >Remove Image</button>
        </fieldset>
      </div>
    </div>
    <div
      class="dvs-blocker dvs-z-20"
      v-if="imageToManage !== null"
      @click="imageToManage = null"
    ></div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Image,
  Link,
  Strike,
  Underline,
  History,
  Table,
  TableHeader,
  TableCell,
  TableRow,
} from 'tiptap-extensions'
import TextAlign from './wysiwyg/tiptap/extensions/TextAlign'

export default {
  props: {
    value: {
      required: true
    }
  },
  components: {
    EditorContent,
    EditorMenuBar,
    BoldIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/BoldIcon'),
    ItalicIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/ItalicIcon'),
    UnderlineIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/UnderlineIcon'),
    MinusIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/MinusIcon'),
    ImageIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/ImageIcon'),
    CodeIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/CodeIcon'),
    ListIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/ListIcon'),
    MenuIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/MenuIcon'),
    CornerUpLeftIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/CornerUpLeftIcon'),
    CornerUpRightIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/CornerUpRightIcon'),
    AlignLeftIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/AlignLeftIcon'),
    AlignCenterIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/AlignCenterIcon'),
    AlignRightIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/AlignRightIcon'),
    StrikeIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ './icons/StrikeIcon'),
    TableIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ './icons/TableIcon'),
    DeleteTableIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ './icons/DeleteTableIcon'),
    AddColAfterIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ './icons/AddColAfterIcon'),
    AddColBeforeIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ './icons/AddColBeforeIcon'),
    DeleteColIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ './icons/DeleteColIcon'),
    AddRowAfterIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ './icons/AddRowAfterIcon'),
    AddRowBeforeIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ './icons/AddRowBeforeIcon'),
    DeleteRowIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ './icons/DeleteRowIcon'),
    CombineCellsIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ './icons/CombineCellsIcon'),
  },
  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.editor.setContent(newValue)
        this.$emit('input', newValue);
        this.$emit('change', newValue);
      },
    }
  },
  data () {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Image(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Table({
            resizable: true,
          }),
          new TableHeader(),
          new TableCell(),
          new TableRow(),
          new TextAlign()
        ],
        onUpdate: this.update
      }),
      imageToManage: null,
      showSource: false,
      currentCommand: null
    }
  },
  mounted () {
    this.editor.setContent(this.value)
  },
  beforeDestroy () {
    this.editor.destroy()
  },
  methods: {
    launchMediaManager (command) {
      this.currentCommand = command
      window.deviseSettings.$bus.$emit('devise-launch-media-manager', {
        callback: this.mediaSelected,
      });
    },
    mediaSelected (imagesAndSettings) {
      if (typeof imagesAndSettings === 'object') {
        // const html = this.theEditor.el.trumbowyg('html');
        // this.theEditor.el.trumbowyg(
        //   'html',
        //   `${html}<img src="${imagesAndSettings.images.orig_optimized}" width="${
        //   imagesAndSettings.settings.w
        //   }" height="${imagesAndSettings.settings.h}">`
        // );
        this.currentCommand({ src: imagesAndSettings.images.orig_optimized })
      }
    },
    update (e) {
      this.localValue = e.getHTML();
    },
  }
}
</script>
