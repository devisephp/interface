import { TweenMax, TimelineLite } from 'gsap';

export default {
  inserted(el) {
    const offset = 5;

    const style = window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle;

    const marginLeft = parseInt(style.marginLeft, 0) || 0;
    const marginRight = parseInt(style.marginRight, 0) || 0;
    const marginTop = parseInt(style.marginTop, 0) || 0;

    const elX = el.offsetLeft - marginLeft;
    const elY = el.offsetTop - marginTop;

    let initTimeout = null;
    let elWidth = el.offsetWidth;
    let elHeight = el.offsetHeight;

    const blocker = document.createElement('div');
    blocker.classList.add('dvs-blocker');
    document.body.appendChild(blocker);

    function calculateTuckX() {
      const rightSide = elX + elWidth + marginLeft + marginRight;
      const leftSide = elX;
      const halfWindow = window.innerWidth / 2;

      if (rightSide - halfWindow > halfWindow - leftSide) {
        return window.innerWidth - offset - marginLeft;
      }

      return -elWidth + offset;
    }

    function hide() {
      elWidth = el.offsetWidth;
      elHeight = el.offsetHeight;

      const timeline = new TimelineLite();
      const tuckX = calculateTuckX();

      TweenMax.to(el, 1, {
        left: `${tuckX}px`,
        width: `${elWidth}px`,
        height: `${elHeight}px`,
        ease: Elastic.easeOut.config(0.5, 0.5), // eslint-disable-line
      });

      timeline
        .to(blocker, 0.5, {
          opacity: 0,
          ease: Power3.easeIn, // eslint-disable-line
        })
        .to(blocker, 0, {
          top: `${window.innerHeight}px`,
        });

      window.deviseSettings.$bus.$emit('devise-close-sidebar');
    }

    function show() {
      const timeline = new TimelineLite();

      // Kill the initial page hide if I mouse over
      clearTimeout(initTimeout);

      TweenMax.to(el, 1, {
        top: `${elY}px`,
        left: `${elX}px`,
        width: 'auto',
        ease: Elastic.easeOut.config(0.5, 0.5), // eslint-disable-line
      });

      timeline
        .to(blocker, 0, {
          top: '0px',
        })
        .to(blocker, 0.5, {
          opacity: 0.3,
          ease: Power3.easeOut, // eslint-disable-line
        });
    }

    initTimeout = setTimeout(() => {
      hide();
    }, 1500);

    el.addEventListener('mouseenter', show);
    blocker.addEventListener('click', hide);
  },
};
