export default {
  inserted (el) {
    let initTimeout = null;

    const blocker = document.createElement('div');
    blocker.classList.add('dvs-blocker');
    document.body.appendChild(blocker);

    const sidebarHint = document.createElement('div');
    sidebarHint.classList.add('dvs-sidebar-hint');
    document.body.appendChild(sidebarHint);

    el.style.transition = '500ms all';
    blocker.style.transition = '800ms all';

    function hide () {
      el.style.opacity = 0;
      el.classList.add('pointer-events-none');
      blocker.style.opacity = 0;
      blocker.classList.add('pointer-events-none');
      window.deviseSettings.$bus.$emit('devise-close-sidebar');
    }

    function show () {
      clearTimeout(initTimeout);
      el.style.opacity = 1;
      el.classList.add('pointer-events-auto');
      blocker.style.opacity = 0.75;
      blocker.classList.add('pointer-events-auto');
      window.deviseSettings.$bus.$emit('devise-open-sidebar');
    }

    initTimeout = setTimeout(() => {
      hide();
    }, 1500);

    el.addEventListener('mouseenter', show);
    blocker.addEventListener('click', hide);
  },
};