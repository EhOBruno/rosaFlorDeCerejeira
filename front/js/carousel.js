$('.carousel').slick({
  infinite: false,
  slidesPerRow: 6,
  initialSlide: 2,
  centerMode: true,
  centerPadding: '60px',
  lazyLoad: 'ondemand',
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});