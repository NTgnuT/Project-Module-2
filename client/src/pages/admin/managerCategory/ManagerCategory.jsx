import React, { useEffect, useRef, useState } from "react";
import "../manager.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  getCategory,
  updateCatagory,
} from "../../../redux/slice/categorySlice";
import { Button, Form, Input, Modal, Pagination } from "antd";
import debounce from "lodash.debounce";

export default function ManagerCaegory() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.data);
  const isLoadingChange = useSelector(
    (state) => state.category.isLoadingChange
  );

  // search
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const delaySearch = debounce(() => dispatch(getCategory(searchText)), 500); // Đặt độ trễ cho hàm search tính từ khi bỏ tay khởi bàn phím
    delaySearch();

    return () => {
      delaySearch.cancel();
    }; // Hủy debounce khi không thực hiện chức năng search
  }, [searchText]);

  //ham goi API lay tat ca du lieu
  useEffect(() => {
    dispatch(getCategory());
  }, [isLoadingChange]);

  // delete
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const handleShowModalDelete = (id) => {
    setIdDelete(id);
    setIsModalOpenDelete(true);
  };
  const handleOkDelete = () => {
    dispatch(deleteCategory(idDelete));
    setIdDelete();
    setIsModalOpenDelete(false);
  };
  const handleCancelDelete = () => {
    setIdDelete();
    setIsModalOpenDelete(false);
  };

  // add + update
  const [formRef] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryUpdate, setCatagoryUpdate] = useState({});

  const handleShowModal = (cate) => {
    // console.log("==> cate", cate);
    setCatagoryUpdate(cate);
    formRef.setFieldsValue(cate);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setCatagoryUpdate();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setCatagoryUpdate();
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    if (categoryUpdate && categoryUpdate.id) {
      dispatch(
        updateCatagory({
          ...values,
          id: categoryUpdate.id,
        })
      );
      formRef.resetFields();
      handleCancel();
      return;
    }

    dispatch(addCategory(values));
    formRef.resetFields();
    handleCancel();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // useEffect(() => {
  //   dispatch(getCategory());
  // }, [isLoadingChange]);

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
  const renderCategory = categories.slice(startIndex, endIndex);
  //========================================================================

  return (
    <>
      <Modal
        title="Delete Category"
        open={isModalOpenDelete}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure ?</p>
      </Modal>

      <Modal
        title="Delete Category"
        maskClosable={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={<></>}
      >
        <Form
          name="basic"
          form={formRef}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Category Name"
            name="category_name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div className="cat-header">
        <h3 className="cat-title">Manager Category</h3>
        <div className="cat-search">
          <input
            type="text"
            className="input-search"
            placeholder="Search ..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass fs-4"></i>
        </div>
        <div className="cat-add">
          <button className="btn btn-success" onClick={() => handleShowModal()}>
            <i className="fa-solid fa-plus mr-2"></i>
            Add Category
          </button>
        </div>
      </div>
      <div className="admin-table">
        <table className="table table-striped table-hover">
          <thead className="table-info">
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Name</th>
              <th scope="col">Category ID</th>
              <th scope="col">Description</th>
              <th scope="col" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody className="body-table">
            {renderCategory.map((cat, index) => (
              <tr key={cat.id}>
                <td>{index + 1}</td>
                <td>{cat.category_name}</td>
                <td>{cat.id}</td>
                <td>
                  {cat.description.length > 50
                    ? `${cat.description.substring(0, 50)} .....`
                    : cat.description}
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleShowModal(cat)}
                  >
                    <i className="fa-solid fa-pen-to-square mr-2"></i>
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleShowModalDelete(cat.id)}
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
          total={categories.length} // Tổng số sản phẩm (số lượng items)
          showSizeChanger={false} // Ẩn chức năng thay đổi số sản phẩm trên mỗi trang
        />
      </div>
    </>
  );
}
