export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <h2 className="footer-title">
          RIMAL ALTAIF
        </h2>

        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">Best Sellers</a>
          <a href="#">Brands</a>
          <a href="#">Contact</a>
        </div>

        <div
          style={{
            marginTop: 30,
            color: "#999",
            fontSize: 14,
          }}
        >
          © 2026 Rimal Altaif. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}