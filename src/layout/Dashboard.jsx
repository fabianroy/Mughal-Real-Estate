import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {

    const dashBoardOptions = <>
        <NavLink to='/dashboard/adminprofile' className='font-semibold'><li><a>Admin Profile</a></li></NavLink>
        <NavLink to='/dashboard/manageusers' className='font-semibold'><li><a>Manage Users</a></li></NavLink>
        <NavLink to='/dashboard/manageproperties' className='font-semibold'><li><a>Manage Properties</a></li></NavLink>
        <NavLink to='/dashboard/managereviews' className='font-semibold'><li><a>Manage Reviews</a></li></NavLink>
    </>

    return (
        <div className="lg:flex lg:mt-0 mt-10">
            <div>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Dashboard</label>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content lg:pt-20">
                            {/* Sidebar content here */}
                            {dashBoardOptions}
                        </ul>

                    </div>
                </div>
            </div>

            <div className="lg:w-full lg:mx-20 my-20">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;