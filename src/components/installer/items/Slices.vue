<template>
  <devise-installer-item
    id="nav-slices"
    :item="item"
    title="Your First Slice (required)"
  >
    <template slot="instructions">
      <p>Devise pages are made up of slices and they live inside /resources/views/slices directory. Make this directory and you'll be on your way.</p>
    </template>

    <template slot="example">
      <h3 class="dvs-mb-4">Create your first slice</h3>
      <p>
        Save the following to
        <span class="dvs-font-mono">/resource/views/slices/test/first-slice.blade.php</span>
      </p>
      <p class="dvs-mb-4">
        <div class="dvs-mb-8">
          <pre
            v-pre
            class="lang-javascript line-numbers"
          >
          <code>
            &#64;section('template')
            <div>
                <h1>&#64;&#123;&#123; devise.title.text &#125;&#125;</h1>
            </div>
            &#64;endsection

            &#64;section('component')
            &lt;script&gt;
                var component = {
                    preview: ['{Bbg}'],
                    description: 'Empty container with child slices',
                    fields: {
                      title: {
                        label: 'Title',
                        type: 'text',
                        default: {
                          text: 'Hey there! You did it!'
                        }
                      }
                    }
                }
            &lt;/script&gt;
            &#64;endsection
          </code>
        </pre>
        </div>
    </template>

  </devise-installer-item>
</template>

<script>

export default {
  components: {
    DeviseInstallerItem: () => import(/* webpackChunkName: "devise-installer" */ "../Item.vue"),
  },
  props: {
    item: {
      type: Boolean,
      required: true
    }
  }
};
</script>
