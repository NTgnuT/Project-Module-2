import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getInfoUserLogin,
  getUser,
  updateUser,
} from "../../../../redux/slice/userSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../firebase/firebaseConfig";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../../../utils/validateData";
import axios from "axios";

export default function Profile({ handleCloseProfile }) {
  const dispatch = useDispatch();
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  // console.log(userLogin);
  const users = useSelector((state) => state?.user?.data);
  const [user, setUser] = useState({
    user_name: "", // Khởi tạo giá trị mặc định là chuỗi rỗng
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  // Hàm validate dữ liệu nhập vào
  const validateData = (nameInput, valueInput) => {
    switch (nameInput) {
      case "user_name":
        if (!valueInput) {
          setNameError("Username is required");
        } else {
          setNameError("");
        }
        break;
      case "email":
        if (!valueInput) {
          setEmailError("Email is required");
        } else if (!validateEmail(valueInput)) {
          setEmailError("Incorrect email format.");
        } else {
          setEmailError("");
        }
        break;
      case "phoneNumber":
        if (!valueInput) {
          setPhoneNumberError("Phone Number is required");
        } else if (!validatePhoneNumber(valueInput)) {
          setPhoneNumberError("Incorrect phone number format.");
        } else {
          setPhoneNumberError("");
        }
        break;

      default:
        break;
    }
  };

  const [imageURL, setImageURL] = useState("");
  // console.log("imageURL", imageURL);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const findUser = users?.find((u) => u.id === userLogin.id);
  // console.log("findUser", findUser);

  useEffect(() => {
    if (findUser) {
      setUser(findUser);
      setImageURL(findUser?.avatar || "");
    }
  }, [findUser]); // lấy dữ liệu về liên tục

  //lay du lieu tu o input
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    validateData(name, value);

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateData("user_name", user.user_name);
    validateData("email", user.email);
    validateData("phoneNumber", user.phoneNumber);

    if (user.user_name && user.email && user.phoneNumber) {
      const newUser = {
        // ...users,
        user_name: user.user_name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        avatar: imageURL,
      };

      console.log(newUser);
      // gọi API
      axios
        .patch(`http://localhost:3000/users/${userLogin.id}`, newUser)
        .then((respone) => {
          if (respone.status === 200) {
            // Lưu dữ liệu lên local
            localStorage.setItem("userLogin", JSON.stringify(respone.data));
            dispatch(getInfoUserLogin(userLogin.id));
          }
        })
        .catch((error) => console.log(error));
    }
    handleCloseProfile();
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
        setImageURL(downloadURL);
        onSuccess({ url: downloadURL });
      } catch (error) {
        onError(error);
      }
    },
  };

  return (
    <>
      <div className="container-profile">
        <form className="form-profile" onSubmit={handleSubmit}>
          <div className="title-profile">
            <h3>
              <i className="fa-solid fa-user"></i>
              Profile
            </h3>
            <div className="btn btn-close" onClick={handleCloseProfile}></div>
          </div>

          <div className="info-profile">
            <div className="profile-avatar">
              {/* <label htmlFor="">Avartar</label> */}
              <div className="">
                <Upload {...props} className="avatar-user">
                  <img
                    src={imageURL}
                    alt=""
                    width={250}
                    height={250}
                    className="rounded-circle"
                  />
                  <Button icon={<UploadOutlined />}>Change Avatar</Button>
                </Upload>
              </div>
            </div>

            <div className="profile-info-user">
              <div className="form-group">
                <label htmlFor="user_name" className="form-label">
                  User Name:
                </label>
                <input
                  type="text"
                  id="user_name"
                  className="form-control"
                  name="user_name"
                  onChange={handleChangeInput}
                  value={user.user_name}
                />
                {nameError && <div className="err">{nameError}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="form-control"
                  onChange={handleChangeInput}
                  value={user.email}
                />
                {emailError && <div className="err">{emailError}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="form-control"
                  onChange={handleChangeInput}
                  value={user.phoneNumber}
                />
                {phoneNumberError && (
                  <div className="err">{phoneNumberError}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control"
                  onChange={handleChangeInput}
                  value={user.address}
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="newPassword" className="form-label">
                  New Password:
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="form-control"
                  onChange={handleChangeInput}
                />
                {newPasswordError && (
                  <div className="err">{newPasswordError}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="confirmNewPassword" className="form-label">
                  Confirm New Password:
                </label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  className="form-control"
                  onChange={handleChangeInput}
                />
                {confirmNewPasswordError && (
                  <div className="err">{confirmNewPasswordError}</div>
                )}
              </div> */}
            </div>
          </div>

          <div className="btn-confirm-profile">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleCloseProfile}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
