import React, { useEffect } from "react";
import "./homeAdmin.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../../redux/slice/orderSlide";
import { getProduct } from "../../../redux/slice/productSlice";
import { getUser } from "../../../redux/slice/userSlice";

export default function HomeAdmin() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.data);
  const product = useSelector((state) => state.product.data);
  const user = useSelector((state) => state.user.data);
  // console.log(user);

  useEffect(() => {
    dispatch(getOrder());
  }, []);

  useEffect(() => {
    dispatch(getProduct());
  }, []);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const newList = user.filter((u) => u.role === 1);
  // console.log(newList);

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y info-all">
        <div className="row">
          <div className="col-lg-8 mb-4 order-0">
            <div className="card">
              <div className="d-flex align-items-end row">
                <div className="col-sm-7">
                  <div className="card-body">
                    <h5 className="card-title text-primary">
                      Congratulations John! 🎉
                    </h5>
                    <p className="mb-4">
                      You have done <span className="fw-bold">72%</span> more
                      sales today. Check your new badge in your profile.
                    </p>
                    <a href="#" className="btn btn-sm btn-outline-primary">
                      View Badges
                    </a>
                  </div>
                </div>
                <div className="col-sm-5 text-center text-sm-left">
                  <div className="card-body pb-0 px-0 px-md-4">
                    <img
                      src="../assets/img/illustrations/man-with-laptop-light.png"
                      height={140}
                      alt="View Badge User"
                      data-app-dark-img="illustrations/man-with-laptop-dark.png"
                      data-app-light-img="illustrations/man-with-laptop-light.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 order-1">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title d-flex align-items-start justify-content-between">
                      <div className="avatar flex-shrink-0">
                        <img
                          src="../assets/img/icons/unicons/chart-success.png"
                          alt="chart success"
                          className="rounded"
                        />
                      </div>
                      <div className="dropdown">
                        <button
                          className="btn p-0"
                          type="button"
                          id="cardOpt3"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="bx bx-dots-vertical-rounded" />
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="cardOpt3"
                        >
                          <a className="dropdown-item" href="#">
                            View More
                          </a>
                          <a className="dropdown-item" href="#">
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                    <span className="fw-semibold d-block mb-1">Profit</span>
                    <h3 className="card-title mb-2">$12,628</h3>
                    <small className="text-success fw-semibold">
                      <i className="bx bx-up-arrow-alt" /> +72.80%
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title d-flex align-items-start justify-content-between">
                      <div className="avatar flex-shrink-0">
                        <img
                          src="../assets/img/icons/unicons/wallet-info.png"
                          alt="Credit Card"
                          className="rounded"
                        />
                      </div>
                      <div className="dropdown">
                        <button
                          className="btn p-0"
                          type="button"
                          id="cardOpt6"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="bx bx-dots-vertical-rounded" />
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="cardOpt6"
                        >
                          <a className="dropdown-item" href="#">
                            View More
                          </a>
                          <a className="dropdown-item" href="#">
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                    <span>Sales</span>
                    <h3 className="card-title text-nowrap mb-1">$4,679</h3>
                    <small className="text-success fw-semibold">
                      <i className="bx bx-up-arrow-alt" /> +28.42%
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Total Revenue */}
          <div className="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
            <div className="card">
              <div className="row row-bordered g-0">
                <div className="col-md-8">
                  {/* <h5 className="card-header m-0 me-2 pb-3">Total Revenue</h5>
                  <div id="totalRevenueChart" className="px-2 t-total-rev">
                    <small className="text-success text-nowrap fw-semibold">
                      <i className="bx bx-chevron-up" /> 68.2%
                    </small>
                    <h3 className="mb-0">$84,686k</h3>
                  </div> */}
                  <table className="table-revenue">
                    <thead className="thead-revenue">
                      <tr>
                        <th>User account</th>
                        <th>Total product</th>
                        <th>Total order</th>
                      </tr>
                    </thead>
                    <tbody className="tbody-revenue">
                      <tr>
                        <td>{newList.length}</td>
                        <td>{product.length}</td>
                        <td>{order.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-4">
                  <div className="card-body">
                    <div className="text-center">
                      <div className="dropdown">
                        <button
                          className="btn btn-sm btn-outline-primary dropdown-toggle"
                          type="button"
                          id="growthReportId"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          2022
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="growthReportId"
                        >
                          <a className="dropdown-item" href="#">
                            2021
                          </a>
                          <a className="dropdown-item" href="#">
                            2020
                          </a>
                          <a className="dropdown-item" href="#">
                            2019
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="growthChart" />
                  <div className="text-center fw-semibold pt-3 mb-2">
                    62% Company Growth
                  </div>
                  <div className="d-flex px-xxl-4 px-lg-2 p-4 gap-xxl-3 gap-lg-1 gap-3 justify-content-between">
                    <div className="d-flex">
                      <div className="me-2">
                        <span className="badge bg-label-primary p-2">
                          <i className="bx bx-dollar text-primary" />
                        </span>
                      </div>
                      <div className="d-flex flex-column">
                        <small>2022</small>
                        <h6 className="mb-0">$32.5k</h6>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="me-2">
                        <span className="badge bg-label-info p-2">
                          <i className="bx bx-wallet text-info" />
                        </span>
                      </div>
                      <div className="d-flex flex-column">
                        <small>2021</small>
                        <h6 className="mb-0">$41.2k</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*/ Total Revenue */}
          <div className="col-12 col-md-8 col-lg-4 order-3 order-md-2">
            <div className="row">
              <div className="col-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title d-flex align-items-start justify-content-between">
                      <div className="avatar flex-shrink-0">
                        <img
                          src="../assets/img/icons/unicons/paypal.png"
                          alt="Credit Card"
                          className="rounded"
                        />
                      </div>
                      <div className="dropdown">
                        <button
                          className="btn p-0"
                          type="button"
                          id="cardOpt4"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="bx bx-dots-vertical-rounded" />
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="cardOpt4"
                        >
                          <a className="dropdown-item" href="#">
                            View More
                          </a>
                          <a className="dropdown-item" href="#">
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                    <span className="d-block mb-1">Payments</span>
                    <h3 className="card-title text-nowrap mb-2">$2,456</h3>
                    <small className="text-danger fw-semibold">
                      <i className="bx bx-down-arrow-alt" /> -14.82%
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title d-flex align-items-start justify-content-between">
                      <div className="avatar flex-shrink-0">
                        <img
                          src="../assets/img/icons/unicons/cc-primary.png"
                          alt="Credit Card"
                          className="rounded"
                        />
                      </div>
                      <div className="dropdown">
                        <button
                          className="btn p-0"
                          type="button"
                          id="cardOpt1"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="bx bx-dots-vertical-rounded" />
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="cardOpt1"
                        >
                          <a className="dropdown-item" href="#">
                            View More
                          </a>
                          <a className="dropdown-item" href="#">
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                    <span className="fw-semibold d-block mb-1">
                      Transactions
                    </span>
                    <h3 className="card-title mb-2">$14,857</h3>
                    <small className="text-success fw-semibold">
                      <i className="bx bx-up-arrow-alt" /> +28.14%
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
