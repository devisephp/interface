<template>
  <div class="dvs-bg-white dvs-rounded dvs-relative">
    <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
      <div
        class="dvs-bg-gray-400 dvs-flex dvs-flex-wrap dvs-items-center dvs-rounded dvs-rounded-b-none"
      >
        <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.bold() }"
          @click="commands.bold"
        >
          <bold-icon />
        </div>

        <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.italic() }"
          @click="commands.italic"
        >
          <italic-icon />
        </div>

        <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.strike() }"
          @click="commands.strike"
        >
          <strike-icon />
        </div>

        <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.underline() }"
          @click="commands.underline"
        >
          <underline-icon />
        </div>

        <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.superscript() }"
          @click="commands.superscript"
        >
          <sup>2</sup>
        </div>

        <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.underline() }"
          @click="launchMediaManager(commands.image)"
        >
          <image-icon />
        </div>

        <!-- <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.code() }"
          @click="commands.code"
        >
          <code-icon />
        </div> -->

        <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          P
        </div>

        <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </div>

        <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </div>

        <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </div>

        <editor-menu-bubble
          v-slot="{ commands, isActive, getMarkAttrs, menu }"
          class="menububble"
          :editor="editor"
          @hide="hideLinkMenu"
        >
          <div
            class="menububble"
            :class="{ 'is-active': menu.isActive }"
            :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
          >
            <form
              v-if="linkMenuIsActive"
              class="menububble__form dvs-bg-admin-bg dvs-text-admin-fg dvs-absolute dvs-p-4 dvs-rounded-sm dvs-shadow dvs-mt-2 dvs-z-10"
              @submit.prevent="setLinkUrl(commands.link, linkUrl)"
            >
              <fieldset class="dvs-fieldset">
                <input
                  ref="linkInput"
                  v-model="linkUrl"
                  class="menububble__input dvs-mr-2"
                  type="text"
                  placeholder="https://"
                  @keydown.esc="$emit('hide')"
                />
                <button
                  class="menububble__button dvs-btn dvs-btn-primary"
                  type="button"
                  @click="setLinkUrl(commands.link, null)"
                >
                  Remove
                </button>
              </fieldset>
            </form>

            <div
              class="wysiwyg-editor-button"
              :class="{ 'dvs-bg-gray-500': isActive.underline() }"
              @click="showLinkMenu(getMarkAttrs('link'))"
            >
              <link-icon />
            </div>
          </div>
        </editor-menu-bubble>

        <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <menu-icon />
        </div>

        <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <list-icon />
        </div>

        <div
          class="dvs-p-2 dvs-text-2xl dvs-font-bold dvs-font-display wysiwyg-editor-button"
          style="line-height:0.5; font-family:Verdana"
          :class="{ 'dvs-bg-gray-500': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          &quot;
        </div>

        <div>
          <div
            class="wysiwyg-editor-button"
            :class="{ 'is-active': isActive.textcolor({ color: 'red' }) }"
            @click="showTextColorPicker = true"
          >
            <type-icon />
          </div>
          <div
            v-if="showTextColorPicker"
            class="dvs-absolute dvs-z-10 dvs-top-0 dvs--mt-8 dvs-bg-gray-300 dvs-p-4 dvs-rounded dvs-shadow-lg"
          >
            <color-picker
              v-model="textColor"
              class="dvs-mb-2"
              @cancel="showTextColorPicker = false"
            />

            <div class="dvs-flex dvs-items-stretch">
              <div
                class="dvs-btn dvs-bg-black dvs-text-gray-300 dvs-mr-2"
                @click="applyTextColor(commands)"
              >
                Apply
              </div>
              <div
                class="dvs-btn dvs-border-black dvs-text-black dvs-border-2"
                @click="showTextColorPicker = false"
              >
                Cancel
              </div>
            </div>
          </div>
        </div>

        <!-- <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.code_block() }"
          @click="commands.code_block"
        >
          <code-icon />
        </div> -->
        <div
          class="wysiwyg-editor-button"
          :class="{ 'is-active': isActive.alignment({ textAlign: 'left' }) }"
          @click="commands.alignment({ textAlign: 'left' })"
        >
          <align-left-icon />
        </div>

        <div
          class="wysiwyg-editor-button"
          :class="{ 'is-active': isActive.alignment({ textAlign: 'center' }) }"
          @click="commands.alignment({ textAlign: 'center' })"
        >
          <align-center-icon />
        </div>

        <div
          class="wysiwyg-editor-button"
          :class="{ 'is-active': isActive.alignment({ textAlign: 'center' }) }"
          @click="commands.alignment({ textAlign: 'right' })"
        >
          <align-right-icon />
        </div>

        <div class="wysiwyg-editor-button" @click="commands.horizontal_rule">
          <minus-icon />
        </div>

        <div class="wysiwyg-editor-button" @click="commands.undo">
          <corner-up-left-icon />
        </div>

        <div class="wysiwyg-editor-button" @click="commands.redo">
          <corner-up-right-icon />
        </div>

        <div
          class="wysiwyg-editor-button"
          @click="commands.createTable({ rowsCount: 3, colsCount: 3, withHeaderRow: false })"
        >
          <table-icon />
        </div>

        <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': showSource }"
          @click="showSource = !showSource"
        >
          <code-icon />
        </div>

        <span v-if="isActive.table()" class="dvs-bg-gray-500dvs-flex dvs-items-center">
          <span class="dvs-text-2xs dvs-uppercase dvs-px-2 dvs-text-gray-800">Table Controls</span>
          <div class="wysiwyg-editor-button" @click="commands.deleteTable">
            <delete-table-icon />
          </div>
          <div class="wysiwyg-editor-button" @click="commands.addColumnBefore">
            <add-col-before-icon />
          </div>
          <div class="wysiwyg-editor-button" @click="commands.addColumnAfter">
            <add-col-after-icon />
          </div>
          <div class="wysiwyg-editor-button" @click="commands.deleteColumn">
            <delete-col-icon />
          </div>
          <div class="wysiwyg-editor-button" @click="commands.addRowBefore">
            <add-row-before-icon />
          </div>
          <div class="wysiwyg-editor-button" @click="commands.addRowAfter">
            <add-row-after-icon />
          </div>
          <div class="wysiwyg-editor-button" @click="commands.deleteRow">
            <delete-row-icon />
          </div>
          <div class="wysiwyg-editor-button" @click="commands.toggleCellMerge">
            <combine-cells-icon />
          </div>
        </span>
      </div>
    </editor-menu-bar>

    <editor-floating-menu v-slot="{ commands, isActive, menu }" :editor="editor">
      <div
        class="editor__floating-menu dvs-bg-gray-400 dvs-flex dvs-flex-wrap dvs-items-center dvs-rounded dvs-rounded-b-none"
        :class="{ 'is-active': menu.isActive }"
        :style="`top: ${menu.top}px`"
      >
        <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.underline() }"
          @click="launchMediaManager(commands.image)"
        >
          <image-icon />
        </div>

        <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          P
        </div>

        <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </div>

        <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </div>

        <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </div>

        <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <menu-icon />
        </div>

        <div
          class="wysiwyg-editor-button"
          :class="{ 'dvs-bg-gray-500': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <list-icon />
        </div>

        <div
          class="dvs-p-2 dvs-text-2xl dvs-font-bold dvs-font-display wysiwyg-editor-button"
          style="line-height:0.5;"
          :class="{ 'dvs-bg-gray-500': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          &quot;
        </div>

        <div
          class="wysiwyg-editor-button"
          @click="commands.createTable({ rowsCount: 3, colsCount: 3, withHeaderRow: false })"
        >
          <table-icon />
        </div>
      </div>
    </editor-floating-menu>

    <editor-content
      v-if="!showSource"
      style="max-height:50vh"
      class="dvs-overflow-y-scroll"
      :editor="editor"
    />
    <textarea
      v-if="showSource"
      v-model="localValue"
      class="dvs-h-full dvs-p-8 dvs-w-full dvs-font-mono dvs-text-sm dvs-text-gray-800"
      style="height:300px"
      @keyup="updateSource"
    >
    </textarea>

    <div
      v-if="imageToManage !== null"
      class="dvs-absolute dvs-absolute-center dvs-shadow-lg dvs-p-8 dvs-rounded dvs-z-50 dvs-bg-white"
    >
      <h4 class="dvs-pb-4">Image Positioning:</h4>

      <div class="dvs-flex dvs-mb-4">
        <div class="dvs-btn dvs-mr-2 dvs-btn-primary dvs-btn-sm" @click="setImageFloat('left')">
          Float Left
        </div>
        <div class="dvs-btn dvs-mr-2 dvs-btn-primary dvs-btn-sm" @click="setImageFloat('')">
          No Float
        </div>
        <div class="dvs-btn dvs-mr-2 dvs-btn-primary dvs-btn-sm" @click="setImageFloat('right')">
          Float Right
        </div>
      </div>

      <div class="dvs-mb-4">
        <fieldset class="dvs-fieldset">
          <label>Margin</label>
          <input ref="marginsetting" type="number" min="0" max="200" @keyup="setImageMargin" />
        </fieldset>
      </div>

      <div class="dvs-pb-8">
        <fieldset class="dvs-fieldset">
          <div class="dvs-btn dvs-btn-primary" @click="doneEditingImageStyles">Done</div>
        </fieldset>
      </div>

      <h4 class="dvs-pb-4">Remove Image:</h4>

      <div>
        <fieldset class="dvs-fieldset">
          <div class="dvs-btn dvs-btn-primary" @click="removeImage">Remove Image</div>
        </fieldset>
      </div>
    </div>
    <div
      v-if="imageToManage !== null"
      class="dvs-blocker dvs-z-20"
      @click="imageToManage = null"
    ></div>
  </div>
