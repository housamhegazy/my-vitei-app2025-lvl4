import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, Link, IconButton, Icon, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const AppBarComponent = ({handleDrawerToggle,drawerWidth}) => {

  return (
    <Box component={"header"}>
      <AppBar position="static">
        <Toolbar sx={{ marginLeft: { sm: `${drawerWidth}px` } }}>
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon
              fontSize="large"
              sx={{ color: "white", display: { sm: "none" } }}
            />
          </IconButton>
          <Link
            href="/"
            color="inherit"
            underline="none"
            sx={{
              flexGrow: 1,
              fontSize: "1.5rem",
              "&:hover": {
                color: "black",
                cursor: "pointer",
                transition: "color 0.3s",
              },
            }}
          >
            My Blog
          </Link>
          <Typography
            sx={{
              "&:hover": {
                color: "black",
                cursor: "pointer",
                transition: "color 0.3s",
              },
            }}
            mr={2}
            component={"p"}
            variant="body1"
            color="inherit"
          >
            H.Hegazy
          </Typography>
          <Avatar
            sx={{ cursor: "pointer" }}
            alt="Remy Sharp"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          />
        </Toolbar>
      </AppBar>
      
    </Box>
  );
};

export default AppBarComponent;
