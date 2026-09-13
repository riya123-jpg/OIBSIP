import { MapPin, Phone, Mail } from "lucide-react";

import "./Footer.css";

const quickLinks = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "Menu",
    href: "#menu",
  },
  {
    label: "Build Pizza",
    href: "/builder",
  },
  {
    label: "How It Works",
    href: "#how-it-works",
  },
];

const supportLinks = [
  {
    label: "About Us",
    href: "#",
  },
  {
    label: "Contact Us",
    href: "#",
  },
  {
    label: "FAQs",
    href: "#",
  },
  {
    label: "Terms & Conditions",
    href: "#",
  },
  {
    label: "Privacy Policy",
    href: "#",
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__main">
          {/* Brand */}
          <div className="footer__brand">
            <a href="/" className="footer__logo">
              Sliceory
            </a>

            <p className="footer__tagline">
              Crafted for cravings. Delivered fresh.
            </p>

            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Instagram">
                IG
              </a>

              <a href="#" className="footer__social" aria-label="Facebook">
                f
              </a>

              <a href="#" className="footer__social" aria-label="Twitter">
                X
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__column">
            <span className="footer__heading">Quick Links</span>

            <nav className="footer__links">
              {quickLinks.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div className="footer__column">
            <span className="footer__heading">Support</span>

            <nav className="footer__links">
              {supportLinks.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="footer__column footer__contact">
            <span className="footer__heading">Get in Touch</span>

            <div className="footer__contact-list">
              <div className="footer__contact-item">
                <MapPin size={16} />
                <span>Indore, India</span>
              </div>

              <div className="footer__contact-item">
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </div>

              <div className="footer__contact-item">
                <Mail size={16} />
                <span>support@sliceory.demo</span>
              </div>
            </div>

            <p className="footer__hours">Support available 10 AM – 11 PM</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p>© 2026 Sliceory. All rights reserved.</p>

          <a href="/admin/login">Admin Login</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
