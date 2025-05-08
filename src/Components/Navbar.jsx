import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <nav className="navbar">
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/about">About</Link>
      <Link className="nav-link" to="/services">Services</Link>
      <Link className="nav-link" to="/blog">Blog</Link>
    </nav>
  );
}
