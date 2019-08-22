<template>
  <div>
    <fieldset
      v-for="(field, key) in theFields"
      class="dvs-fieldset dvs-mb-1 dvs-leading-loose"
      :key="key"
    >
      <div>
        <color-editor
          dusk="color-editor-link"
          @change="editField($event, field, key)"
          v-model="value[key]"
          :options="field"
          :namekey="key"
          v-if="field.type === 'color'"
        ></color-editor>

        <checkbox-editor
          dusk="checkbox-editor-link"
          @change="editField($event, field, key)"
          v-model="value[key]"
          :options="field"
          :namekey="key"
          v-if="field.type === 'checkbox'"
        ></checkbox-editor>

        <datetime-editor
          @change="editField($event, field, key)"
          v-model="value[key]"
          :options="field"
          :namekey="key"
          v-if="field.type === 'datetime'"
        ></datetime-editor>

        <image-editor
          @change="editField($event, field, key)"
          v-model="value[key]"
          :options="field"
          :namekey="key"
          v-if="field.type === 'image'"
        ></image-editor>

        <file-editor
          @change="editField($event, field, key)"
          v-model="value[key]"
          :options="field"
          :namekey="key"
          v-if="field.type === 'file'"
        ></file-editor>

        <link-editor
          @change="editField($event, field, key)"
          v-model="value[key]"
          :options="field"
          :namekey="key"
          v-if="field.type === 'link'"
        ></link-editor>

        <number-editor
          @change="editField($event, field, key)"
          v-model="value[key]"
          :options="field"
          :namekey="key"
          v-if="field.type === 'number'"
        ></number-editor>

        <select-editor
          @change="editField($event, field, key)"
          v-model="value[key]"
          :options="field"
          :namekey="key"
          v-if="field.type === 'select'"
        ></select-editor>

        <textarea-editor
          @change="editField($event, field, key)"
          v-model="value[key]"
          :options="field"
          :namekey="key"
          v-if="field.type === 'textarea'"
        ></textarea-editor>

        <text-editor
          dusk="text-editor-link"
          @change="editField($event, field, key)"
          v-model="value[key]"
          :options="field"
          :namekey="key"
          v-if="field.type === 'text'"
        ></text-editor>

        <wysiwyg-editor
          @change="editField($event, field, key)"
          v-model="value[key]"
          :options="field"
          :namekey="key"
          v-if="field.type === 'wysiwyg'"
        ></wysiwyg-editor>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'SliceEditorFields',
  props: {
    theFields: {
      required: true,
      type: Object
    },
    value: {
      required: true,
      type: Object
    }
  },
  components: {
    CheckboxEditor: () => import(/* webpackChunkName: "devise-editors" */ '../editor/Checkbox'),
    ColorEditor: () => import(/* webpackChunkName: "devise-editors" */ '../editor/Color'),
    DatetimeEditor: () => import(/* webpackChunkName: "devise-editors" */ '../editor/Datetime'),
    FileEditor: () => import(/* webpackChunkName: "devise-editors" */ '../editor/File'),
    ImageEditor: () => import(/* webpackChunkName: "devise-editors" */ '../editor/Image'),
    LinkEditor: () => import(/* webpackChunkName: "devise-editors" */ '../editor/Link'),
    NumberEditor: () => import(/* webpackChunkName: "devise-editors" */ '../editor/Number'),
    SelectEditor: () => import(/* webpackChunkName: "devise-editors" */ '../editor/Select'),
    TextareaEditor: () => import(/* webpackChunkName: "devise-editors" */ '../editor/Textarea'),
    TextEditor: () => import(/* webpackChunkName: "devise-editors" */ '../editor/Text'),
    WysiwygEditor: () => import(/* webpackChunkName: "devise-editors" */ '../editor/Wysiwyg'),
  },
  methods: {
    editField (value, field, key) {
      // Send out the notification
      this.$emit('editfield', { value, field, key });
    },
  },
}
</script>
