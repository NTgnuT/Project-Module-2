import React, { useEffect, useState } from "react";
import Navbar from "../../../component/user/navbar/Navbar";
import Banner from "../../../component/user/banner/Banner";
import Footer from "../../../component/user/footer/Footer";
import "./history.css";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrder } from "../../../redux/slice/orderSlide";
import { formatMoney } from "../../../utils/formatData";
import instance from "../../../API/axios";

export default function History({ title }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.order.isLoadingChange);
  const orders = useSelector((state) => state.order.data);
  // console.log(orders);
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetail, setOrderDetail] = useState();

  const findOrder = orders.filter((order) => order.idUser === userLogin.id);
  //   console.log(findOrder);

  useEffect(() => {
    dispatch(getOrder());
  }, [isLoading]);

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

  // delete
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const handleShowModalDelete = (id) => {
    setIdDelete(id);
    setIsModalOpenDelete(true);
  };
  const handleOkDelete = () => {
    dispatch(deleteOrder(idDelete));
    setIdDelete();
    setIsModalOpenDelete(false);
  };
  const handleCancelDelete = () => {
    setIdDelete();
    setIsModalOpenDelete(false);
  };

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

      <Navbar />
      <Banner title={title} />
      <div className="container-table">
        <table className="table table-hover table-history">
          <thead>
            <tr className="table-secondary">
              <th scope="col">STT</th>
              <th scope="col">Time Order</th>
              <th scope="col">Total Bill</th>
              <th scope="col">Status</th>
              <th scope="col">Note</th>
              <th scope="col">Info Order</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {findOrder && findOrder.length > 0 ? (
              findOrder.map((or, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{or.date}</td>
                  <td>{formatMoney(or.total)}</td>
                  <td>
                    {or.startus === 0
                      ? "Awaiting confirm..."
                      : or.startus === 1
                      ? "Order is accept"
                      : "Order is cancel"}
                  </td>
                  <td>{or.note}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => showModal(or.id)}
                    >
                      Show Order
                    </button>
                  </td>
                  {or.startus === 0 ? (
                    <>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleShowModalDelete(or.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td></td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <>
                <tr>
                  <td colSpan={7}>You don't have any purchase history</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}
