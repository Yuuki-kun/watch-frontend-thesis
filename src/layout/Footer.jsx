import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faEnvelope,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "30px 0",
        marginTop: "50px",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h3>Contact Us</h3>
            <p>
              <FontAwesomeIcon icon={faPhoneAlt} /> 877-834-1434
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} /> example@example.com
            </p>
            <p>
              <FontAwesomeIcon icon={faCommentAlt} /> Chat with us
            </p>
          </div>
          <div className="col-md-4">
            <h3>Customer Service</h3>
            <ul>
              <li>Order Status</li>
              <li>Update Your Email Preferences</li>
              <li>Trade-In Your Watch</li>
              <li>Sell my Rolex</li>
              <li>Sell my Watch</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h3>Company Info</h3>
            <ul>
              <li>About TimeFlow</li>
              <li>TimeFlow Reviews</li>
              <li>The Parlor: Our Blog</li>
              <li>Affiliate Program</li>
              <li>Authenticity Guarantee</li>
              <li>TimeFlow Coupon Codes</li>
              <li>TimeFlow Gift Cards</li>
              <li>TimeFlow App</li>
              <li>Help Center</li>
            </ul>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <p>&copy; B2012113 - Tong Cong Minh</p>
            <div className="social-icons">
              <a href="#">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
