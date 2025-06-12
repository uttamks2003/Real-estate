// Logout.js
import { useDispatch } from "react-redux";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice.js";

export default function Logout() {
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };

  return (
    <span
      onClick={handleSignOut}
      className="block p-2 md:p-3 bg-gray-600 text-white rounded-lg text-center cursor-pointer hover:bg-gray-700 transition"
    >
      Logout
    </span>
  );
}
