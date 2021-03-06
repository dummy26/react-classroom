import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import UserIconMenu from './UserIconMenu';
import NavbarMenu from './NavbarMenu';
import useClassroom from '../../hooks/api/useClassroom';
import { Link as RouterLink, useParams } from 'react-router-dom';


function NavbarAppBar({ toggleDrawer, drawerOpen }) {
    const { code } = useParams()
    const { data: classroom } = useClassroom(code)

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        onClick={toggleDrawer}
                        edge="start"
                        sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Link
                        underline="hover"
                        component={RouterLink}
                        to={code && classroom ? `/${code}/dashboard` : '/'}
                        color='inherit'
                        variant="h6"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        {code && classroom ? classroom.name : 'Classroom'}
                    </Link>

                    <NavbarMenu />
                    <UserIconMenu />
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    )
}

export default NavbarAppBar
