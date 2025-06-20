import { Link, useLocation } from "react-router-dom";

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

// Optional: detect if it's a MongoDB ObjectId
const isObjectId = (str) => /^[0-9a-fA-F]{24}$/.test(str);

export default function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  let path = "";

  return (
    <nav className="text-sm text-gray-700">
      <ul className="flex gap-2 items-center flex-wrap">
        <li>
          <Link to="/dashboard" className="hover:underline text-blue-600 font-medium">Dashboard</Link>
        </li>

        {segments.map((segment, i) => {
          path += `/${segment}`;
          const isLast = i === segments.length - 1;

          // Handle known patterns
          let displayName = segment;
          if (isObjectId(segment)) {
            displayName = "Details";
          } else if (segment === "tickets") {
            displayName = "Tickets";
          } else if (segment === "projects") {
            displayName = "Projects";
          } else {
            displayName = capitalize(segment);
          }

          return (
            <li key={i} className="flex items-center gap-2">
              <span>/</span>
              {isLast ? (
                <span className="font-semibold text-gray-800">{displayName}</span>
              ) : (
                <Link to={path} className="text-blue-600 hover:underline">
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

