<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    class="dvs-flex dvs-justify-center"
    style="font-size:12px;"
  >
    <div
      v-if="preview"
      class="dvs-my-4 dvs-p-4 dvs-shadow-lg dvs-rounded-sm dvs-overflow-hidden"
      style="background-color: rgba(0,0,0,0.1);"
      :style="{width: width, height: `${heightOfPreview + 30}px`}"
    >
      <div
        class="dvs-overflow-hidden dvs-rounded-sm dvs--mx-1"
        v-html="preview"
      >{{component}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

// eslint-disable-next-line no-undef
const loremIpsum = require('lorem-ipsum');

export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
    heightOfPreview: {
      type: Number,
      required: true,
      default: 200,
    },
  },

  data () {
    return {
      hasPreview: false,
      totalHeight: 0,
      width: '100%',
    };
  },

  computed: {
    ...mapGetters('devise', ['componentFromView']),
    component () {
      return this.componentFromView(this.file.value);
    },
    preview () {
      const component = this.componentFromView(this.file.value);

      if (component.preview) {
        const preview = this.buildPreview(component.preview);
        if (preview) {
          return preview;
        }
      }

      return false;
    },
  },

  mounted () {
    this.checkHasPreview();
    this.setWidth();
  },
  methods: {
    checkHasPreview () {
      if (this.component.preview && this.preview) {
        this.hasPreview = true;
      }
    },
    setWidth () {
      if (this.component.previewWidth && this.component.previewWidth < 1) {
        this.width = `${this.component.previewWidth * 100}%`;
      }
    },
    buildPreview (markup) {
      if (typeof markup !== 'object') {
        return false;
      }

      let preview = '';
      const markupParts = [];

      this.totalHeight = 0;

      markup.map(row => {
        const re = /\{(.*)\}(.*)/g;
        const markupPartsArr = re.exec(row);

        if (markupPartsArr) {
          markupParts.push(markupPartsArr);
          const partHeight = parseInt(markupPartsArr[2], 0);
          if (partHeight > 0) {
            this.totalHeight += parseInt(markupPartsArr[2], 0);
          } else {
            this.totalHeight += 25;
          }
        }
        return false;
      });

      markupParts.map(markupPart => {
        let html = ' ';
        const htmlParts = this.getPreviewHtmlParts(markupPart[1], parseInt(markupPart[2], 0));
        htmlParts.map(part => {
          if (typeof part !== 'undefined') {
            html += part;
          }
          return part;
        });

        preview += html;
        return markupPart;
      });

      return preview;
    },
    getPreviewHtmlParts (description, size) {
      let previewHtmlParts = [];
      const partDescriptions = description.split(',');
      let height = 'auto';

      /* eslint-disable-line */ if (size > 1 && !isNaN(size)) {
        const potentialHeight = size * (this.heightOfPreview / this.totalHeight);
        if (potentialHeight > size) {
          height = `${size}px`;
        } else {
          height = `${potentialHeight}px`;
        }
      }

      // Generate Rows
      previewHtmlParts.push(
        `<div class="dvs-flex dvs-justify-between align-center dvs-mb-2" style="height:${height}">`
      );
      previewHtmlParts = previewHtmlParts.concat(
        partDescriptions.map(partDescription =>
          this.getPreviewHtmlPart(partDescription.trim(), partDescriptions.length, height)
        )
      );
      previewHtmlParts.push('</div>');

      return previewHtmlParts;
    },
    getPreviewHtmlPart (description, columns, height) {
      const type = description.substring(0, 1);
      const settings = description.substring(1);
      const width = `${(1 / columns) * 100}%`;
      let styles = `width:${width};padding:2px;`;
      let iconClasses = '';

      if (type === 'B') {
        if (height === 'auto') {
          height = 100;
        }

        if (settings.includes('bg')) {
          styles += 'background-color:rgba(0,0,0,0.2);';
        } else {
          styles += 'background-color:rgba(0,0,0,0.0);';
        }

        // Icon Size: height * .75 by default, "l" = height, "s" = height * .5
        let dims = height * 0.75;
        if (settings.includes('s')) {
          dims = height * 0.5;
        }
        if (settings.includes('xs')) {
          dims = height * 0.25;
        }

        styles += `height:${dims}px`;

        return `<div style="${styles}" class="dvs-text-center dvs-relative dvs-mx-1">&nbsp;</div>`;
      }

      if (type === 'I') {
        // Icon Size: height * .75 by default, "l" = height, "s" = height * .5
        if (height === 'auto') {
          height = 100;
        }

        let dims = height * 0.75;
        if (settings.includes('s')) {
          dims = height * 0.5;
          iconClasses += 'mt-1 ml-1';
        }
        if (settings.includes('xs')) {
          dims = height * 0.25;
          iconClasses += 'm-0';
        }

        styles += `height:${dims}px;color:rgba(0,0,0,0.5);`;

        return `<div style="${styles}background-color:rgba(0,0,0,0.2)" class="dvs-text-center dvs-relative dvs-mx-1"><svg stroke="currentColor" fill="currentColor" width="20px" height="20px" class="ion__svg dvs-absolute dvs-pin-t dvs-pin-l dvs-mt-4 dvs-ml-4 ${iconClasses}" viewBox="0 0 512 512"><path d="M112.6 312.3h190.7c4.5 0 7.1-5.1 4.5-8.8l-95.4-153.4c-2.2-3.2-6.9-3.2-9.1 0L108 303.5c-2.6 3.7.1 8.8 4.6 8.8zm194.1-58l35 55.7c1 1.5 2.7 2.4 4.5 2.4h53.2c4.5 0 7.1-5.1 4.5-8.8l-61.6-87.7c-2.2-3.2-6.9-3.2-9.1 0L306.6 248c-1.2 1.8-1.2 4.3.1 6.3zm44.4-86.4c13.1-1.3 23.7-11.9 25-25 1.8-17.7-13-32.5-30.7-30.7-13.1 1.3-23.7 11.9-25 25-1.7 17.7 13 32.5 30.7 30.7z"/><path d="M432 48H80c-17.7 0-32 14.3-32 32v352c0 17.7 14.3 32 32 32h352c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32zm-2.7 280c0 4.4-3.6 8-8 8H90.7c-4.4 0-8-3.6-8-8V90.7c0-4.4 3.6-8 8-8h330.7c4.4 0 8 3.6 8 8V328z"/></svg></div>`;
      }
      if (type === 'V') {
        // Icon Size: height * .75 by default, "l" = height, "s" = height * .5
        if (height === 'auto') {
          height = 100;
        }

        let dims = height * 0.75;
        if (settings.includes('s')) {
          dims = height * 0.5;
          iconClasses += 'mt-1 ml-1';
        }
        if (settings.includes('xs')) {
          dims = height * 0.25;
          iconClasses += 'm-0';
        }

        styles += `height:${dims}px;color:rgba(0,0,0,0.5);`;

        return `<div style="${styles}background-color:rgba(0,0,0,0.2)" class="dvs-text-center dvs-relative dvs-mx-1"><svg stroke="currentColor" fill="currentColor" width="20px" height="20px" class="ion__svg dvs-absolute dvs-pin-t dvs-pin-l dvs-mt-4 dvs-ml-4 ${iconClasses}" viewBox="0 0 512 512"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm83.8 211.9l-137.2 83c-2.9 1.8-6.7-.4-6.7-3.9V173c0-3.5 3.7-5.7 6.7-3.9l137.2 83c2.9 1.7 2.9 6.1 0 7.8z"/></svg></div>`;
      }
      if (type === 'T') {
        let text = 'Lorem ipsum dolar imet';

        if (settings.includes('c')) {
          styles += 'text-align:center;';
        }
        if (settings.includes('r')) {
          styles += 'text-align:right;';
        }
        if (settings.includes('l')) {
          styles += 'font-size:rem;';
        }
        if (settings.includes('xl')) {
          styles += 'font-size:1.25em;';
        }
        if (settings.includes('s')) {
          styles += 'font-size:0.50em;';
        }
        if (settings.includes('b')) {
          styles += 'font-weight:700;';
        }
        if (settings.includes('i')) {
          styles += 'font-style:italic';
        }
        if (settings.includes('~')) {
          const re = /~([0-9]*)/g;
          const textLength = re.exec(settings);
          text = loremIpsum({ count: textLength[1], units: 'words' });
        }
        if (settings.includes('-')) {
          const re = /-([T,C,M]*)/g;
          const verticalAlignment = re.exec(settings);
          if (verticalAlignment[1] === 'C') {
            styles += 'display:flex; align-items:center';
          }
          if (verticalAlignment[1] === 'B') {
            styles += 'display:flex; align-items:end';
          }
        }
        return `<div style="${styles}" class=" dvs-mx-1">${text}</div>`;
      }
      if (type === 'F') {
        let finalForm = '<div class="dvs-flex dvs-flex-col dvs-w-full">';
        const textField =
          '<div style="background-color:rgba(255,255,255,0.8);height:20px;" class="dvs-p-1 dvs-w-full dvs-mb-4"></div>';
        const textArea =
          '<div style="background-color:rgba(255,255,255,0.8);height:60px;" class="dvs-p-1 dvs-w-full dvs-mb-4"></div>';
        const submit =
          '<div style="background-color:rgba(255,255,255,0.8);height:30px;" class="dvs-p-1 dvs-w-full dvs-rounded-sm dvs-mb-4 dvs-flex dvs-justify-center dvs-items-center dvs-uppercase dvs-text-xs">Click Me!</div>';

        // Form Size: 2 fields by default, "l" = 3 fields, "s" = 1 field, "xs" = 0 field
        if (!settings.includes('xs')) {
          finalForm += textField;
        }
        if (settings.includes('l')) {
          finalForm += textField;
          finalForm += textField;
          finalForm += textArea;
        }
        if (!settings.includes('s') && !settings.includes('l')) {
          finalForm += textArea;
        }

        finalForm += submit;
        finalForm += '</div>';

        return finalForm;
      }
      return null;
    },
  },


};
</script>
