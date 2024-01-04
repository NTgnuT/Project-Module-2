import React, { useEffect, useState } from "react";
import "../manager.css";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveUser, getUser } from "../../../redux/slice/userSlice";
import { Image, Pagination } from "antd";
import debounce from "lodash.debounce";

export default function ManagerUser() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.data);
  const isLoading = useSelector((state) => state.user.isLoadingChange);

  // console.log(users);

  // search
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const delaySearch = debounce(() => dispatch(getUser(searchText)), 500); // Đặt độ trễ cho hàm search tính từ khi bỏ tay khởi bàn phím
    delaySearch();

    return () => {
      delaySearch.cancel();
    }; // Hủy debounce khi không thực hiện chức năng search
  }, [searchText]);

  //ham goi API lay tat ca du lieu
  // useEffect(() => {
  //   dispatch(getUser());
  // }, [isLoadingChange]);

  useEffect(() => {
    dispatch(getUser());
  }, [isLoading]);

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
  const renderUser = users.slice(startIndex, endIndex);
  //========================================================================

  return (
    <>
      <div className="cat-header">
        <h3 className="cat-title">Manager User</h3>
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
          {/* <button className="btn btn-success">
            <i className="fa-solid fa-plus"></i>
            Add Category
          </button> */}
        </div>
      </div>
      <div className="admin-table">
        <table className="table table-striped table-hover">
          <thead className="table-info">
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Avatar</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Address</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody className="body-table">
            {renderUser.map((u, index) => (
              <tr key={u.id}>
                <td>{index + 1}</td>
                <td>
                  <Image src={u.avatar} alt="" width={50} height={50} />
                </td>
                <td>{u.user_name}</td>
                <td>{u.email}</td>
                <td>{u.phoneNumber}</td>
                <td>{u.address}</td>
                <td>{u.role === 1 ? "User" : "Admin"}</td>
                <td>{u.active === true ? "Active" : "Lock"}</td>
                <td>
                  {u.role === 1 &&
                    (u.active === true ? (
                      <button
                        onClick={() => dispatch(changeActiveUser(u))}
                        className="btn btn-info"
                      >
                        Lock
                      </button>
                    ) : (
                      <button
                        onClick={() => dispatch(changeActiveUser(u))}
                        className="btn btn-danger"
                      >
                        Unlock
                      </button>
                    ))}
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
          total={users.length} // Tổng số sản phẩm (số lượng items)
          showSizeChanger={false} // Ẩn chức năng thay đổi số sản phẩm trên mỗi trang
        />
      </div>
    </>
  );
}
