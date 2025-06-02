gsap.from('#updiv p', {
  y: 400,
  duration: 2
});

gsap.from('#downdiv p', {
  y: -400,
  duration: 2
});

gsap.from('#imgbox img', {
  opacity: 0,
  duration: 5,
  rotation: 360,
  scale: 1.2,
  ease: 'bounce'
});

gsap.to('#right', {
  y: window.innerHeight,
  duration: 2,
  ease: 'bounce.out'
});

gsap.to('#left', {
  y: -window.innerHeight,
  duration: 2,
  ease: 'bounce.out'
});

// about section

gsap.from(".lap-light", {
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".lap-light",
    start: "top 50%",
    onEnter: () => {
      document.querySelector(".lap-light").style.display = "block";
    },
    onLeaveBack: () => {
      document.querySelector(".lap-light").style.display = "none";
    },
    markers: true
  }
});

gsap.from('.HadphoneAboutDivImg', {
  x: -400,
  duration: 2,
  opacity: 0,
  ease: 'power1.inOut',
  scrollTrigger: {
    trigger: '.HadphoneAboutDivImg',
    start: 'top 70%',
    end: 'bottom 40%',
    markers: true
  }
})
