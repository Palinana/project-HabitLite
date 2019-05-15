import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer-sect">
      <figure className="footer-sect__logo">
        <img src="./images/logo-white.png" alt="habitlite" />
      </figure>
      <div className="footer-sect__box">
        <section className="footer-sect__location">
          <figure>
            <img src="./images/icon-location.svg" alt="location" />
          </figure>
          <p>171 Main Street, New York NY 10119</p>
        </section>

        <section className="footer-sect__contact">
          <span>
            <img src="./images/icon-phone.svg" alt="phone" />
            <p>+1-543-123-4567</p>
          </span>
          <span>
            <img src="./images/icon-email.svg" alt="email" />
            <a href="#">contact@habitlite.com</a>
          </span>
        </section>

        <section className="footer-sect__links">
          <ul className="links__main">
            <li>About Us</li>
            <li>Jobs</li>
            <li>Press</li>
            <li>Blog</li>
          </ul>
          <ul className="links__secondary">
            <li>Contact Us</li>
            <li>Terms</li>
            <li>Privacy</li>
          </ul>
        </section>

        <section className="footer-sect__social-media">
          <div className="circle">
            <img src="./images/facebook.svg" alt="facebook" />
          </div>
          <div className="circle">
            <img src="./images/twitter.svg" alt="twitter" />
          </div>
          <div className="circle">
            <img src="./images/instagram.svg" alt="instagram" />
          </div>
        </section>
      </div>
    </footer>
  )
}

export default Footer
