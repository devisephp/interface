<template>
  <div>
    <fieldset
      v-for="(field, key) in theFields"
      :key="key"
      class="dvs-fieldset dvs-mb-1 dvs-leading-loose"
    >
      <div>
        <color-editor
          v-if="field.type === 'color'"
          v-model="value[key]"
          dusk="color-editor-link"
          :options="field"
          :namekey="key"
          @change="editField($event, field, key)"
        ></color-editor>

        <checkbox-editor
          v-if="field.type === 'checkbox'"
          v-model="value[key]"
          dusk="checkbox-editor-link"
          :options="field"
          :namekey="key"
          @change="editField($event, field, key)"
        ></checkbox-editor>

        <datetime-editor
          v-if="field.type === 'datetime'"
          v-model="value[key]"
          :options="field"
          :namekey="key"
          @change="editField($event, field, key)"
        ></datetime-editor>

        <image-editor
          v-if="field.type === 'image'"
          v-model="value[key]"
          :options="field"
          :namekey="key"
          @change="editField($event, field, key)"
        ></image-editor>

        <file-editor
          v-if="field.type === 'file'"
          v-model="value[key]"
          :options="field"
          :namekey="key"
          @change="editField($event, field, key)"
        ></file-editor>

        <link-editor
          v-if="field.type === 'link'"
          v-model="value[key]"
          :options="field"
          :namekey="key"
          @change="editField($event, field, key)"
        ></link-editor>

        <number-editor
          v-if="field.type === 'number'"
          v-model="value[key]"
          :options="field"
          :namekey="key"
          @change="editField($event, field, key)"
        ></number-editor>

        <select-editor
          v-if="field.type === 'select'"
          v-model="value[key]"
          :options="field"
          :namekey="key"
          @change="editField($event, field, key)"
        ></select-editor>

        <textarea-editor
          v-if="field.type === 'textarea'"
          v-model="value[key]"
          :options="field"
          :namekey="key"
          @change="editField($event, field, key)"
        ></textarea-editor>

        <text-editor
          v-if="field.type === 'text'"
          v-model="value[key]"
          dusk="text-editor-link"
          :options="field"
          :namekey="key"
          @change="editField($event, field, key)"
        ></text-editor>

        <wysiwyg-editor
          v-if="field.type === 'wysiwyg'"
          v-model="value[key]"
          :options="field"
          :namekey="key"
          @change="editField($event, field, key)"
        ></wysiwyg-editor>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'SliceEditorFields',
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
    WysiwygEditor: () => import(/* webpackChunkName: "devise-wysiwyg" */ '../editor/Wysiwyg'),
  },
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
  methods: {
    editField (value, field, key) {
      // Send out the notification
      this.$emit('editfield', { value, field, key });
    },
  },
}
</script>
