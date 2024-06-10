import { FaTrash, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxios from './../../../hooks/useAxios';

const ManageUsers = () => {
    const axiosSecure = useAxios();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const makeAdmin = user => {
        Swal.fire({
            title: `Are you sure to make ${user.name} an Admin?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make it!"
        })
            .then(res => {
                if (res.isConfirmed) {
                    axiosSecure.patch(`/users/admin/${user._id}`)
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                Swal.fire({
                                    icon: "success",
                                    title: `${user.name} is now an Admin`,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                refetch();
                            }
                        });
                }
            });
    };

    const makeAgent = user => {
        Swal.fire({
            title: `Are you sure to make ${user.name} an Agent?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make it!"
        })
            .then(res => {
                if (res.isConfirmed) {
                    axiosSecure.patch(`/users/agent/${user._id}`)
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                Swal.fire({
                                    icon: "success",
                                    title: `${user.name} is now an Agent`,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                refetch();
                            }
                        });
                }
            });
    };

    return (
        <div>
            <div className="lg:flex text-center items-center justify-evenly my-4">
                <h2 className="text-3xl font-semibold">All Users</h2>
                <h2 className="text-3xl font-semibold">Total Users : {users.length}</h2>
            </div>

            <div className="my-12">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Agent</th>
                                <th>ID</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.photoURL} alt={user.name} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="font-semibold">{user.name}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="">{user.email}</div>
                                        </div>
                                    </td>
                                    <td>
                                        {user.role === 'admin' ? (
                                            <span className="text-green-600 font-semibold">Admin</span>
                                        ) : (
                                            <button
                                                onClick={() => makeAdmin(user)}
                                                className="btn btn-warning text-white"
                                                disabled={user.role === 'agent'}
                                            >
                                                <FaUser />
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        {user.role === 'agent' ? (
                                            <span className="text-green-600 font-semibold">Agent</span>
                                        ) : (
                                            <button
                                                onClick={() => makeAgent(user)}
                                                className="btn btn-warning text-white"
                                                disabled={user.role === 'admin'}
                                            >
                                                <FaUser />
                                            </button>
                                        )}
                                    </td>
                                    <td>{user._id}</td>
                                    <td>
                                        <button className="btn btn-error text-white"><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
