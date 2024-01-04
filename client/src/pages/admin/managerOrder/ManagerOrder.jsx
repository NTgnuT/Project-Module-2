import React, { useEffect, useState } from "react";
import "../manager.css";
import "./order.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../../redux/slice/orderSlide";
import { formatMoney } from "../../../utils/formatData";
import { Button, Modal, Pagination } from "antd";
import instance from "../../../API/axios";

export default function ManagerOrder() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.data);
  const [orderDetail, setOrderDetail] = useState();
  const isLoading = useSelector((state) => state.order.isLoadingChange);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = async (id) => {
    try {
      const detail = await instance.get(`order/${id}`);
      setOrderDetail(detail.data);
      console.log(detail.data.carts);
    } catch (error) {
      console.log(error);
    }

    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getOrder());
  }, [isLoading]);

  const handleAccept = async (id) => {
    try {
      const response = await instance.patch(`order/${id}`, {
        startus: 1,
      });
      dispatch(getOrder());
    } catch (error) {
      console.log(error);
    }
  };

  const handleCan = async (id) => {
    try {
      const response = await instance.patch(`order/${id}`, {
        startus: 2,
      });
      dispatch(getOrder());
    } catch (error) {
      console.log(error);
    }
  };

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
  const renderOrder = orders.slice(startIndex, endIndex);
  //========================================================================

  return (
    <>
      <Modal
        title="Information order"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={<Button onClick={handleCancel}>Cancel</Button>}
      >
        <div>
          {orderDetail && (
            <>
              <div className="order-info">
                <div className="order-left">
                  <p>ID Order: {orderDetail.idUser}</p>
                  <p>Time Order: {orderDetail.date} </p>
                  <p>Total Bill: {formatMoney(orderDetail.total)}</p>
                </div>

                <div className="order-right">Note: {orderDetail.note} </div>
              </div>
            </>
          )}

          <div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail &&
                  orderDetail.carts.map((pro, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={pro.datas.image}
                          width={40}
                          height={40}
                          alt="ảnh"
                        />
                      </td>
                      <td>{pro.datas.product_name}</td>
                      <td>{formatMoney(+pro.datas.price)}</td>
                      <td>{pro.quantity}</td>
                      <td>{formatMoney(pro.datas.price * pro.quantity)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>

      <div className="cat-header">
        <h3 className="cat-title">Manager Order</h3>
        {/* <div className="cat-search">
          <input
            type="text"
            className="input-search"
            placeholder="Search ..."
            // value={searchText}
            // onChange={(e) => setSearchText(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass fs-4"></i>
        </div> */}
      </div>
      <div className="admin-table">
        <table className="table table-striped table-hover border">
          <thead className="table-info">
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Time Order</th>
              <th scope="col">ID User Order</th>
              <th scope="col">Total Bill</th>
              <th scope="col">Status</th>
              <th scope="col">Note</th>
              <th scope="col">Info Order</th>
              <th scope="col" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody className="body-table">
            {renderOrder.map((cat, index) => (
              <tr key={cat.id}>
                <td>{index + 1}</td>
                <td>{cat.date}</td>
                <td>{cat.idUser}</td>
                <td>{formatMoney(cat.total)}</td>
                <td>
                  {cat.startus === 0
                    ? "Awaiting confirm..."
                    : cat.startus === 1
                    ? "Order is accept"
                    : "Order is cancel"}
                </td>
                <td>
                  {cat.note.length > 30
                    ? `${cat.note.substring(0, 30)}.....`
                    : cat.note}
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => showModal(cat.id)}
                  >
                    <i className="fa-solid fa-pen-to-square mr-2"></i>
                    Show Order
                  </button>
                </td>
                {cat.startus === 0 ? (
                  <>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => handleAccept(cat.id)}
                      >
                        Accept
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleCan(cat.id)}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td></td>
                    <td></td>
                  </>
                )}
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
          total={orders.length} // Tổng số sản phẩm (số lượng items)
          showSizeChanger={false} // Ẩn chức năng thay đổi số sản phẩm trên mỗi trang
        />
      </div>
    </>
  );
}
