import React from "react";
import { FaPhoneFlip } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="row">
        <div class="single-cta">
          <div class="cta-text">
            <h4>Find us</h4>
            <FaLocationDot className="icon" />
          </div>
          <span className="text">123 Main street, Los Angeles, CA, USA</span>
        </div>
        <div className="single-cta">
          <div className="cta-text">
            <h4>Call us</h4>
            <FaPhoneFlip className="icon" />
          </div>
          <span className="text"> 866-642-3241 1+</span>
        </div>
        <div className="single-cta">
          <div className="cta-text">
            <h4>Mail us</h4>
            <IoMdMail className="icon" />
          </div>
          <div className="mails">
            <span className="text">info@abpt.us</span>
            <span className="text">customerservice@abpt.us</span>
            <span className="text">Accreditation@abpt.us</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
