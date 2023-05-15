$('.slider').slick({
  dots:false,
  centerMode: true,
  arrows:true,
  centerPadding: '10px',
  slidesToShow:1,
  slidesToScroll: 1,
  infinite: true,
  draggable: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        centerPadding: '0',
      }
    },
    {
      breakpoint: 330,
      settings: {
        centerPadding: '0',
      }
    }
  ]
});