import React, { useState } from "react";
import Navbar from "../../../component/user/navbar/Navbar";
import Banner from "../../../component/user/banner/Banner";
import Footer from "../../../component/user/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Button, notification } from "antd";
import "./register.css";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../../utils/validateData";
import axios from "axios";

export default function Register({ title }) {
  const [isDisable, setIsDisable] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const [user, setUser] = useState({
    user_name: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: 1,
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/module2-project-82198.appspot.com/o/products%2Favatar.jpg?alt=media&token=84d0b10c-c0e9-48f2-bd9e-1029b71fb73b",
  });

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
      case "password":
        if (!valueInput) {
          setPasswordError("Password is required");
        } else if (!validatePassword(valueInput)) {
          setPasswordError("Incorrect password format.");
        } else {
          setPasswordError("");
        }
        break;
      case "confirmPassword":
        if (!valueInput) {
          setConfirmPasswordError("Password is required");
          return;
        } else if (user.password !== valueInput) {
          setConfirmPasswordError("Confirm password do not match");
          return;
        } else {
          setConfirmPasswordError("");
        }
        break;

      default:
        break;
    }
  };

  // Xử lý sự kiện checked trong ô checkbox
  const handleChecked = (e) => {
    setIsDisable(e.target.checked);
  };

  // Hàm lấy dữ liệu trong ô input
  const handleInputChange = (e) => {
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
    validateData("password", user.password);
    validateData("confirmPassword", user.confirmPassword);
    if (
      user.user_name &&
      user.email &&
      user.password &&
      user.confirmPassword &&
      user.phoneNumber
    ) {
      const newUser = {
        user_name: user.user_name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        password: user.password,
        role: 1,
        active: true,
        avatar: user.avatar,
      };
      // goi API dang ky
      axios
        .post("http://localhost:3000/users", newUser)
        .then((response) => {
          if (response.status === 201) {
            // localStorage.setItem("userRegister", JSON.stringify(newUser));

            // thong bao dang ky thanh cong
            notification.success({
              message: "Success",
              description: "Successful account registration!",
            });

            // chuyen trang dang nhap
            navigate("/login");
          }
        })
        .catch((error) => {
          if (error.response.data === "Email already exists") {
            notification.error({
              message: "Warning",
              description: "Email already exists!",
            });
          } else {
            notification.error({
              message: "Warning",
              description: "System Error: Please contact admin!",
            });
          }
        });
    }
  };

  return (
    <>
      <Navbar />
      {/* <Banner title={title} /> */}
      <div className="col-lg-6 col-md-6 container-register">
        <div className="login_part_form">
          <div className="login_part_form_iner">
            <h3>
              Welcome ! <br />
              Please Register here.
            </h3>
            <form className="row contact_form">
              <div className="register-info">
                <div className="register-left">
                  {/* User name */}
                  <div className="col-md-12 form-group p_star">
                    <label htmlFor="">
                      <i className="fa-solid fa-user"></i> UserName:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="user_name"
                      placeholder="Username"
                      onChange={handleInputChange}
                    />
                    {nameError && <div className="err">{nameError}</div>}
                  </div>

                  {/* Email */}
                  <div className="col-md-12 form-group p_star">
                    <label htmlFor="email">
                      <i className="fa-solid fa-envelope"></i> Email:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                      onChange={handleInputChange}
                    />
                    {emailError && <div className="err">{emailError}</div>}
                  </div>

                  {/* Phone number */}
                  <div className="col-md-12 form-group p_star">
                    <label htmlFor="phoneNumber">
                      <i className="fa-solid fa-phone"></i> Phone number:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="PhoneNumber"
                      onChange={handleInputChange}
                    />
                    {phoneNumberError && (
                      <div className="err">{phoneNumberError}</div>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="register-right">
                  <div className="col-md-12 form-group p_star">
                    <label htmlFor="address">
                      <i className="fa-solid fa-location-dot"></i> Address:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      placeholder="Address"
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Password */}
                  <div className="col-md-12 form-group p_star">
                    <label htmlFor="password">
                      <i className="fa-solid fa-lock"></i> Password:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleInputChange}
                    />
                    {passwordError && (
                      <div className="err">{passwordError}</div>
                    )}
                  </div>

                  {/* Confirm password */}
                  <div className="col-md-12 form-group p_star">
                    <label htmlFor="confirmPassword">
                      <i className="fa-solid fa-lock"></i> Confirm password:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={handleInputChange}
                    />
                    {confirmPasswordError && (
                      <div className="err">{confirmPasswordError}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-check form-check-inline mt-3 ">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="option1"
                  onChange={handleChecked}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox1">
                  Bạn có đồng ý với <a href="#">điều khoản</a> của chúng tôi?
                </label>
              </div>

              <div className="col-md-12 form-group d-flex justify-center">
                <Button
                  onClick={handleSubmit}
                  // type="submit"
                  disabled={!isDisable}
                  className="btn_3 t-btn-register"
                >
                  Register
                </Button>
              </div>

              <div className="forget-password">
                <Link to={"/"}>Back to home </Link>
                <Link to={"/login"}>Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
