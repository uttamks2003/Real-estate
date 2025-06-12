import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";



export default function ShowListings() {
  const { currentUser } = useSelector((state) => state.user);
  const [userListings, setUserListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);
  const [fetchingListing, setFetchingListing] = useState(false);
  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        setShowListingsError(false);
        setFetchingListing(true);
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        setFetchingListing(false);
        if (data.success == false) {
          setShowListingsError(true);
          return;
        }

        setUserListings(data);
      } catch (error) {
        setShowListingsError(true);
      }
    };

    fetchUserListings();
  }, [currentUser]);

  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!data.success) {
        console.log(data.message);
        return;
      }

      // Refresh listings after deletion
      alert("Listing Deleted Successfully");
      setUserListings((prevListings) =>
        prevListings.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      setShowListingsError(true);
    }
  };

  return (
    <div className="flex flex-col p-4 bg-white">
      <h1 className="text-xl md:text-2xl font-semibold text-center mb-4">
        Your Listings
      </h1>
      {fetchingListing && <Loader />}

      {!fetchingListing &&
        !showListingsError &&
        userListings &&
        userListings.length === 0 && (
          <p className="text-red-600">No Listings found</p>
        )}
      {!fetchingListing &&
        !showListingsError &&
        userListings &&
        userListings.length > 0 && (
          <div className="flex flex-col gap-4">
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className="flex border rounded-lg p-2 md:p-4 justify-between items-center gap-3 shadow-md hover:shadow-lg transition"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    className="h-14 w-14 md:h-16 md:w-16 object-cover rounded-md"
                    src={listing.imageUrls[0]}
                    alt="Listing Cover"
                  />
                </Link>
                <Link
                  className="flex-1 font-semibold hover:underline truncate"
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>
                <div className="flex flex-col gap-1 items-center">
                  <button
                    onClick={() => handleDeleteListing(listing._id)}
                    className="text-red-600 uppercase hover:underline"
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    {" "}
                    <button className="text-green-600 uppercase hover:underline transition">
                      Edit{" "}
                    </button>{" "}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      {!fetchingListing && showListingsError && (
        <p className="text-red-600">Error fetching listings</p>
      )}
    </div>
  );
}
