export default function(el, binding) {
  if (binding.value !== null) {
    let { image, srcAttr, breakpoint } = binding.value;
    const { lazy, background } = binding.modifiers;
    let { noSize } = binding.modifiers;

    breakpoint = breakpoint !== null ? breakpoint : 'desktop';
    srcAttr = srcAttr || 'src';

    if (typeof binding.value === 'string') {
      image = { url: binding.value };
    }

    const theImageSize = () => {
      const { sizes } = image;

      if (!sizes || !sizes[Object.keys(sizes)[0]]) {
        return false;
      }

      for (const size in sizes) {
        if (sizes.hasOwnProperty(size)) {
          const sizeSettings = sizes[size];

          if (sizeSettings.breakpoints) {
            const breakpoints = sizeSettings.breakpoints.map(bp => bp.toLowerCase());
            if (breakpoints.includes(breakpoint.toLowerCase())) {
              return { size, settings: sizeSettings };
            }
          }
        }
      }

      // We couldn't find the size so return the first one
      // If breakpoints isn't set assume only one size and return it
      const defaultSize = Object.keys(sizes)[0];
      return { defaultSize, settings: sizes[defaultSize] };
    };

    const setImageSize = () => {
      if (typeof image !== 'undefined') {
        if (image.media) {
          const theSize = theImageSize();

          if (theSize && image.media[theSize.size]) {
            el.width = theSize.settings.w;
            el.height = theSize.settings.h;
            return true;
          }
        }
      }
      return false;
    };

    const setImage = () => {
      if (typeof image !== 'undefined') {
        // Default the image the url but if it does have a size match
        // set that instead
        let theImage = image.url;
        let theSize = null;

        // Get the image size if sizes are present
        if (image.media) {
          theSize = theImageSize();

          if (theSize) {
            // In the case where sizes are set but the url is manual
            // (or maybe the image media wasn't generated) this will ensure
            // the url is at least present from the media property
            if (image.media[theSize.size]) {
              theImage = image.media[theSize.size];
            }
          } else if (image.media.custom) {
            theImage = image.media.custom;
          }
        } else {
          noSize = true;
        }

        if (background) {
          el.style.backgroundImage = `url('${theImage}')`;
        } else {
          el.setAttribute(srcAttr, theImage);

          if (image.alt) {
            el.alt = image.alt;
          }

          if (!noSize && theSize !== null && theSize.settings) {
            el.width = theSize.settings.w;
            el.height = theSize.settings.h;
          }
        }
      }
    };

    if (lazy && 'IntersectionObserver' in window) {
      setImageSize();

      const lazyImageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setImage();
            lazyImageObserver.unobserve(el);
          }
        });
      });

      lazyImageObserver.observe(el);
    } else {
      setImageSize();
      setImage();
    }
  }
}
