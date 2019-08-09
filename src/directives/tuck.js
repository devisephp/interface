export default {
  inserted (el) {
    let initTimeout = null;

    const blocker = document.createElement('div');
    blocker.classList.add('dvs-blocker');
    document.body.appendChild(blocker);

    const sidebarHint = document.createElement('div');
    sidebarHint.classList.add('dvs-sidebar-hint');
    sidebarHint.style.opacity = 0;
    sidebarHint.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" w="25" h="25" class="dvs-m-3 feather feather-power"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>`;
    document.body.appendChild(sidebarHint);

    sidebarHint.style.transition = '500ms all ease-in-out';
    el.style.transition = '500ms all';
    blocker.style.transition = '800ms all';

    function hide () {
      el.style.opacity = 0;
      el.classList.add('dvs-pointer-events-none');

      blocker.style.opacity = 0;
      blocker.classList.add('dvs-pointer-events-none');

      sidebarHint.classList.remove('hidden');

      setTimeout(() => {
        sidebarHint.style.opacity = 1;
        sidebarHint.style.top = '1px';
        sidebarHint.style.left = '1px';
        el.classList.add('hidden');
      }, 500);

      window.deviseSettings.$bus.$emit('devise-close-sidebar');
    }

    function show () {
      clearTimeout(initTimeout);

      el.style.opacity = 1;
      el.classList.add('dvs-pointer-events-auto');

      blocker.style.opacity = 0.75;
      blocker.classList.add('dvs-pointer-events-auto');

      sidebarHint.style.opacity = 0;
      sidebarHint.style.top = '-100px';
      sidebarHint.style.left = '-100px';

      setTimeout(() => {
        sidebarHint.classList.add('hidden');
        el.classList.remove('hidden');
      }, 500);

      window.deviseSettings.$bus.$emit('devise-open-sidebar');
    }

    initTimeout = setTimeout(() => {
      hide();
    }, 1500);

    sidebarHint.addEventListener('click', show);
    blocker.addEventListener('click', hide);
  },
};