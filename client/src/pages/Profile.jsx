import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PersonalDetails from "../components/PersonalDetails";
import ShowListings from "../components/ShowListings";
import DeleteAccount from "../components/DeleteAccount";
import Logout from "../components/Logout";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [activeComponent, setActiveComponent] = useState("PersonalDetails");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "PersonalDetails":
        return <PersonalDetails currentUser={currentUser} />;
      case "ShowListings":
        return <ShowListings userId={currentUser._id} />;
      case "DeleteAccount":
        return <DeleteAccount currentUser={currentUser} />;
      case "Logout":
        return <Logout />;
      default:
        return <PersonalDetails currentUser={currentUser} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar Navigation */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 md:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={handleToggleSidebar}
      ></div>
      <div
        className={`w-full md:w-64 h-full bg-gray-100 p-4 shadow-lg md:sticky md:top-0 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Profile Menu</h2>
        <ul className="flex flex-col gap-4">
          {[
            {
              label: "Update Profile",
              value: "PersonalDetails",
              color: "blue",
            },
            { label: "Show Listings", value: "ShowListings", color: "green" },
            { label: "Delete Account", value: "DeleteAccount", color: "red" },
            { label: "Sign Out", value: "Logout", color: "red" },
          ].map((item) => (
            <li key={item.value}>
              <button
                onClick={() => {
                  setActiveComponent(item.value);
                  handleToggleSidebar();
                }}
                className={`block w-full p-3 bg-${item.color}-600 text-white rounded-lg text-center hover:bg-${item.color}-700 transition`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">{renderComponent()}</div>

      {/* Hamburger Menu Button for Mobile */}
      <button
        onClick={handleToggleSidebar}
        className="md:hidden fixed top-4 right-4 p-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-600 transition"
      >
        {isSidebarOpen ? "Close" : "Menu"}
      </button>
    </div>
  );
}

// import { useSelector } from "react-redux";
// import { useRef, useState, useEffect } from "react";
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";
// import { app } from "../firebase.js";
// import {
//   updateUserStart,
//   updateUserSuccess,
//   updateUserFailure,
//   DeleteAccountFailure,
//   DeleteAccountSuccess,
//   DeleteAccountStart,
//   signOutUserStart,
//   signOutUserSuccess,
//   signOutUserFailure,
// } from "../redux/user/userSlice.js";
// import { useDispatch } from "react-redux";
// import {Link, useNavigate} from 'react-router-dom'

// // firebase storage rules-
// //       allow read;
// //       allow write : if
// //       request.resource.size < 2*124*1024 &&
// //       request.resource.contentType.matches('image/.*')
// export default function Profile() {
//   const fileRef = useRef(null);
//   const navigate = useNavigate()
//   const { currentUser, loading, error } = useSelector((state) => state.user);
//   const [file, setFile] = useState(undefined);
//   const [filePerc, setFilePerc] = useState(0);
//   const [fileUploadError, setFileUploadError] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [updateSuccess , setUpdateSuccess] = useState(false);
//   const dispatch = useDispatch();
//   const [userListings , setUserListings] = useState({});
//   const [showListingsError, setShowListingsError] = useState(false);
//   const [getUserError , setGetUserError] = useState(false);
//   useEffect(() => {
//     if(fileUploadError) setFileUploadError(false);
//     if (file) {
//       handelFileUpload(file);
//     }
//   }, [file]);
//   const handelFileUpload = (file) => {
//     if (file.size > 2 * 1024 * 1024) {
//       setFileUploadError(true);
//       return;
//     }
//     const storage = getStorage(app);
//     const fileName = new Date().getTime() + file.name;
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, file);
//     uploadTask.on("state_changed", (snapshot) => {
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       setFilePerc(Math.round(progress));
//     },
//     (error) => {
//       setFileUploadError(true);
//     },
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref).then
//       ((downloadURL) => {
//         setFormData({ ...FormData, avatar: downloadURL });
//       });
//     }
//     )
//   };
//   const handleChange = (e) =>{
//     setFormData({...formData, [e.target.id]:e.target.value});
//   };
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         setGetUserError(false);
//         const res = await fetch(`/api/user/${currentUser._id}`);
//         const data = await res.json();
//         if (data.success == false) {
//           setGetUserError(true);
//           return ;
//         }
//         setGetUserError(false);
//         setFormData(data);
//       } catch (error) {
//         setGetUserError(error);
//         console.log(error);
//       }
//     };
//     fetchUserData();
//   }, []);
//   const handleSubmit = async (e) =>{
//     e.preventDefault();
//     try {
//       dispatch(updateUserStart());
//       const res = await fetch(`/api/user/update/${currentUser._id}` , {
//         method:"POST",
//         headers:{
//           "Content-Type":"application/json",
//         },
//         body:JSON.stringify(formData),
//         });
//         const data = await res.json();

//         if(data.success ==  false){
//           dispatch(updateUserFailure(data.message));
//           return ;
//         }
//         dispatch(updateUserSuccess(data));
//         setUpdateSuccess(true);
//     } catch (error) {
//       dispatch(updateUserFailure(error.message));
//     }

//   }
//   const handleDeleteAccount = async ()=>{
//     try {
//       dispatch(DeleteAccountStart())
//       const res = await fetch(`/api/user/delete/${currentUser._id}` , {
//         method:"DELETE",
//         headers:{
//           "Content-Type":"application/json",
//         },
//         });
//         const data = await res.json();
//         if(data.success ==  false){
//           dispatch(DeleteAccountFailure(data.message));
//           return ;
//         }
//         dispatch(DeleteAccountSuccess(data));
//         setUpdateSuccess(true);
//     } catch (error) {
//       dispatch(DeleteAccountFailure(error.message));
//     }
//   }
//   const handleSignOut = async () => {
//     try {
//       dispatch(signOutUserStart())
//       const res = await fetch('/api/auth/signout');
//       const data = await res.json();
//       if(data.success == false) {
//         dispatch(signOutUserFailure(data.message));
//         return ;
//       }
//       dispatch(signOutUserSuccess(data));
//     } catch (error) {
//       dispatch(signOutUserFailure(data.message));
//     }
//   };
//   const handleListings = async () =>{
//     try {
//       setShowListingsError(false);
//       const res = await fetch(`/api/user/listings/${currentUser._id}`);
//       const data = await res.json();
//       if(data.success == false){
//         setShowListingsError(true);
//         return ;
//       }
//       setUserListings(data);
//       console.log(data);
//     } catch (error) {
//       setShowListingsError(true);
//     }
//   }
//   const handleDeleteListing = (listingId)=>{
//     // console.log(listingId);
//     return async ()=>{
//       try {
//         setShowListingsError(false);
//         const res = await fetch(`/api/listing/delete/${listingId}`, {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//           const data = await res.json();
//           if(data.success ==  false){
//             console.log(data.message);
//             return ;
//           }
//           handleListings();
//       } catch (error) {
//         console.log(error);
//         setShowListingsError(true);
//       }
//     }
//   }
//   return (
//     <div className="flex flex-col md:flex-row">
//       {/* Left Side Navigation */}
//       <div className="w-full md:w-64 h-screen bg-gray-100 p-4 shadow-lg md:sticky md:top-0">
//         <h2 className="text-xl md:text-2xl font-semibold mb-4">Profile Menu</h2>
//         <ul className="flex flex-col gap-3">
//           <li>
//             <Link
//               to="/update-profile"
//               className="block p-2 md:p-3 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition"
//             >
//               Update Profile
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/create-listing"
//               className="block p-2 md:p-3 bg-green-600 text-white rounded-lg text-center hover:bg-green-700 transition"
//             >
//               Create Listing
//             </Link>
//           </li>
//           <li>
//             <span
//               onClick={handleDeleteAccount}
//               className="block p-2 md:p-3 bg-red-600 text-white rounded-lg text-center cursor-pointer hover:bg-red-700 transition"
//             >
//               Delete Account
//             </span>
//           </li>
//           <li>
//             <span
//               onClick={handleSignOut}
//               className="block p-2 md:p-3 bg-red-600 text-white rounded-lg text-center cursor-pointer hover:bg-red-700 transition"
//             >
//               Sign Out
//             </span>
//           </li>
//         </ul>
//       </div>

//       {/* Profile Content */}
//       <div className="flex-1 p-4 md:p-6 bg-white">
//         <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
//           Profile
//         </h1>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input
//             onChange={(e) => setFile(e.target.files[0])}
//             type="file"
//             ref={fileRef}
//             hidden
//             accept="image/*"
//           />
//           <div className="flex flex-col items-center">
//             <img
//               onClick={() => fileRef.current.click()}
//               src={formData.avatar || currentUser.avatar}
//               alt="Profile Avatar"
//               className="rounded-full h-24 w-24 md:h-28 md:w-28 object-cover cursor-pointer border-2 border-gray-300 shadow-md hover:border-gray-500 transition-all"
//             />
//             <p className="text-xs md:text-sm mt-1">
//               {fileUploadError ? (
//                 <span className="text-red-600">
//                   Error: Image must be less than 2MB
//                 </span>
//               ) : filePerc > 0 && filePerc < 100 ? (
//                 <span className="text-gray-600">{`Uploading ${filePerc}%`}</span>
//               ) : filePerc === 100 && !fileUploadError ? (
//                 <span className="text-green-600">
//                   Image Uploaded Successfully
//                 </span>
//               ) : (
//                 ""
//               )}
//             </p>
//           </div>
//           <input
//             type="text"
//             placeholder="Username"
//             className="border p-2 md:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             defaultValue={formData.username}
//             id="username"
//             onChange={handleChange}
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             className="border p-2 md:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             defaultValue={formData.email}
//             id="email"
//             onChange={handleChange}
//           />
//           <button
//             disabled={loading}
//             className="bg-blue-600 text-white rounded-lg p-2 md:p-4 uppercase hover:bg-blue-700 disabled:opacity-50 transition"
//           >
//             {loading ? "Loading..." : "Update"}
//           </button>
//         </form>
//         <p className="text-red-600 mt-2">{error ? error : ""}</p>
//         <p className="text-green-600 mt-2">
//           {updateSuccess ? "User Updated Successfully" : ""}
//         </p>
//         <button
//           onClick={handleListings}
//           className="text-blue-600 w-full mt-2 md:mt-4 cursor-pointer py-2 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
//         >
//           Show Listings
//         </button>
//         {showListingsError && (
//           <p className="text-red-600">Error fetching listings</p>
//         )}
//         {userListings && userListings.length === 0 && (
//           <p className="text-red-600">No Listings found</p>
//         )}
//         {userListings && userListings.length > 0 && (
//           <div className="flex flex-col gap-4 mt-4">
//             <h1 className="text-xl md:text-2xl font-semibold text-center">
//               Your Listings
//             </h1>
//             {userListings.map((listing) => (
//               <div
//                 key={listing._id}
//                 className="flex border rounded-lg p-2 md:p-4 justify-between items-center gap-3 shadow-md hover:shadow-lg transition"
//               >
//                 <Link to={`/listing/${listing._id}`}>
//                   <img
//                     className="h-14 w-14 md:h-16 md:w-16 object-cover rounded-md"
//                     src={listing.imageUrls[0]}
//                     alt="Listing Cover"
//                   />
//                 </Link>
//                 <Link
//                   className="flex-1 font-semibold hover:underline truncate"
//                   to={`/listing/${listing._id}`}
//                 >
//                   <p>{listing.name}</p>
//                 </Link>
//                 <div className="flex flex-col gap-1 items-center">
//                   <button
//                     onClick={() => handleDeleteListing(listing._id)}
//                     className="text-red-600 uppercase hover:underline transition"
//                   >
//                     Delete
//                   </button>
//                   <Link to={`/update-listing/${listing._id}`}>
//                     <button className="text-green-600 uppercase hover:underline transition">
//                       Edit
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
