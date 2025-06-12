import { useState, useEffect, useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice.js";

export default function PersonalDetails({ currentUser }) {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false); // Define loading state

  useEffect(() => {
    // Fetch initial data for the form
    setFormData(currentUser);
  }, [currentUser]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    if (file.size > 2 * 1024 * 1024) {
      setFileUploadError(true);
      return;
    }
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    } finally {
      setLoading(false); // Reset loading state after the operation
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="text-2xl font-bold">Personal Details</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <div className="flex flex-col items-center">
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="Profile Avatar"
            className="rounded-full h-24 w-24 object-cover cursor-pointer border-2 border-gray-300 shadow-md hover:border-gray-500 transition-all"
          />
          <p className="text-xs mt-1">
            {fileUploadError ? (
              <span className="text-red-600">
                Error: Image must be less than 2MB
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-gray-600">{`Uploading ${filePerc}%`}</span>
            ) : (
              ""
            )}
          </p>
        </div>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          defaultValue={formData.username}
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          defaultValue={formData.email}
          id="email"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-blue-600 text-white rounded-lg p-2 uppercase hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
    </>
  );
}
