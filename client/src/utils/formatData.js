/**
 * Format tiền tệ
 * @param {*} money
 * @returns
 */
export const formatMoney = (money) => {
  return money.toLocaleString("vi", { style: "currency", currency: "VND" });
};

/**
 * Định dạng chuỗi thời gian
 * @param {*} date : Chuỗi thời gian cần định dạng
 * @returns : Định dạng thời gian ngày-tháng-năm
 */
export const formatDate = (date) => {
  // Lấy ra định dạng thời gian của chuỗi dựa vào thời gian thực
  const today = new Date(date);
  // lấy ra năm
  let year = today.getFullYear();
  // Lấy ra tháng
  let month = today.getMonth() + 1;
  if (month > 0 && month < 10) {
    month = `0${month}`;
  }
  // Lấy ra ngày
  let day = today.getDate();
  if (day > 0 && day < 10) {
    day = `0${day}`;
  }
  // Trả ra chuỗi cần định dạng
  return `${day}-${month}-${year}`;
};
