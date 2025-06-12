// DeleteUser.js
import { useDispatch } from "react-redux";
// import {
//   deleteUserStart,
//   deleteUserSuccess,
//   deleteUserFailure,
// } from "../redux/user/userSlice.js";

export default function DeleteUser({ currentUser }) {
  // const dispatch = useDispatch();

  const handleDeleteUser = async () => {
    try {
      // dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success === false) {
        // dispatch(deleteUserFailure(data.message));
        return;
      }
      alert("User Deleted Successfully");
      // dispatch(deleteUserSuccess(data));
    } catch (error) {
      console.log(error);
      // dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <span
      onClick={handleDeleteUser}
      className="block p-2 md:p-3 bg-red-600 text-white rounded-lg text-center cursor-pointer hover:bg-red-700 transition"
    >
      Delete Account
    </span>
  );
}
