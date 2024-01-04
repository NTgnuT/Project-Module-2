import React, { useEffect, useState } from "react";
import "./backTop.css";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 200) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    // Lắng nghe sự kiện cuộn chuột từ màn hình
    window.addEventListener("scroll", handleScroll);

    // Hủy sự kiện
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {show ? (
        <div className="back-top" onClick={handleScrollTop}>
          <i className="fa-solid fa-arrow-up"></i>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
