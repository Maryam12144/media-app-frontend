import React from "react";
import Navbar from "../Navbar";
import { Carousel, Button } from "antd";
import { Link } from "react-router-dom";

const contentStyle = {
  marginTop: "0px",
};
const marginTop = {
  marginTop: "-70px",
};
const marginTop3rd = {
  marginTop: "-140px",
  textShadow: "-1px 0px 12px rgb(0 0 0)",
};
function Welcome() {
  return (
    <div className="main-wrapper">
      <div className="wrap">
        <Navbar />
        <div className="slider">
          <Carousel autoplay>
            <div className="slide">
              <img src="../images/slide1.png" />
              <div className="sliderText" style={contentStyle}>
                <h3>
                  World's Largest <br /> Media Network
                </h3>
                <p>
                  Unbiased News, Views, <br /> Entertainment & <br />{" "}
                  Informations Content
                </p>
              </div>
            </div>
            <div className="slide">
              <img src="../images/slide2.png" />
              <div className="sliderText">
                <h3 style={marginTop3rd}>
                  Providing truth to <br /> the world without <br /> any bias,
                  Promoting <br />
                  friendship & <br />
                  harmony amongst <br />
                  the nations{" "}
                </h3>
              </div>
            </div>
            <div className="slide">
              <img src="../images/slide3.png" />
              <div className="sliderText" style={marginTop}>
                <h3>
                  100 Channels <br /> Reaching out to <br />
                  160 Countries <br />
                  Worldwide
                </h3>
              </div>
            </div>
          </Carousel>
        </div>
        <div className=" text-center">
          <Link to="/Login">
            <Button type="danger" className="dangerBtn">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
