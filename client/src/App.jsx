import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/user/homePage/HomePage";
import About from "./pages/user/about/About";
import Blog from "./pages/user/blog/Blog";
import Contact from "./pages/user/contact/Contact";
import Cart from "./pages/user/cart/Cart";
import Login from "./pages/user/login/Login";
import Register from "./pages/user/register/Register";
import { useEffect } from "react";
import PrivateRouter from "./pages/admin/PrivateRouter";
import HomeAdmin from "./pages/admin/homeAdmin/HomeAdmin";
import ManagerCategory from "./pages/admin/managerCategory/ManagerCategory";
import ManagerUser from "./pages/admin/managerUser/ManagerUser";
import ManagerOrder from "./pages/admin/managerOrder/ManagerOrder";
import ManagerProduct from "./pages/admin/managerProduct/ManagerProduct";
import Product from "./pages/user/product/Product";
import History from "./pages/user/history/History";
import NotFound from "./component/base/404/NotFound";
import ListProduct from "./pages/user/login/listProduct/ListProduct";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  return (
    <>
      <Routes>
        {/* Trang người dùng */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/list-product"
          element={<ListProduct title="Category" />}
        />
        <Route path="/about" element={<About title="About" />} />
        <Route path="/blog" element={<Blog title="Blog" />} />
        <Route path="/contact" element={<Contact title="Contact" />} />
        <Route path="/cart" element={<Cart title="Cart" />} />
        <Route path="/login" element={<Login title="Login" />} />
        <Route path="/register" element={<Register title="Register" />} />
        <Route path="/product/:id" element={<Product title="Product" />} />
        <Route path="/history" element={<History title="History" />} />
        <Route path="*" element={<NotFound />} />

        {/* Trang admin */}
        <Route path="/admin" element={<PrivateRouter />}>
          <Route index element={<HomeAdmin />} />
          <Route path="manager-category" element={<ManagerCategory />} />
          <Route path="manager-product" element={<ManagerProduct />} />
          <Route path="manager-user" element={<ManagerUser />} />
          <Route path="manager-order" element={<ManagerOrder />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
