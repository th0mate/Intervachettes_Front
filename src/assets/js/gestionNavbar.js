document.addEventListener('scroll', function () {
  if (document.documentElement.scrollTop > 10) {
    document.querySelector('nav').style.backgroundColor = 'rgba(255,255,255,0.7)';
    document.querySelector('nav').style.backdropFilter = 'blur(5px)';
  } else {
    document.querySelector('nav').style.backgroundColor = 'rgba(255,255,255,1)';
    document.querySelector('nav').style.backdropFilter = 'none';
  }
});
