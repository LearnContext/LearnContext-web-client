import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Loading } from "../../UI/Loading";

export const AdminUsers = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const { authorizationToken } = useAuth();

    const getAllUserData = async () => {
        try {
            const URL = `${BASE_URL}/api/admin/users`;
            const response = await axios(URL, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });

            // console.log("users: ", response.data);
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    // delete the user on delete button
    const deleteUser = async (id) => {
        setLoading(true);
        try {
            const URL = `${BASE_URL}/api/admin/users/delete/${id}`;
            const response = await axios(URL, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                }
            });

            console.log("users after delete: ", response.data);

            if (response.status === 200) {
                toast.success("Deleted Successfully")
                getAllUserData();
            } else {
                toast.warning("Not Deleted");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllUserData();
    }, [])

    return <>
        <section className="w-full max-h-screen overflow-auto ~p-4/12">
            <p className=" ~text-lg/xl font-semibold pb-4">Admin User Data</p>
            <div className="overflow-scroll h-lvh">
                {
                    loading ? <Loading/> : (
                        <table className="table-auto w-96 border-collapse ~text-xs/lg">
                            <thead className="border-2">
                                <tr className="text-left text-nowrap">
                                    <th className="border p-2">Userame</th>
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Email</th>
                                    <th className="border p-2">Phone</th>
                                    <th className="border p-2">Update</th>
                                    <th className="border p-2">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((currUser, index) => {
                                    const { _id, fullname, username, email, phone } = currUser;
                                    return (<tr key={index} className="text-left">
                                        <td className="border p-2">{username}</td>
                                        <td className="border p-2">{fullname}</td>
                                        <td className="border p-2">{email}</td>
                                        <td className="border p-2">{phone}</td>
                                        <td className="border p-2">
                                            <Link to={`/admin/users/${_id}/edit`} className="bg-special_blue hover:bg-blue-600 text-white px-2 py-1 rounded">Edit</Link>
                                        </td>
                                        <td className="border p-2">
                                            <button onClick={() => deleteUser(_id)} className="bg-red-500  hover:bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                                        </td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    )
                }
            </div>
        </section>
    </>
}