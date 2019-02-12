export default function(el, binding) {
  const link = binding.value;

  el.href = link.href;
  el.target = link.target;
}
