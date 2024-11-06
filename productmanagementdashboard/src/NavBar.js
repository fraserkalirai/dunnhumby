import { Link, useMatch, useResolvedPath} from "react-router-dom"

export default function NavBar() {
  return <nav className="nav">
    <Link to="/" className="nav-title">PMD</Link>
    <ul>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/product_table">Product Table</NavLink>
      <NavLink to="/graph">Graph</NavLink>
    </ul>
  </nav>
}

function NavLink({to, children, ...props}) {
  const path = useResolvedPath(to)
  const isActive = useMatch({ path: path.pathname})
  return (
    <li>
      <Link className={isActive ? "nav-link active" : "nav-link"} to={to}>{children}</Link>
    </li>
  )
}