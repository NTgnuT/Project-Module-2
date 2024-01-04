import React, { useEffect, useState } from "react";
import "../manager.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../../../redux/slice/productSlice";
import { formatMoney } from "./../../../utils/formatData";
import { Image, Modal, Button, Form, Input, Pagination } from "antd";
import ModalAddP from "./ModalAddP";
import ModalEditP from "./ModalEditP";
import debounce from "lodash.debounce";

export default function ManagerProduct() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);
  const isLoadingChange = useSelector((state) => state.product.isLoadingChange);
  const [idEdit, setIdEdit] = useState();

  // search
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const delaySearch = debounce(() => dispatch(getProduct(searchText)), 500); // Đặt độ trễ cho hàm search tính từ khi bỏ tay khởi bàn phím
    delaySearch();

    return () => {
      delaySearch.cancel();
    }; // Hủy debounce khi không thực hiện chức năng search
  }, [searchText]);

  //ham goi API lay tat ca du lieu
  useEffect(() => {
    dispatch(getProduct());
  }, [isLoadingChange]);

  // delete
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const handleShowModalDelete = (id) => {
    setIdDelete(id);
    setIsModalOpenDelete(true);
  };
  const handleOkDelete = () => {
    dispatch(deleteProduct(idDelete));
    setIdDelete();
    setIsModalOpenDelete(false);
  };
  const handleCancelDelete = () => {
    setIdDelete();
    setIsModalOpenDelete(false);
  };

  // add
  const [showAdd, setShowAdd] = useState(false);

  // Hàm hiện form thêm sản phẩm
  const handleShowAdd = () => {
    setShowAdd(true);
  };

  // Hàm đóng form thêm sản phẩm
  const handleCloseAdd = () => {
    setShowAdd(false);
  };

  // edit
  const [showEdit, setShowEdit] = useState(false);

  // hàm hiện form sửa sản phẩm
  const handleShowEdit = (id) => {
    setIdEdit(id);
    setShowEdit(true);
  };

  // hàm ẩn form sửa sản phẩm
  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  useEffect(() => {
    dispatch(getProduct());
  }, [isLoadingChange]);

  //================PHÂN TRANG=============================================
  // State để theo dõi trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);

  // Hàm xử lý khi người dùng thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Tính toán index bắt đầu và index kết thúc cho sản phẩm hiển thị trên từng trang
  const itemsPerPage = 6; // Số sản phẩm trên mỗi trang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const renderProduct = products.slice(startIndex, endIndex);
  //========================================================================

  return (
    <>
      <Modal
        title="Delete Product"
        open={isModalOpenDelete}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure delete this product?</p>
      </Modal>

      {showAdd && <ModalAddP handleCloseAdd={handleCloseAdd} />}

      {showEdit && (
        <ModalEditP handleCloseEdit={handleCloseEdit} idEdit={idEdit} />
      )}

      <div className="cat-header">
        <h3 className="cat-title">Manager Product</h3>
        <div className="cat-search">
          <input
            type="text"
            className="input-search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass fs-4"></i>
        </div>
        <div className="cat-add">
          <button className="btn btn-success" onClick={() => handleShowAdd()}>
            <i className="fa-solid fa-plus mr-2"></i>
            Add Product
          </button>
        </div>
      </div>
      <div className="admin-table">
        <table className="table table-striped table-hover">
          <thead className="table-info">
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Brand</th>
              <th scope="col">From</th>
              <th scope="col">Quantity</th>
              <th scope="col">Category ID</th>
              <th scope="col">Description</th>
              <th scope="col" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody className="body-table">
            {renderProduct.map((pro, index) => (
              <tr key={pro.id}>
                <td>{index + 1}</td>
                <td>
                  <Image src={pro.image} alt="" width={50} height={50} />
                </td>
                <td>{pro.product_name}</td>
                <td>{formatMoney(+pro.price)}</td>
                <td>{pro.brand}</td>
                <td>{pro.from}</td>
                <td>{pro.quantity}</td>
                <td>{pro.category_id}</td>
                <td>
                  {pro.description.length > 30
                    ? `${pro.description.substring(0, 30)} .....`
                    : pro.description}
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleShowEdit(pro.id)}
                  >
                    <i className="fa-solid fa-pen-to-square mr-2"></i>
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleShowModalDelete(pro.id)}
                  >
                    <i className="fa-solid fa-trash mr-2"></i>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="tung-pagination">
        <Pagination
          current={currentPage}
          onChange={handlePageChange}
          pageSize={itemsPerPage}
          total={products.length} // Tổng số sản phẩm (số lượng items)
          showSizeChanger={false} // Ẩn chức năng thay đổi số sản phẩm trên mỗi trang
        />
      </div>
    </>
  );
}
