<template>
  <devise-installer-item
    :item="item"
    id="nav-page"
    title="First Page (required)"
  >
    <template slot="instructions">
      <p>It's time to create your first page. We'd suggest maybe making your homepage. There's a lot to cover here but don't be intimidated. We will walk you through each step.</p>
      <p>
        A Devise page is built on two parts: A layout file which follows
        <a
          href="https://laravel.com/docs/5.7/blade"
          target="_blank"
        >Laravel's Blade System</a> and slices.
      </p>
      <p>
        <strong>What a Layout Is:</strong> A layout blade file is a file that is intended to be used across many pages. This way you don't have to set the &lt;head&gt;, Javascript includes, style inclues, etc on every single page. Each page that is assigned that layout extends it placing it's content where you see fit. We have provided a boilerplate for you to the right. Copy the contents and save them to "/resources/views/main.blade.php".
      </p>

      <p>
        <strong>Language:</strong>: The language should be pretty obvious: What language is this page in? But what is exciting is that if you have multiple languages you'll be able to quickly deploy localized content based on whatever language the user has selected. More on that in the official documention. For now: select your first language you created above in the sites section.
      </p>

      <p>
        <strong>Slug:</strong> Finally, the slug is just the url the page lives on. The homepage slug would be "/" while an about page might live at "/about" or "/about-us". The important thing is that it is lower case, has no spaces and is prefixed with a slash.
      </p>
    </template>

    <template slot="example">
      <h3 class="dvs-mb-4">Create Your first Page
        <template v-if="item">(Already Created)</template>
      </h3>
      <form
        class="dvs-mb-8"
        :class="{'dvs-opacity-50': item}"
      >
        <fieldset class="dvs-fieldset dvs-mb-4">
          <label>Page Title</label>
          <input
            type="text"
            v-model="newPage.title"
            :disabled="item"
          >
        </fieldset>
        <fieldset class="dvs-fieldset dvs-mb-8">
          <label>Layout</label>
          <select v-model="newPage.layout">
            <option
              :value="layout"
              v-for="layout in layouts"
              :key="layout"
            >{{ layout }}</option>
          </select>
        </fieldset>
        <fieldset
          class="dvs-fieldset dvs-mb-6"
          v-if="languages.length"
        >
          <label>Language</label>
          <select
            v-model="newPage.language_id"
            :disabled="item"
          >
            <option
              v-for="language in languages"
              :key="language.id"
              :value="language.id"
            >{{ language.code }}</option>
          </select>
        </fieldset>
        <fieldset class="dvs-fieldset dvs-mb-6">
          <label>Slug</label>
          <input
            type="text"
            v-model="newPage.slug"
            :disabled="item"
          >
        </fieldset>
        <button
          type="submit"
          class="dvs-btn dvs-bg-green dvs-text-white"
          @click.prevent="attemptCreatePage()"
          :disabled="item"
        >Create Page</button>
      </form>

      <h3 class="dvs-mb-4">A solid boilerplate for your first layout file</h3>
      <p>
        Save the following to
        <span class="dvs-font-mono">/resource/views/main.blade.php</span>
      </p>
      <pre class="lang-html line-numbers">
        <code v-html="layoutTemplate"></code>
      </pre>
    </template>
  </devise-installer-item>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    DeviseInstallerItem: () => import(/* webpackChunkName: "devise-installer" */ "../Item.vue"),
  },
  data () {
    return {
      newPage: {
        site_id: 1,
        language_id: 1,
        published: 1,
        title: 'Homepage',
        layout: 'main',
        language: null,
        slug: '/'
      },
      layoutTemplate: `
        &lt;!doctype html&gt;
        &lt;html lang="{{ app()-&gt;getLocale() }}"&gt;
          &lt;head&gt;
            @isset($page)
            {!! Devise::head($page) !!}
            @else
            {!! Devise::head() !!}
            @endif

            @if(Auth::user())
              &lt;link href=/devise/css/chunk-vendors.css rel=stylesheet&gt;
              &lt;link href=/devise/css/main.css rel=stylesheet&gt;
              &lt;link href=/devise/css/styles.css rel=stylesheet&gt;
            @endif

            &lt;meta charset="utf-8"&gt;
            &lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;
            &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
            &lt;meta name="csrf-token" content="{{ csrf_token() }}"&gt;
          &lt;/head&gt;

          &lt;body&gt;
            &lt;div id="app"&gt;
                &lt;div v-cloak&gt;
                  &lt;devise&gt;
                    &lt;div slot="on-top"&gt;&lt;/div&gt;

                    &lt;div slot="static-content"&gt;
                        @yield('content')
                    &lt;/div&gt;

                    &lt;div slot="on-bottom"&gt;&lt;/div&gt;
                  &lt;/devise&gt;
                &lt;/div&gt;
            &lt;/div&gt;

            &lt;script rel="prefetch" src="{{vuemix('js/chunk-vendors.js', '/devise')}}"&gt;&lt;/script&gt;
            &lt;script rel="prefetch" src="{{vuemix('js/main.js', '/devise')}}"&gt;&lt;/script&gt;
          &lt;/body&gt;
        &lt;/html&gt;
        `
    };
  },
  methods: {
    ...mapActions('devise', ['createPage']),
    attemptCreatePage () {
      this.createPage(this.newPage);
    }
  },
  computed: {
    ...mapState('devise', {
      languages: state => state.languages.data
    }),
    layouts () {
      return window.deviseSettings.$config.layouts;
    }
  },
  props: {
    item: {
      required: true
    }
  }
};
</script>
