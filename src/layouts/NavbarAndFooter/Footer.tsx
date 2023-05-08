export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="main-color py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-4">
            <h5 className="gray-link">About Us</h5>
            <p className="gray-link">
              We understand that food is not just about taste, <br /> but also
              about health and well-being.
            </p>
          </div>
          <div className="col-md-2 mb-4">
            <h5 className="gray-link">Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="gray-link">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="gray-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="gray-link">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-2 mb-4">
            <h5 className="gray-link">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="gray-link">
                  Link 1
                </a>
              </li>
              <li>
                <a href="#" className="gray-link">
                  Link 2
                </a>
              </li>
              <li>
                <a href="#" className="gray-link">
                  Link 3
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-2 mb-4">
            <h5 className="gray-link">Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="social-icon gray-link">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="#" className="social-icon gray-link">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#" className="social-icon gray-link">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row gray-link">
          <div className="col-12 text-center">
            <hr className="mt-4 mb-3 " />
            <p className="mb-0">© {currentYear} MenuMaster</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
