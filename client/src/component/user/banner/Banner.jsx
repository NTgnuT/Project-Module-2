import React from "react";

export default function Banner({ title }) {
  return (
    <>
      <section className="breadcrumb breadcrumb_bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="breadcrumb_iner">
                <div className="breadcrumb_iner_item">
                  <h2>{title}</h2>
                  <p>
                    Home <span>-</span>
                    {title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
