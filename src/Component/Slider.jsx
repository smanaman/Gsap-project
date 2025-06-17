import React, { useState, useEffect, useRef } from 'react';
import './Slider.css'; // Assuming you have a CSS file for styles
const Slider = () => {
  // Sample slide data
  const slides = [
    {
      image: './banner-slider.jpg',
      title: 'Find Best  Mantley Sound',
      description: 'Explore the wonders of nature with us.'
    },
    {
      image: 'slider2-bg.jpg',
      title: 'Mountain Adventure',
      description: 'Discover breathtaking mountain views.'
    },
    {
      image: 'slider3-bg.jpg',
      title: 'Coastal Getaway',
      description: 'Relax by the serene coastal waters.'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  // Auto slide effect
  useEffect(() => {
    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, 3000);
    };

    startAutoSlide();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSlide]);

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    scrollToSlide();
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    scrollToSlide();
  };

  const scrollToSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.clientWidth * currentSlide,
        behavior: 'smooth'
      });
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.clientWidth * index,
        behavior: 'smooth'
      });
    }
  };

  // Inline styles
  const styles = {
    sliderContainer: {
      position: 'relative',
      width: '100%',
 
      margin: '0 auto',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      borderRadius: '8px'
    },
    slider: {
      display: 'flex',

      scrollSnapType: 'x mandatory',
      overflowX: 'scroll',
      scrollBehavior: 'smooth',
      WebkitOverflowScrolling: 'touch',
      height: '600px', // Increased height for better content display
      msOverflowStyle: 'none',
      scrollbarWidth: 'none'
    },
    sliderHideScrollbar: {
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    },
    slide: {
      flex: '0 0 100%',
      scrollSnapAlign: 'start',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      
      
    },
    slideContent: {
      width: '32.7%', 
     whiteSpace: 'nowrap',
      height: '100%', 
      background: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      boxSizing: 'border-box'
    },
    sliderButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '50px',
      height: '50px',
 background:' rgba(255, 255, 255, 0.3)',      color: 'white',
      border: 'none',
      borderRadius: '50%',
      fontSize: '24px',
      cursor: 'pointer',
      zIndex: '10',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: 'rgba(0, 0, 0, 0.8)'
      }
    },
    prevButton: {
      left: '20px'
    },
    nextButton: {
      right: '20px'
    },
    sliderDots: {
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '10px',
      zIndex: '10'
    },
    dot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.5)',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    activeDot: {
      background: 'white',
      transform: 'scale(1.2)'
    },
    contentTitle: {
      fontSize: '2rem',
      marginBottom: '1rem',
      fontWeight: 'bold'
    },
    contentDescription: {
      fontSize: '1.1rem',
      lineHeight: '1.6'
    }
  };

  return (
    <div style={styles.sliderContainer}>
      {/* Slider */}
      <div 
        ref={sliderRef} 
        style={{ ...styles.slider, ...styles.sliderHideScrollbar }}
      >
        {slides.map((slide, index) => (
          <div 
            key={index}
            style={{ 
              ...styles.slide, 
              backgroundImage: `url(${slide.image})` 
            }}
          >
            <div style={styles.slideContent}>
              <p className='SliderTextFirst'>Find Best</p>
              <p className='SliderTextSecond'><span>Mantley</span> Sound</p>
              <p className='SliderTextDescription'>Stylish, folded design with active noise cancellation for crystal clear audio 3.5mm  Wired or</p>
            <p className='SliderTextDescription'> Bluetooth wireless conncectivity</p>
            <button className='SliderButton'>Shop Now</button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation buttons */}
      {/* <button 
        style={{ ...styles.sliderButton, ...styles.prevButton }} 
        onClick={goToPrev}
      >
        &#10094;
      </button>
      <button 
        style={{ ...styles.sliderButton, ...styles.nextButton }} 
        onClick={goToNext}
      >
        &#10095;
      </button> */}
      
      {/* Dot indicators */}
      <div style={styles.sliderDots}>
        {slides.map((_, index) => (
          <span 
            key={index}
            style={index === currentSlide ? 
              { ...styles.dot, ...styles.activeDot } : styles.dot}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;