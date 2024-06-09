import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo.png';
import useAuth from "../../hooks/useAuth";

const NavBar = () => {

    const { user, logOut } = useAuth();

    const handleLogout = () => {
        logOut()
            .then(() => {
                console.log('Logged out successfully');
            })
            .catch(error => {
                console.error(error);
            });
    }

    const navList = <>
        <NavLink className='font-semibold' to='/'><li><a>Home</a></li></NavLink>
        <NavLink className='font-semibold' to='/allproperties'><li><a>All Properties</a></li></NavLink>
    </>

    return (
        <div>
            <div className="navbar bg-base-100 lg:px-6 lg:py-6">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navList}
                        </ul>
                    </div>
                    <a className="text-xl flex items-center">
                        <img className="w-8 md:w-14 rounded-full" src={logo} alt="" />
                        <span className="ml-4 font-bold">Mughal Real Estate</span>
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navList}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <>
                            <div className="w-fit mr-4"><img className="w-12 h-12 rounded-badge" src={user.photoURL} alt={user.displayName} title={user.displayName} /></div>
                            <Link onClick={handleLogout} className="btn">Logout</Link>
                        </>
                            : <Link to='/login' className="btn">Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default NavBar;