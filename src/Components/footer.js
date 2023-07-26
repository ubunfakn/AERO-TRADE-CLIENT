import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      {/* <!-- Footer --> */}
      <footer className="text-center text-white">

        {/* <!-- Copyright --> */}
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 Copyright:
          <Link
            className="text-white"
            target="blank"
            to={"https://github.com/ubunfakn"}
          >
            AERO-TRADE
          </Link>
        </div>
        {/* <!-- Copyright --> */}
      </footer>
      {/* <!-- Footer --> */}
    </div>
  );
}