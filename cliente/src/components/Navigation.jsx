import { Link } from "react-router-dom"
import { getNavigationItems } from "../routes/routesManager"

function Navigation() {
  const navigationItems = getNavigationItems()

  return (
    <nav>
      {navigationItems.map((item) => (
        <Link key={item.path} to={item.path}>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

export default Navigation