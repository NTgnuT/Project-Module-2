import React, { useEffect, useState } from "react";
import Banner from "../../../component/user/banner/Banner";
import Rate from "./Rate";
import Footer from "../../../component/user/footer/Footer";
import BackToTop from "../../../component/base/backtop/BackToTop";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatMoney } from "../../../utils/formatData";
import Navbar from "./../../../component/user/navbar/Navbar";
import "./product.css";
import { ToastContainer, toast } from "react-toastify";
import instance from "../../../API/axios";
import { notification } from "antd";

export default function Product({ title }) {
  // Lấy param trên url
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [pro, setPros] = useState([]);
  const [carts, setCarts] = useState([]);

  // Nội dung của toast message
  const notify = () =>
    toast.success("Add product to cart successfully.", {
      position: "top-center",
    });

  // Gọi API lấy thông tin 1 sản phẩm theo ID
  const getProductById = () => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProductById();
  }, []);

  // Lấy thông tin tất cả sản phẩm trong database
  const getAllProduct = async () => {
    try {
      const respone = await instance.get("products");
      console.log(respone);
      setPros(respone.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  // Lấy thông tin tất cả cart trong database
  const getAllCart = async () => {
    try {
      const response = await instance.get("carts");
      setCarts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCart();
  }, []);

  const userLogin = JSON.parse(localStorage.getItem("userLogin"));

  // Xử lý chức năng thêm sản phẩm vào giỏ hàng
  const handleAddToCart = async (id) => {
    if (userLogin) {
      try {
        // Tìm giỏ hàng của người dùng, bạn cần thay đổi userId tương ứng với người dùng hiện tại
        const userLogin = JSON.parse(localStorage.getItem("userLogin"));

        const userCart = await carts.find(
          (cart) => cart.userId === userLogin.id
        ); // Tìm kiếm id của user trong giỏ hang

        if (userCart) {
          // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
          const existingProduct = userCart.cartDetails.find(
            (item) => item.productId === id
          );

          if (existingProduct) {
            // Nếu sản phẩm đã tồn tại, tăng số lượng
            existingProduct.quantity += 1;
          } else {
            // Nếu sản phẩm chưa tồn tại, thêm sản phẩm vào giỏ hàng
            userCart.cartDetails.push({
              productId: id,
              quantity: 1,
            });
          }

          // Cập nhật giỏ hàng trên server
          await instance.put(`carts/${userCart.id}`, userCart);
          notify();
        } else {
          // Nếu người dùng chưa có giỏ hàng, tạo giỏ hàng mới.
          const newCart = {
            userId: userLogin.id,
            cartDetails: [],
          };

          // Gửi yêu cầu POST để tạo giỏ hàng mới
          const response = await instance.post("carts", newCart);

          // Cập nhật danh sách giỏ hàng trên client
          setCarts([...carts, response.data]);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      notification.error({
        message: "Warning",
        description: "Please login to purchase",
      });
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Banner title={title} />
      <div className="product_image_area section_padding">
        <div className="container">
          <div className="row s_product_inner justify-content-between">
            <div className="col-lg-7 col-xl-7">
              <div className="product_slider_img">
                <div id="vertical">
                  <div data-thumb="img/product/single-product/product_1.png">
                    <img
                      src={product.image}
                      width={460}
                      height={460}
                      style={{ display: "block", margin: "0 auto" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-xl-4">
              <div className="s_product_text">
                <h3>{product.product_name}</h3>
                <h2>{product.price && formatMoney(+product.price)}</h2>
                <ul className="list">
                  <li>
                    <a className="active">
                      <span>From</span> : {product.from}
                    </a>
                  </li>
                  <li>
                    <a>
                      <span>Brand</span> : {product.brand}
                    </a>
                  </li>
                </ul>
                <p>
                  {/* {product.description} */}
                  {product.description && product.description.length > 200
                    ? `${product.description.substring(0, 200)} .....`
                    : product.description}
                </p>
                <div className="card_area d-flex justify-content-between align-items-center">
                  <a
                    className="btn_3"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    add to cart
                  </a>
                  <a className="like_us">
                    <i className="fa-solid fa-heart"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Rate />
      <BackToTop />
      <Footer />
    </>
  );
}