</template>

<script>
import {
  Editor,
  EditorFloatingMenu,
  EditorContent,
  EditorMenuBar,
  EditorMenuBubble,
} from 'tiptap';
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
} from 'tiptap-extensions';
import TextAlign from './wysiwyg/tiptap/extensions/TextAlign';
import TextColor from './wysiwyg/tiptap/extensions/TextColor';
import Superscript from './wysiwyg/tiptap/extensions/Superscript';

// eslint-disable-next-line no-undef
const Chrome = require(/* webpackChunkName: "vue-color" */ 'vue-color/src/components/Chrome.vue')
  .default;

export default {
  components: {
    EditorContent,
    EditorFloatingMenu,
    EditorMenuBar,
    EditorMenuBubble,
    'color-picker': Chrome,
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
    TypeIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/TypeIcon'),
    StrikeIcon: () => import(/* webpackChunkName: "devise-icons" */ './icons/StrikeIcon'),
    TableIcon: () => import(/* webpackChunkName: "devise-icons" */ './icons/TableIcon'),
    DeleteTableIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ './icons/DeleteTableIcon'),
    AddColAfterIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ './icons/AddColAfterIcon'),
    AddColBeforeIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ './icons/AddColBeforeIcon'),
    DeleteColIcon: () => import(/* webpackChunkName: "devise-icons" */ './icons/DeleteColIcon'),
    AddRowAfterIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ './icons/AddRowAfterIcon'),
    AddRowBeforeIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ './icons/AddRowBeforeIcon'),
    DeleteRowIcon: () => import(/* webpackChunkName: "devise-icons" */ './icons/DeleteRowIcon'),
    CombineCellsIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ './icons/CombineCellsIcon'),
    LinkIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/LinkIcon'),
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new Superscript(),
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
          new TextAlign(),
          new TextColor(),
        ],
        onUpdate: this.update,
        autoFocus: false,
      }),
      imageToManage: null,
      showSource: false,
      currentCommand: null,
      showTextColorPicker: false,
      textColor: '#000000',
      linkUrl: null,
      linkMenuIsActive: false,
    };
  },

  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
        this.$emit('change', newValue);
      },
    },
  },

  watch: {
    value: {
      handler(newValue) {
        // if the value changes on init or from outside the component update the editor
        if (newValue !== this.editor.getHTML()) {
          this.editor.setContent(newValue);
        }
      },
      immediate: true,
    },
  },

  mounted() {
    if (typeof this.value === 'undefined') {
      // eslint-disable-next-line no-console
      console.warn(
        'Devise: The initial value for the WYSIWYG field was undefined. Consider wrapping it in a v-if until the model is resolved.'
      );
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    launchMediaManager(command) {
      this.currentCommand = command;
      window.deviseSettings.$bus.$emit('devise-launch-media-manager', {
        callback: this.mediaSelected,
      });
    },
    mediaSelected(imagesAndSettings) {
      if (typeof imagesAndSettings === 'object') {
        this.currentCommand({ src: imagesAndSettings.images.media.custom });
      } else {
        this.currentCommand({ src: imagesAndSettings });
      }
    },
    update(e) {
      this.localValue = e.getHTML();
    },
    updateSource(e) {
      this.updateContent(e.target.value);
    },
    updateContent(content) {
      this.editor.setContent(content);
    },
    applyTextColor(commands) {
      const { r, g, b, a } = this.textColor.rgba;
      commands.textcolor({ color: `rgba(${r},${g},${b},${a})` });
      this.showTextColorPicker = false;
    },
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href;
      this.linkMenuIsActive = true;
      this.$nextTick(() => {
        this.$refs.linkInput.focus();
      });
    },
    hideLinkMenu() {
      this.linkUrl = null;
      this.linkMenuIsActive = false;
    },
    setLinkUrl(command, url) {
      command({ href: url });
      this.hideLinkMenu();
    },
  },
};
</script>
