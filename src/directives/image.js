export default function (el, binding) {
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

    // Search the sizes for the right size based on the current breakpoint
    for (const size in sizes) {
      if (sizes.hasOwnProperty(size)) {
        const sizeSettings = sizes[size];

        if (sizeSettings.breakpoints && sizeSettings.breakpoints.includes(breakpoint)) {
          return { size, settings: sizeSettings };
        }
        // If breakpoints isn't set assume only one size and return it
      }
    }

    // We couldn't find the size so return the first one
    const defaultSize = Object.keys(sizes)[0];
    return { size: defaultSize, settings: sizes[defaultSize] };
  };

  const setImage = () => {
    if (typeof image !== 'undefined') {
      // Default the image the url but if it does have a size match
      // set that instead
      let theImage = image.url;
      let theSize = null;

      // Get the image size if sizes are present
      if (image.sizes) {
        theSize = theImageSize();

        if (theSize) {
          // In the case where sizes are set but the url is manual
          // (or maybe the image media wasn't generated) this will ensure
          // the url is at least present from the media property
          if (image.media[theSize.size]) {
            theImage = image.media[theSize.size];
          }
        }
      } else {
        noSize = true;
      }
      if (background) {
        el.style.backgroundImage = `url('${theImage}')`;
      } else {
        el[srcAttr] = theImage;

        if (image.alt) {
          el.alt = image.alt;
        }

        if (!noSize && theSize !== null) {
          el.width = theSize.settings.w;
          el.height = theSize.settings.h;
        }
      }
    }
  };

  if (lazy && 'IntersectionObserver' in window) {
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
    setImage();
  }
}
