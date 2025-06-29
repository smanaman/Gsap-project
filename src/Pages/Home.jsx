import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
import './Home.css'
import Slider from "../Component/Slider"
import { Link } from "react-router-dom"
import Navbar from "../Component/Navbar"

const Home = () => {
  useGSAP(() => {
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
        // markers: true
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
        // markers: true,
        scrub: 1,
      }
    })

    gsap.from('.HeadPhone-side', {
      opacity: 0,
      duration: 2,
      ease: 'power1.inOut',
      scale: 0.5,
      scrollTrigger: {
        trigger: '.HeadPhone-side',
        // markers:true,
        start: 'top 70%',
        end: 'bottom 40%',
        scrub: 1
      }
    })
    gsap.from('.HeadPhone-side-down', {
      opacity: 0,
      duration: 2,
      ease: 'power1.inOut',
      scale: 0.5,
      scrollTrigger: {
        trigger: '.HeadPhone-side-down',
        // markers:true,
        start: 'top 100%',
        end: 'bottom 40%',
        scrub: 1
      }
    })
    gsap.from('.HeadPhone-center', {
      opacity: 0,
      duration: 2,
      ease: 'power1.inOut',
      scale: 2,
      scrollTrigger: {
        trigger: '.HeadPhone-center',
        // markers:true,
        start: 'top 100%',
        end: 'bottom 40%',
        scrub: 1
      }
    })

    gsap.from('.buysection-img', {
      x: -300,
      opacity: 0,
      duration: 2,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.buysection-heading h2',
        start: 'top 30%',
        end: 'bottom 40%',
        scrub: 1,
        // markers:true
      }
    })
    gsap.from('.buysection-img-center', {
      x: 300,
      opacity: 0,
      duration: 2,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.buysection-heading h2',
        start: 'top 0%',
        end: 'bottom 40%',
        scrub: 1,
        // markers:true
      }
    })
    gsap.from('.buysection-img2', {
      x: -300,
      opacity: 0,
      duration: 2,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.buysection-heading h2',
        start: 'top -30%',
        end: 'bottom 40%',
        scrub: 1,
        // markers:true
      }
    })
  })
  return (
    <div>
    <Navbar/>
      <div>
        <div id="body-container">
          <div id="updiv">
            <p>HEAD</p>
          </div>
          <div id="imgbox">
            <img src="./still-life-wireless-cyberpunk-headphones (1).png" alt="Headphones" />
          </div>
          <div id="downdiv">
            <p>PHONE</p>
          </div>
          <div id="right" />
          <div id="left" />
        </div>
        <div id="HadphoneAboutDiv" className="mt-5">
          <div className="container ">
            <div className="row">
              <div className="col-md-6 rowheight  ">
                <div className="lamp" />
                <div className="lap-light" />
                <div className="HadphoneAboutDivImg">
                  <img src="./erasebg-transformed.png" alt />
                </div>
              </div>
              <div className="col-md-6  rowheight d-flex align-items-center justify-content-center ">
                <div className="HadphoneAboutDivtext">
                  <h2>About our product</h2>
                  <h1>Feel the Beat</h1>
                  <p>
                    Experience the ultimate in sound quality and comfort with our wireless headphones. Designed for
                    audiophiles and casual listeners alike, these headphones deliver crystal-clear audio with deep bass and
                    crisp highs. The ergonomic design ensures a perfect fit for long listening sessions, while the sleek,
                    modern look makes them a stylish accessory for any outfit. Whether you're at home, commuting, or working
                    out, our headphones provide an immersive sound experience that keeps you connected to your music like
                    never before.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid  mt-5 gradient m-0 p-0">
          <div className="Headingtext">
            <h2>WHY CHOOSE HARMONY HUB ?</h2>
          </div>
          <div className="container">
            <div className="row  m-0 p-0 mt-5">
              <div className="col-4  m-0 p-0 d-flex align-items-center justify-content-center">
                <div className="HeadPhone-side ">
                  <div className="icon-review"><i class="fa-regular fa-thumbs-up"></i></div>
                  <div className="HeadPhone-text">Comfortable Design:soft cushions and<br /> adjustable fit for all-day comfort</div>
                </div>

              </div>
              <div className="col-4   HeadPhone-center"><img src="./erasebg-transformed (1).png" alt="" srcset="" /></div>
              <div className="col-4   m-0 p-0 d-flex align-items-center justify-content-center">
                <div className="HeadPhone-side">
                  <div className="icon-review"><i class="fa-solid fa-headphones"></i></div>
                  <div className="HeadPhone-text">Superior Sound Quality: High-fidelity audio <br />with deep bass and clear highs</div>
                </div>
              </div>
              <div className="col-12 ">
                <div className="HeadPhone-side-down">
                  <div className="icon-review-down"><i class="fa-solid fa-battery-full"></i></div>
                  <div className="HeadPhone-text">Superior Sound Quality: High-fidelity audio <br />with deep bass and clear highs</div>
                </div>
              </div>


            </div>

          </div>

        </div>
      </div>

      <div className="slide">
        <Slider />

      </div>

      <div className="container-fluid buysection ">
        <div className="buysection-heading">
          <h2>Shop Our Latest Collections</h2>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row g-4">
          {/* Top Row - Two Cards */}
          <div className="col-md-6">
            <div className="buysection-card">
              <div className="buysection-img" style={{ backgroundImage: "url(https://st2.depositphotos.com/6057682/10961/i/450/depositphotos_109618258-stock-photo-black-headphone-with-hat-on.jpg)" }}>
                <div className="buysection-overlay">
                  <h3>Summer Collection</h3>
                  <button className="btn btn-outline-light mt-3">Shop Now</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="buysection-card">
              <div className="buysection-img" style={{ backgroundImage: "url(../../public/banner-3.jpg)" }}>
                <div className="buysection-overlay">
                  <h3>Winter Essentials</h3>
                  <button className="btn btn-outline-light mt-3">Explore</button>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row - Full Width Card */}
          <div className="col-12">
            <div className="buysection-card">
              <div className="buysection-img-center" style={{ backgroundImage: "url(https://i.pcmag.com/imagery/articles/00ijMqYS2fuQodplAoPHRTY-1..v1720718233.jpg)" }}>
                <div className="buysection-overlay">
                  <h2 className="display-5">Limited Time Offer</h2>
                  <p className="lead">Up to 50% Off Selected Items</p>
                <Link to='/shop'><button className="btn btn-danger mt-3 px-4 py-2">Get Deal</button></Link>  
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - Two Cards */}
          <div className="col-md-6">
            <div className="buysection-card">
              <div className="buysection-img2" style={{ backgroundImage: "url(../../public/banner-2.jpg)" }}>
                <div className="buysection-overlay">
                  <h3>New Arrivals</h3>
                  <button className="btn btn-outline-light mt-3">View All</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="buysection-card">
              <div className="buysection-img2" style={{ backgroundImage: "url(https://c4.wallpaperflare.com/wallpaper/297/136/13/music-headphones-brunette-closed-eyes-wallpaper-preview.jpg)" }}>
                <div className="buysection-overlay">
                  <h3>Accessories</h3>
                  <button className="btn btn-outline-light mt-3">Browse</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      
    </div>




      
  )
}

export default Home