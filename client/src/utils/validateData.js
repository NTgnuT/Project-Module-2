/**
 * Validate email
 * @param {*} email : chuỗi email cần kiểm tra
 * @returns true nếu đúng định dạng, false nếu sai định dạng
 */
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

/**
 * validate password
 * @param {*} password
 * @returns : tối thiểu 5 kí tự, có cả chữ, số và kí tự
 */
export const validatePassword = (password) => {
  return String(password)
    .toLowerCase()
    .match(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/);
};

/**
 * validate phoneNumber
 * @param {*} phoneNumber
 * @returns
 */
export const validatePhoneNumber = (phoneNumber) => {
  return String(phoneNumber)
    .toLowerCase()
    .match(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/);
};
