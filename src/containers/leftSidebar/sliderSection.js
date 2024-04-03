import Slider from "react-slick";
const SliderSection = () => {

     const  settings = {
            infinite: true,
            speed: 200,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows:false,
            responsive: [
                {
                  breakpoint: 1366,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 800,
                  settings: {
                    slidesToShow: 7,
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 5,
                  }
                },
                {
                  breakpoint: 700,
                  settings: {
                    slidesToShow: 3,
                  }
                }
              ]
        };

    return (
        <div className="recent-slider recent-chat">
            <Slider {...settings}>
                
            </Slider>
        </div>
    );
}

export default SliderSection;