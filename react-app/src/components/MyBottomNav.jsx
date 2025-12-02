// MyBottomNav.jsx
import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { MdMovie } from "react-icons/md";
import { MdOutlineLiveTv } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export const MyBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // map path -> index
  const pathToIndex = (path) => {
    if (path.startsWith("/tvseries")) return 1;
    if (path.startsWith("/search")) return 2;
    return 0;
  };

  const [value, setValue] = React.useState(pathToIndex(location.pathname));

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) navigate("/");
    if (newValue === 1) navigate("/tvseries");
    if (newValue === 2) navigate("/search");
  };

  React.useEffect(() => {
    // update tab if route changed externally
    setValue(pathToIndex(location.pathname));
  }, [location.pathname]);

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction label="Movies" icon={<MdMovie />} />
        <BottomNavigationAction label="TV Series" icon={<MdOutlineLiveTv />} />
        <BottomNavigationAction label="Search" icon={<FaSearch />} />
      </BottomNavigation>
    </Box>
  );
};
