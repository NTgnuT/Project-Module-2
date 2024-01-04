import React from "react";
import { Carousel } from "antd";
import "./bannerHome.css";
import { Link } from "react-router-dom";

export default function BannerHome() {
  const contentStyle = {
    height: "calc(100vh)",
    color: "#fff",
    lineHeight: "100px",
    textAlign: "center",
    background: "#ecfdff",
  };
  return (
    <>
      <Carousel autoplay>
        <div>
          <div style={contentStyle}>
            <div className="single_banner_slider">
              <div className="row">
                <div className="banner_text_iner col-lg-5 col-md-8 banner_text ">
                  <h1>Wood & Cloth Sofa</h1>
                  <p>
                    Incididunt ut labore et dolore magna aliqua quis ipsum
                    suspendisse ultrices gravida. Risus commodo viverra
                  </p>
                  <Link to={"/list-product"} className="btn_2">
                    buy now
                  </Link>
                </div>
                <div className="banner_img d-none d-lg-block">
                  <img src="../../../../public/img/banner_img.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            <div className="single_banner_slider">
              <div className="row">
                <div className="banner_text_iner col-lg-5 col-md-8 banner_text ">
                  <h1>Wood & Cloth Sofa</h1>
                  <p>
                    Incididunt ut labore et dolore magna aliqua quis ipsum
                    suspendisse ultrices gravida. Risus commodo viverra
                  </p>
                  <Link to={"/list-product"} className="btn_2">
                    buy now
                  </Link>
                </div>
                <div className="banner_img d-none d-lg-block">
                  <img src="../../../../public/img/banner_img.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            <div className="single_banner_slider">
              <div className="row">
                <div className="banner_text_iner col-lg-5 col-md-8 banner_text ">
                  <h1>Wood & Cloth Sofa</h1>
                  <p>
                    Incididunt ut labore et dolore magna aliqua quis ipsum
                    suspendisse ultrices gravida. Risus commodo viverra
                  </p>
                  <Link to={"/list-product"} className="btn_2">
                    buy now
                  </Link>
                </div>
                <div className="banner_img d-none d-lg-block">
                  <img src="../../../../public/img/banner_img.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            <div className="single_banner_slider">
              <div className="row">
                <div className="banner_text_iner col-lg-5 col-md-8 banner_text ">
                  <h1>Wood & Cloth Sofa</h1>
                  <p>
                    Incididunt ut labore et dolore magna aliqua quis ipsum
                    suspendisse ultrices gravida. Risus commodo viverra
                  </p>
                  <Link to={"/list-product"} className="btn_2">
                    buy now
                  </Link>
                </div>
                <div className="banner_img d-none d-lg-block">
                  <img src="../../../../public/img/banner_img.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </>
  );
}
