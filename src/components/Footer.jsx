const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="left-inner-child">
      <div className="footer-text">
        <div>
          ©{currentYear === 2020 ? currentYear : `2020-${currentYear}`},{" "}
          <a href="http://www.vecrproject.com/">VECR</a>.
        </div>
        Made with ♥️ by{" "}
        <a className="footer-link" href="https://github.com/Julien-B-py">
          {" Julien B. "}
          <i className="fab fa-github"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
