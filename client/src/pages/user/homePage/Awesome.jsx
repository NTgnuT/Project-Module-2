import React, { useEffect } from "react";
import Slider from "react-slick";
import "./awesome.css";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../redux/slice/productSlice";
import { formatMoney } from "../../../utils/formatData";
import { Link } from "react-router-dom";

export default function Awesome() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);
  // console.log(products);

  useEffect(() => {
    dispatch(getProduct());
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <>
      <section className="product_list section_padding ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="section_tittle text-center">
                <h2>
                  awesome <span>shop</span>
                </h2>
              </div>
            </div>
          </div>
          <Slider {...settings}>
            {/* <div> */}
            {/* <h3> */}
            {products.map((pro, index) => (
              <div className="col-lg-3 col-sm-6 list-awesome" key={pro.id}>
                <div className="single_product_item">
                  <img src={pro.image} alt="" />
                  <div className="single_product_text">
                    <h4>{pro.product_name}</h4>
                    <h3>{formatMoney(+pro.price)}</h3>
                    <Link to={`/product/${pro.id}`} className="add_cart">
                      View detail
                      <i className="ti-heart" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* <div className="col-lg-3 col-sm-6">
                      <div className="single_product_item">
                        <img src="img/product/product_7.png" alt="" />
                        <div className="single_product_text">
                          <h4>Quartz Belt Watch</h4>
                          <h3>$150.00</h3>
                          <a href="#" className="add_cart">
                            + add to cart
                            <i className="ti-heart" />
                          </a>
                        </div>
                      </div>
                    </div> */}
        </div>
      </section>
    </>
  );
}
