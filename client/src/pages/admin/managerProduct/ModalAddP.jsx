import React, { useEffect, useState } from "react";
import "./modalProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Button, Select, Space, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { storage } from "../../../firebase/firebaseConfig";
import { addProduct, getProduct } from "./../../../redux/slice/productSlice";
import { getCategory } from "../../../redux/slice/categorySlice";

export default function ModalAddP({ handleCloseAdd }) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const categories = useSelector((state) => state.category.data);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  //lay du lieu tu o input
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const [imageURL, setImageURL] = useState(null);
  // console.log("imageURL", imageURL);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct({ ...product, image: imageURL }));
    handleCloseAdd();
  };

  //up anh len firebase================================================
  // Tạo một them chiếu đến thư mục chưa kho ảnh trên firebase
  const imageListRef = ref(storage, "products/");

  // Props của Upload
  const props = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        // Lấy đường dẫn của ảnh sau khi hoàn tất quá trình tải
        const downloadURL = info.file.response.url;
        // Lưu đường dẫn vào trong một state
        setImageURL(downloadURL);
        // Hiển
        // message.success("Tải lên hình ảnh thành công.");
      } else if (info.file.status === "error") {
        message.error("Tải lên hình ảnh thất bại.");
      }
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        // Tạo một tham chiếu đến kho ảnh trên firebase
        const imageRef = ref(imageListRef, file.name);

        // Tải ảnh lên firebase
        await uploadBytes(imageRef, file);

        // Lấy url từ firebase về sau khi upload thành công
        const downloadURL = await getDownloadURL(imageRef);

        onSuccess({ url: downloadURL });
      } catch (error) {
        onError(error);
      }
    },
  };

  const handleChange = (value) => {
    setProduct({ ...product, category_id: value });
    // console.log(value);
  };

  return (
    <>
      <div className="form-container-admin-crud">
        <form className="p-4" onSubmit={handleSubmit}>
          <h3>Add Product</h3>
          <div className="d-flex justify-content-between align-items-center">
            <label htmlFor="image">Image: </label>
            {/* <input type="file" name="image" id="image" onChange={handleChangeInput} /> */}
            <div className="text-start mt-2">
              <Upload
                {...props}
                className="d-flex gap-1 justify-content-center"
              >
                <img
                  src={imageURL}
                  alt=""
                  width={60}
                  height={60}
                  className="rounded-circle mr-4"
                />
                <Button icon={<UploadOutlined />}>Upload image</Button>
              </Upload>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <label htmlFor="product_name">Product Name:</label>
            <input
              type="text"
              name="product_name"
              id="product_name"
              onChange={handleChangeInput}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              name="price"
              id="price"
              onChange={handleChangeInput}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <label htmlFor="price">Quantity:</label>
            <input
              type="text"
              name="quantity"
              id="quantity"
              onChange={handleChangeInput}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              name="brand"
              id="brand"
              onChange={handleChangeInput}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <label htmlFor="from">From:</label>
            <input
              type="text"
              name="from"
              id="from"
              onChange={handleChangeInput}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <label htmlFor="category_id">Category ID:</label>
            <Space wrap>
              <Select
                value={product.category_id}
                style={{ width: 120 }}
                onChange={handleChange}
                options={categories.map((cat) => ({
                  value: cat.id,
                  label: cat.category_name,
                }))}
              />
            </Space>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <label htmlFor="description">Description:</label>
            <textarea
              type="text"
              name="description"
              id="description"
              onChange={handleChangeInput}
            />
          </div>

          <div className="d-flex justify-content-end gap-2 mt-2">
            <button
              onClick={handleCloseAdd}
              className="btn-form-admin bg-secondary"
            >
              <i className="fa-solid fa-xmark"></i> Close
            </button>
            <button className="btn-form-admin btn-add-product">
              <i className="fa-solid fa-plus"></i> Add New Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
