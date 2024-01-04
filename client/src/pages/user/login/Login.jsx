import React, { useState } from "react";
import Navbar from "../../../component/user/navbar/Navbar";
import Banner from "../../../component/user/banner/Banner";
import Footer from "../../../component/user/footer/Footer";
import { Button, Input, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase/firebaseConfig";

export default function Login({ title }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  // Chuyển trang
  const navigate = useNavigate();
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));

  // Hàm validate dữ liệu nhập vào
  const validateData = (emailInput, valueInput) => {
    switch (emailInput) {
      case "email":
        if (!valueInput) {
          setEmailError(true);
        } else {
          setEmailError(false);
        }
        break;
      case "password":
        if (!valueInput) {
          setPasswordError(true);
        } else {
          setPasswordError(false);
        }
        break;

      default:
        break;
    }
  };

  // Lấy giá trị từ các ô input
  const handleInputChange = (e) => {
    // Lấy name và value từ các ô input
    const { name, value } = e.target;

    // Khi onChange thì gọi đến hàm validate
    validateData(name, value);

    // Kiểm tra name và gán giá trị
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateData("email", email);
    validateData("password", password);

    if (email && password) {
      const newUser = {
        email: email,
        password: password,
      };
      // Gọi API đăng nhập
      axios
        .post("http://localhost:3000/login", { ...newUser, cart: [] })
        .then((response) => {
          if (response.status === 200) {
            // Lưu dữ liệu lên local
            localStorage.setItem(
              "userLogin",
              JSON.stringify(response.data.user)
            );

            // Nếu active là false thì thông báo tài khoản bị khóa
            if (response.data.user.active === false) {
              notification.warning({
                message: "Warning",
                description:
                  "Your account has been looked, please contact admin",
              });
              return;
            }

            // Chuyển trang
            if (response.data.user.role === 0) {
              notification.success({
                message: "Success",
                description: "Wellcome back!",
              });
              navigate("/admin");
            } else {
              notification.success({
                message: "Success",
                description: "Logged in successfully",
              });
              navigate("/");
            }
          }
        })
        .catch((error) => {
          if (
            error.response.data === "Incorrect password" ||
            error.response.data === "Cannot find user" ||
            error.response.data === "Password is too short"
          ) {
            notification.error({
              message: "Warning",
              description: "Email or password is wrong",
            });
          }
        });
    }
  };

  // Đăng nhập với google
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((response) => {
        const userLocal = {
          email: response.user.email,
          user_name: response.user.displayName,
          avatar: response.user.photoURL,
          id: response.user.uid,
          role: 1,
          active: true,
          cart: [],
        };
        // Lưu thông tin lên local
        localStorage.setItem("userLogin", JSON.stringify(userLocal));

        // Chuyển hướng về trang home
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />
      {/* <Banner title={title} /> */}
      <div className="col-lg-6 col-md-6 container-login">
        <div className="login_part_form">
          <div className="login_part_form_iner">
            <h3>
              Welcome Back ! <br />
              Please Sign in now
            </h3>
            <form className="row contact_form" onSubmit={handleSubmit}>
              <label htmlFor=""></label>
              <div className="col-md-12 form-group p_star">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                  onBlur={handleInputChange}
                />
                {emailError && <div className="err">Email is required.</div>}
              </div>
              <div className="col-md-12 form-group p_star">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  onBlur={handleInputChange}
                />
                {passwordError && (
                  <div className="err">Password is required.</div>
                )}
              </div>
              <div className="col-md-12 form-group">
                <button className="btn_3 t-btn-login">log in</button>
              </div>

              <div className="forget-password">
                <Link to={"/"}>Back to home </Link>
                <Link>Forget password?</Link>
              </div>

              <div className="text-center my-3">Or</div>

              <div>
                <Button
                  onClick={signInWithGoogle}
                  className="login-with-google"
                >
                  <img
                    width={20}
                    height={20}
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABblBMVEX////tQC0tqU8/gvn8vQAoePnq8P40ffmduvu0yvz8ugDsJwH8uAD/vgD8uwAAojnsMRj1o50cpUVAf//tNyHtOyY4f/nsKgoYpUPsLhLsMxv9xAAjdvn96un4wLzX4v1+xI5uvoGm1bD73tzzjobuSDfvWEryhX35yMX2r6r+9vbwcWbsMS/+7c3+9eH//PSrxPx8pfoAp1Pw+PLL2v0rrDnU6tn0l5DwZVjvW07+6cD+4aj+5bWLyZns9u7B0/3G48yOsPuc0ai43cBmu3o4rFdunPrc7uD61NHxenD1qKLrAAD4xMDygHf0mZr5pgD92pHwYyj1hx/8yEruUCvydCT3lxn903fxaSb6rBDvVyr9zWT4nRb82bEAbfj8xDf9ylJbkfrl47tmrEHiuhq1tS+MsTxRrErRuCOeszf90XCutDLLuCYGmmo9jNo4l68yon05lLw0n4o7kcc1nJc8jtM3mqU+ieUApSWMvscq8ZCeAAAJKElEQVR4nO2baXvaRhCAZQx1bIFlFBFJ2NhgYxtwm6R1DHYaXAKhdlKnddv0PtMrve/z31dCYA5dO6s9JJ59P/kT6PXMzszuCkkSCAQCgUAgEAgEAoFAIBAIBImiUdo5r11s2lzUzndKDd4PRI5SrV492JVlXTfNNQfTNHVZ3j2oPqqVeD9eNEqb1RNLrKgVFrwoaEXLdK+6ucP7QbEo1R8W9TUft2nPNd08qCfM8ry1IBfD5SY0i3qhes77sVE5r5qmBrAboZnmfgIkS/mCjqM3ktRa8a49tWMZX28oKR9f8Nbwpb5gQtaeHwVTe8RbxYtG3iwS0HMo6q3YTQR5nZyfjSbHy7FOMH5Xjnqet9YVtYU14n42RW2Tt9qA0rFOxc/GPInBqJOXSdRPPwpyi7Pfzi6dBB1TXOA657SoBnCIXOXmV9qjHUCH4i6nSW6TRQAHFOQ6D8F9mZGfjf6QuV9jj3yPD0LbZTzi7CBs3slSMJnW1BrLDB0hM5xw6jwEFxZeYxbFFh9BmdkkXqU3h8ZDcN8UgskWrM67YGve1yCnNsFOkEujZym4M++CjajH2XEXlPZYD9usBfejbZfs61BT12XnMtjv0pSn4Cb+Iixoplw4aNVr56VSo9EolXZq9dbBgmyGazIULOEKFtbkk3zNa/vaOM8fy2uBkgwFMRehpfdwM2hz3rh4HCDJUrCFc6qmyScom9ZNv0tHloI4nVCT91GP5EtVL0eWgtIuOEeBt2ONvOtunKlgHpqjBbkKPRprzJyfMxUE11H9GOeQunQwsXFhKigdw3JUW8M9FKtpo1RlK1iD7Qn1gwhnt49lDoISyK8Q8VTzQi8wF6xDyowW+ZqosVdkLChBDmbMAwJf+JCx4OuALQX3K2kcbr0BEORyyxeVy3T6zecRBePxbgiUlXR6/S0kRTm+L9wF8bJlmF5HydSERlBKO6x+GBbGZK5BSbqbHSqGZaqZxCpq8/ZqeqT4cZCiRqIP8uDmKIS2YvaJr2Nhl/eT4nK5mp5g/R0/RTne72YHkJ5m/V1vRT2hZVSSXsjOKn7wZJ4WoSS9t5p28b47jGuxel0ZxIpb0KNtJDdH3Uk6zNSZOnrM+znx8UrSAVOjeHLrqKuSemeqts/7MfG56ZmkjuJ4FJeTW2acbYUfK8NRXEvqPGrzkd8ydMLoDDhJDqEUKDgcxZO8CoOW4VDRGsXlGPzgA5t7QctwlKknvJ8yCr7dcJJPeD9lFD5DMMzifPBzlAA/SNgytFj9CEPw9kaGCp9CHyS00Fis3MMwXF5apEJmC/ggdxEMs7diZLj0CvBBAieaYZJ+hiFIz/Aa8EEQSunqZZwMb7wIfJDPww2zd2Nl+BT4IGkEQ5xlSM1wcQn4IAiFJo0jSM9wA/Yct8INVz+Pl2EG1vMR2iFeoaFoCGuICIYrLyfa0PucbdoQq5RSrDSwln83vOFnX0i0IcLuMHszZobLxA2x2iFFw9vCUBgKwzk0THYtnf9+OP8zzfzPpfO/t5j//eH87/ETeE6TAT4IylkbVruIzVnb/J+Xzv+ZN8JQE7N7C9jQhnj3hDPVxObuidr94XJmCcoNFENos6B3B7x1DQ6SIvhJUO7xV77AUISzlQn3A5dSlB1iLv3lAwo+bl5EiCFw/2sTWmpyX6VSyikFoVme20DIUXih8X5/dlLw65dSKbVNXsjFNZTqCy80Ie+15XLfWIJWEA+JC7lAEQTPbDZBU03uq2cDwZTaJS40y20UQ/BEYxOwEHM/On4WBnGjWZAmBJxl6P+O8ChDnSDSXolIqxC8dXLw6Yi59LOxIP1yitALsbqhjfd5W+7bST8riHR7IkovxHhdaIiXYe67aUEriB2iStNsofRCvF5h870rTa0xZlbQiiJRp2mQ/BZvvIr58a40tccYN2qZpNMU99G2WrhJ6nrVO/eDO4BU8xQxRzErqc3U7w9zOY8MHSpSmmwQN8tL97G/YbLpe2fokD5BrTFPkeoobrt3GG+DB4O2L2qFnNcViItwEWPzO+Ze1mOM8cIgP58uIy5C+BnUFE4Mc+vPggWtpdgjZTbkDqpghDpjc2lvMCYG7QDFDhmzIahlFHNbMUHWylDXGENfEV1wcQP+O4QprCCGZih5RYDgDfxW4XArqEnMKpJai+hrMHoIJamtAhTJVFTkKmqxhLdvmsJAN0wZ5ejfJ90HCBIIoSR1IYpqP/IA9xRysRFhYJsAkKZ2GDuRvuwO2i3FiGi9cEQPEkRrMZYjfFf7p0WIYQZ+0u1JH2SYUlMdzC9q9lVV/fk6QJGMoHSmwBRTSgVnNR6WB99z9Auy4kaETcU0kI7hhBGjb3SV4bcc/YqYqZgnbJ4ABW1H4G5jWx3/F9XUP0hhhP4OKIgmNE8Hjm3Uo9TDrjFdzY5+Q1DcuEPQEJ6nA0flQQfhszsVxfXpR79fD8tUkjlqA6ynV3E0ysGSzbZqeP33jH5oppIVlE4x8nQoqTzYbnp+5tl2xfDUG3D0R6AiuTo6YhtX0bHsl7u95qnTRA5Pm73tcl8x1MDcP/ozIFMzEfe9XlRwluKEpZWxhuJg/RUs52D89NQvjEu4p9yB4C3FKKjGX36KNASlQ9h8SoSjvz0VoW/LooLTFSMreo3iZDvhJD0OimrKNYqT2lF4AdoNk2J2FM8Q2fX6UeaiODWKkziZCaLCQ1GdGHDo9AnuiuNRnL4gN0VnFGchyEvR6FsDDhtBTuXGHsU3KBeZMV0OfdHi3/9YCfJp/Sllm52gNcCxT1SqbyZ5cNqPtpmCoqZYvI48DdOSarB5o3yGKLt+IISu7cCcpdhkqpryPudhQZlFGBUaL+sg06QeRlXt8BS0aNMNY6S7OkKc9ekVVaPPbwVO0vM/1o2EajCdYgLpum8eovspLH6Qg8xhm7CjqpQZ/BwHBFFHy4/9kBaO6xYQF8Noxy1+V/T6kQOpKn3SL3KS5awdcGEWrmco5Xj0h0A6FQVL0r5pjHf4JuiUoZFUDaOSGD2HZvdB2BXoSM4OXjcByelBc7vSVwJuQ+1bUyVV8bkETwxnvW6lbwwufm1ZdXAZbF8HG/1Kt9eMbV8Ac3rW7PR62za9Xqd5FseOLhAIBAKBQCAQCAQCgUAgEAgC+B8EalphKgVlUwAAAABJRU5ErkJggg=="
                    alt=""
                  />
                  Login with Google
                </Button>
              </div>

              <div className="text-center mt-2">
                You don't have account?
                <Link to={"/register"}>Create an account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
