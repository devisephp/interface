// eslint-disable-next-line no-undef
const tinycolor = require(/* webpackChunkName: "tinycolor" */ 'tinycolor2');

export default function (el, binding) {
  if (binding.value !== null) {
    const { background } = binding.modifiers;


    if (background) {
      const backgroundColor = window.getComputedStyle(el).getPropertyValue('background-color');

      if (backgroundColor) {
        const newColor = tinycolor(backgroundColor);
        newColor.setAlpha(binding.value)

        el.style.backgroundColor = newColor
      }
    }
  }
}
