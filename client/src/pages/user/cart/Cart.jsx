import React, { useEffect, useState } from "react";
import Navbar from "../../../component/user/navbar/Navbar";
import Banner from "../../../component/user/banner/Banner";
import Footer from "../../../component/user/footer/Footer";
import BackToTop from "../../../component/base/backtop/BackToTop";

import { formatMoney } from "./../../../utils/formatData";
import "./cart.css";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import instance from "./../../../API/axios";
import { useDispatch, useSelector } from "react-redux";

export default function Cart({ title }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  const [note, setNote] = useState("");

  const userLogin = JSON.parse(localStorage.getItem("userLogin")) || [];
  const userLoginId = userLogin.id;

  // const product = useSelector((state) => state.product.data);
  // console.log(product);

  // useEffect(() => {
  //   dispatch(getProduct());
  // }, []);

  // Lấy thông tin tất cả giỏ hàng
  const getAllCart = async () => {
    try {
      // Lấy ra tất cả giỏ hàng trong db
      const response = await instance.get("carts");
      // Tìm kiếm giỏ hàng của user đang đăng nhập
      const cartUser = await response.data.find(
        (cart) => cart.userId === userLoginId
      );

      if (cartUser) {
        const updatedCarts = await Promise.all(
          cartUser.cartDetails.map(async (cartItem) => {
            // Lấy thông tin sản phẩm dựa trên productId
            const product = await instance.get(
              `products/${cartItem.productId}`
            );
            const datas = product.data;
            return { ...cartItem, datas };
          })
        );

        setCarts(updatedCarts);
      }
      // else {
      //   notification.error({
      //     message: "Warning",
      //     description: "Please log in to view cart!!",
      //   });
      //   navigate("/login");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCart();
  }, []);

  // Xóa sản phẩm khỏi giỏ hàng
  const handleDeleteCart = async (id) => {
    try {
      // Lấy ra tất cả giỏ hàng trong db
      const response = await instance.get("carts");

      const userCart = response.data.find(
        (user) => user.userId === userLoginId
      );
      if (userCart) {
        // Tìm kiếm giỏ hàng của user đang đăng nhập
        const cartIndex = userCart.cartDetails.filter(
          (cart) => cart.productId !== id
        );
        // Cập nhật giỏ hàng của người dùng với danh sách sản phẩm đã lọc
        userCart.cartDetails = cartIndex;

        // Cập nhật giỏ hàng trên server
        await instance.put(`carts/${userCart.id}`, userCart);

        // Cập nhật lại state với danh sách sản phẩm sau khi xóa
        getAllCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   handleDeleteCart();
  // }, []);

  // Hàm xử lý tăng
  const handleUp = async (id) => {
    try {
      // Lấy ra tất cả giỏ hàng trong db
      const response = await instance.get("carts");

      const userCart = response.data.find(
        (user) => user.userId === userLoginId
      );
      if (userCart) {
        // Tìm kiếm giỏ hàng của user đang đăng nhập
        const cartIndex = userCart.cartDetails.findIndex(
          (cart) => cart.productId === id
        );
        if (cartIndex !== -1) {
          // Tăng số lượng sản phẩm trong giỏ hàng
          userCart.cartDetails[cartIndex].quantity += 1;

          // Cập nhật giỏ hàng trên server
          await instance.put(`carts/${userCart.id}`, userCart);

          getAllCart(); // Load lại dữ liệu
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm xử lý giảm
  const handleDown = async (id) => {
    try {
      // Lấy ra tất cả giỏ hàng trong db
      const response = await instance.get("carts");

      const userCart = response.data.find(
        (user) => user.userId === userLoginId
      );
      if (userCart) {
        // Tìm kiếm giỏ hàng của user đang đăng nhập
        const cartIndex = userCart.cartDetails.findIndex(
          (cart) => cart.productId === id
        );
        if (cartIndex !== -1) {
          if (userCart.cartDetails[cartIndex].quantity > 1) {
            // Giảm số lượng sản phẩm trong giỏ hàng
            userCart.cartDetails[cartIndex].quantity -= 1;

            // Cập nhật giỏ hàng trên server
            await instance.put(`carts/${userCart.id}`, userCart);

            getAllCart(); // Load lại dữ liệu
          } else {
            handleDeleteCart(id);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Tính tổng số tiền
  const totalAmount = () => {
    return carts.reduce((prev, curent) => {
      return prev + curent.datas.price * curent.quantity;
    }, 0);
  };

  const handleCheckOut = async () => {
    try {
      // lấy ngày tháng năm đặt hàng
      // const currentDate = new Date();
      // const orderDate = currentDate.toLocaleDateString();

      // lấy giá tị ô note
      const noteInput = document.getElementById("note");
      const orderNote = noteInput.value.trim();

      // Kiểm tra note không được để trống
      if (orderNote === "") {
        notification.warning({
          message: "warning",
          description: "note is the required",
        });
        return;
      }

      // gửi dữ liệu lên API
      const payload = {
        total: totalAmount(),
        note: note,
        date: new Date().toLocaleString(),
        startus: 0,
        carts: carts,
        idUser: userLogin.id,
      };

      // Gửi yêu cầu tạo đơn hàng
      await instance.post("order", payload);

      // Tìm kiếm giỏ hàng của user đang đăng nhập
      const response = await instance.get(`carts`);

      const cartUser = response.data.find(
        (cart) => cart.userId === userLoginId
      );

      console.log(cartUser);

      if (cartUser && cartUser.cartDetails.length > 0) {
        //sau khi click dat hang thi phai set cart cua userLogin tren DB
        await instance.patch(`carts/${cartUser.id}`, { cartDetails: [] });

        setCarts([]);
        setNote("");
        notification.success({
          message: "Success",
          description: "Order is done!!",
        });
        navigate("/");
      } else {
        notification.warning({
          message: "Warning",
          description: "You don't have product in cart",
        });

        navigate("/list-product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <Banner title={title} />
      <section className="cart_area padding_top">
        <div className="container">
          <div className="cart_inner">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.length !== 0 ? (
                    carts.map((c, index) => (
                      <tr key={index}>
                        <td>
                          <div className="media">
                            <div className="d-flex">
                              <img
                                src={c.datas.image}
                                width={140}
                                height={140}
                                alt=""
                              />
                            </div>
                            <div className="media-body">
                              <p>{c.datas.product_name}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <h5>{formatMoney(+c.datas.price)}</h5>
                        </td>
                        <td>
                          <div className="product_count">
                            <button
                              className="btn-change-quantity"
                              onClick={() => handleDown(c.datas.id)}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                            <div className="quantity-number">
                              <span>{c.quantity}</span>
                            </div>

                            <button
                              className="btn-change-quantity"
                              onClick={() => handleUp(c.datas.id)}
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </td>
                        <td>
                          <h5>{formatMoney(c.datas.price * c.quantity)}</h5>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteCart(c.datas.id)}
                          >
                            <i className="fa-solid fa-trash mr-1"></i>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <>
                      <tr>
                        <td colSpan={5}>
                          You don't have products in your cart{" "}
                        </td>
                      </tr>
                    </>
                  )}
                  <tr>
                    <td>
                      <textarea
                        name=""
                        id="note"
                        cols="60"
                        rows="4"
                        onChange={(e) => setNote(e.target.value)}
                        value={note}
                        placeholder="Note (address, phone number, ... )"
                      >
                        Note:
                      </textarea>
                    </td>
                    <td />
                    <td>
                      <h5>Subtotal :</h5>
                    </td>
                    <td>
                      <h5>{formatMoney(totalAmount())}</h5>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="checkout_btn_inner float-right">
                <Link className="btn_1" to={"/list-product"}>
                  Continue Shopping
                </Link>
                <button
                  className="btn_1 checkout_btn_1"
                  href="#"
                  onClick={handleCheckOut}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BackToTop />
      <Footer />
    </>
  );
}
