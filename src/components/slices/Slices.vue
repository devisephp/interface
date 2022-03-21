<script>
/* eslint-disable */
import Slice from './Slice.vue';

const UNIQUE_KEY_PROP = '__unique_key_prop__';
const KEY_PREFIX = `__devise__${Date.now()}_`;

let uid = 0;

const isObject = (val) => val !== null && typeof val === 'object';

const genUniqueKey = (obj) => {
  if (isObject(obj)) {
    if (UNIQUE_KEY_PROP in obj) {
      return obj[UNIQUE_KEY_PROP];
    }
    const value = `${KEY_PREFIX}${(uid += 1)}`;
    Object.defineProperty(obj, UNIQUE_KEY_PROP, { value });
    return value;
  }
  return obj;
};

export default {
  name: 'DeviseSlices',
  functional: true,
  render(h, ctx) {
    if (ctx.props.slices && ctx.props.slices.length) {
      return ctx.props.slices.map((s, index) => {
        // If it's a placeholder for model we need to dig down
        // one level and use the placeholder's slices.
        if (s.metadata.type === 'model') {
          if (s.slices) {
            // Deep clone the slices data
            const slicesData = JSON.parse(JSON.stringify(s.slices));

            // Sort the slices by a sort function if it was provided
            if (ctx.props.modifyData) {
              ctx.props.modifyData(slicesData);
            }

            // Build the Array of VNODES that will actually be displayed
            const slices = slicesData.map((ss, modelIndex) =>
              h(
                Slice,
                Object.assign({}, ctx.data, {
                  key: genUniqueKey(ss),
                  props: {
                    devise: ss,
                    sliceIndex: modelIndex,
                    editorMode: ctx.props.editorMode,
                  },
                })
              )
            );
            return slices;
          }
        } else {
          return h(
            Slice,
            Object.assign({}, ctx.data, {
              key: genUniqueKey(s),
              props: {
                devise: s,
                sliceIndex: index,
                editorMode: ctx.props.editorMode,
              },
            })
          );
        }
      });
    }
  },

  props: {
    editorMode: {
      type: Boolean,
      default: false,
    },

    modifyData: {
      type: Function,
      default: null,
    },
  },

  mounted() {
    // Emit the bus event to notifify that we are done loading
    this.$nextTick(() => {
      // Emit the bus event to notifify that we are done loading
      window.deviseSettings.$bus.$emit('devise-loaded');
    });
  },
};
</script>
