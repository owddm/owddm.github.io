import "./SiteFooter.css";

export const SiteFooter = () => (
  <footer className="site-footer">
    <p>
      <span className="capitalize">Copyright</span> © {new Date().getFullYear()} Osaka/Kyoto Web Designers and web developers meetup - <a href="/coc">Code of Conduct</a>
    </p>
  </footer>
);
