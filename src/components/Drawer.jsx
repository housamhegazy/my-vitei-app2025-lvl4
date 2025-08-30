import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { DarkMode, Logout, Settings, Sunny } from "@mui/icons-material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import GroupsIcon from "@mui/icons-material/Groups";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { Link, useLocation, useNavigate } from "react-router";

function ResponsiveDrawer({
  handleDrawerClose,
  handleDrawerTransitionEnd,
  mobileOpen,
  drawerWidth,
  theme,
  handleTheme,
}) {
  const location = useLocation();
  const iconColor = theme.palette.mode === "dark" ? "inherit" : "primary";
  const navigate = useNavigate();
  //list items data
  const myList = [
    {
      title: "profile",
      icon: <AccountBoxIcon color={iconColor} />,
      pathname: "/profile",
    },
    {
      title: "home",
      icon: <HomeIcon color={iconColor} />,
      pathname: "/",
    },
    {
      title: "create",
      icon: <ArticleIcon color={iconColor} />,
      pathname: "/create",
    },
    {
      title: "settings",
      icon: <Settings color={iconColor} />,
      pathname: "/settings",
    },
    {
      title: "Logout",
      icon: <Logout color={iconColor} />,
      pathname: "/Logout",
    },
  ];

  //drawer content
  const drawer = (
    <div>
      <Toolbar />
      <IconButton
        onClick={handleTheme}
        sx={{ mx: "auto", display: "block" }}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? <Sunny /> : <DarkMode />}
      </IconButton>
      <Divider />
      <List>
        {myList.map((item, index) => {
          return (
            <ListItem
              sx={{
                backgroundColor:
                  location.pathname === item.pathname
                    ? theme.palette.action.selected
                    : "inherit",
              }}
              key={index}
              onClick={() => {
                navigate(item.pathname);
              }}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: `${drawerWidth}px` }, flexShrink: { sm: 0 } }}
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen} // Mobile drawer open state
        onTransitionEnd={handleDrawerTransitionEnd} // Handle transition end
        onClose={handleDrawerClose} // close drawer when press on any place outside drawer
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        slotProps={{
          root: {
            keepMounted: true, // Better open performance on mobile.
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default ResponsiveDrawer;
