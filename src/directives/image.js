export default function(el, binding, vnode) {
  let image = binding.value.image;
  let srcAttribute = binding.value.srcAttr;
  let breakpoint = binding.value.breakpoint;
  let background = binding.modifiers.background;
  let lazy = binding.modifiers.lazy;
  let noSize = binding.modifiers.nosize;

  breakpoint = breakpoint !== null ? breakpoint : 'desktop';
  srcAttribute = srcAttribute ? srcAttribute : 'src';

  let setImage = () => {
    // Default the image the url but if it does have a size match
    // set that instead
    let theImage = image.url;

    // Get the image size if sizes are present
    if (image.sizes) {
      let theSize = theImageSize();

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
      el.style.backgroundImage = `url(${theImage})`;
    } else {
      el[srcAttribute] = theImage;

      if (image.alt) {
        el.alt = image.alt;
      }

      if (!noSize && typeof theSize !== 'undefined') {
        el.width = theSize.settings.w;
        el.height = theSize.settings.h;
      }
    }
  };

  let theImageSize = () => {
    let sizes = image.sizes;

    // Search the sizes for the right size based on the current breakpoint
    for (const size in sizes) {
      if (sizes.hasOwnProperty(size)) {
        const sizeSettings = sizes[size];

        if (sizeSettings.breakpoints && sizeSettings.breakpoints.includes(breakpoint)) {
          return { size: size, settings: sizeSettings };
        }
        // If breakpoints isn't set assume only one size and return it
      }
    }

    // We couldn't find the size so return the first one
    let defaultSize = Object.keys(sizes)[0];
    return { size: defaultSize, settings: sizes[defaultSize] };
  };

  if (lazy && 'IntersectionObserver' in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
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
