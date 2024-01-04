import React from "react";
import Navbar from "../../../component/user/navbar/Navbar";
import Banner from "../../../component/user/banner/Banner";
import Blog from "./Blog";
import Table from "./Table";
import Galleyry from "./Galleyry";
import Footer from "../../../component/user/footer/Footer";
import BackToTop from "../../../component/base/backtop/BackToTop";
import Sub from "../../../component/user/sub/Sub";

export default function About({ title }) {
  return (
    <>
      <Navbar />
      <Banner title={title} />
      <div className="whole-wrap">
        <div className="container box_1170">
          <Blog />
          <Table />
          <Galleyry />
        </div>
      </div>
      <BackToTop />
      <Sub />
      <Footer />
    </>
  );
}
