import React, { useEffect, useState } from "react";
import Navbar from "../../../../component/user/navbar/Navbar";
import Banner from "../../../../component/user/banner/Banner";
import Footer from "../../../../component/user/footer/Footer";
import axios from "axios";
import "./listproduct.css";
import { formatMoney } from "../../../../../../../session 11/client/src/utils/formatData";
import BackToTop from "../../../../component/base/backtop/BackToTop";
import { Link } from "react-router-dom";
import Sub from "../../../../component/user/sub/Sub";
import instance from "../../../../API/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pagination, notification } from "antd";
import debounce from "lodash.debounce";

export default function ListProduct({ title }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [carts, setCarts] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Nội dung của toast message
  const notify1 = () =>
    toast.success("Đã thêm sản phẩm vào giỏ hàng.", {
      position: "top-center",
    });

  //goi API lay ra danh sach tat ca category
  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  }, []);

  //lay ra id cua category
  const getCategoryId = (id) => {
    setCategoryId(id);
  };

  console.log(getCategoryId);

  // Lấy thông tin tất cả sản phẩm trong database
  const getAllProduct = async () => {
    try {
      const response = await instance.get(
        `products?product_name_like=${searchText}`
      );
      // console.log(response);

      if (categoryId === 0) {
        setProducts(response.data);
      } else {
        const listProducts = response.data.filter(
          (p) => p.category_id === categoryId
        );
        setProducts(listProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const delaySearch = debounce(getAllProduct, 500);
    delaySearch();
    return () => {
      delaySearch.cancel();
    };
  }, [searchText]);

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

  useEffect(() => {
    getAllProduct();
  }, [categoryId]);

  // Xử lý chức năng thêm sản phẩm vào giỏ hàng
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));

  const handleAddToCart = async (id) => {
    if (userLogin) {
      try {
        // Tìm giỏ hàng của người dùng, bạn cần thay đổi userId tương ứng với người dùng hiện tại
        const userLogin = JSON.parse(localStorage.getItem("userLogin"));
        // const userLogin = 10;
        const userId = userLogin.id;

        const userCart = carts.find((cart) => cart.userId === userId); // Tìm kiếm id của user trong giỏ hang

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
          notify1();
        } else {
          // Nếu người dùng chưa có giỏ hàng, tạo giỏ hàng mới.
          const newCart = {
            userId: userId,
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

  //================PHÂN TRANG=============================================
  // State để theo dõi trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);

  // Hàm xử lý khi người dùng thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Tính toán index bắt đầu và index kết thúc cho sản phẩm hiển thị trên từng trang
  const itemsPerPage = 9; // Số sản phẩm trên mỗi trang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const renderProduct = products.slice(startIndex, endIndex);
  //========================================================================

  return (
    <>
      <Navbar />
      <Banner title={title} />
      <ToastContainer />
      <section className="cat_product_area section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="left_sidebar_area">
                <aside className="left_widgets p_filter_widgets">
                  <div className="l_w_title">
                    <h3>Browse Categories</h3>
                  </div>
                  <div className="widgets_inner">
                    <ul className="list">
                      <li
                        onClick={() => setCategoryId(0)}
                        className={`list-browse-category ${
                          categoryId === 0 && "active-category"
                        }`}
                      >
                        All Categories
                      </li>
                      {categories.map((cat) => (
                        <li
                          key={cat.id}
                          onClick={() => getCategoryId(cat.id)}
                          className={`list-browse-category ${
                            categoryId === cat.id && "active-category"
                          }`}
                        >
                          {cat.category_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="row">
                <div className="col-lg-12">
                  <div className="product_top_bar ">
                    <div className="single_product_menu d-flex">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="search"
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="inputGroupPrepend"
                          >
                            <i className="ti-search" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="col-lg-9"> */}
              <div className="row align-items-center latest_product_inner">
                {renderProduct.map((p) => (
                  <div key={p.id} className="col-lg-4 col-sm-6">
                    <div className="single_product_item">
                      <Link to={`/product/${p.id}`}>
                        <img src={p.image} alt="" />
                      </Link>
                      <div className="single_product_text">
                        <h4>{p.product_name}</h4>
                        <h3>{formatMoney(+p.price)}</h3>
                        <a
                          className="add_cart"
                          onClick={() => handleAddToCart(p.id)}
                        >
                          Add to cart
                          <i className="ti-heart" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="t-pagination">
                <Pagination
                  current={currentPage}
                  onChange={handlePageChange}
                  pageSize={itemsPerPage}
                  total={products.length} // Tổng số sản phẩm (số lượng items)
                  showSizeChanger={false} // Ẩn chức năng thay đổi số sản phẩm trên mỗi trang
                />
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </section>
      <BackToTop />
      <Sub />
      <Footer />
    </>
  );
}
