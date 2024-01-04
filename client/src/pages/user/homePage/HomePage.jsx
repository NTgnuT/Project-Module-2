import React from "react";
import Navbar from "../../../component/user/navbar/Navbar";
import BannerHome from "./BannerHome";
import Featured from "./Featured";
import Awesome from "./Awesome";
import Sale from "./Sale";
import Subscribe from "./Subscribe";
import Footer from "../../../component/user/footer/Footer";
import BackToTop from "../../../component/base/backtop/BackToTop";
import Sub from "../../../component/user/sub/Sub";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <BannerHome />
      <Featured />
      <Awesome />
      <Sale />
      <Subscribe />
      <BackToTop />
      <Sub />
      <Footer />
    </>
  );
}
