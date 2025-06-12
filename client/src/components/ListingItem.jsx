import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div
      className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm 
        hover:shadow-lg transition-shadow duration-300 overflow-hidden 
        w-full sm:w-[330px]"
    >
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover 
            hover:scale-105 transition-transform duration-300"
        />
        <div className="p-4 flex flex-col gap-3 w-full">
          <p className="truncate text-xl font-semibold text-gray-800">
            {listing.name}
          </p>
          <div className="flex items-center gap-2">
            <MdLocationOn className="h-5 w-5 text-green-600" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="line-clamp-2 text-sm text-gray-600">
            {listing.description}
          </p>
          <p className="text-lg font-semibold text-gray-700 mt-2">
            $
            {listing.offer
              ? listing.discountedPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" ? " / Month" : ""}
          </p>
          <div className="flex gap-4 text-gray-700">
            <div className="text-sm font-medium">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Beds`
                : `${listing.bedrooms} Bed`}
            </div>
            <div className="text-sm font-medium">
              {listing.bothrooms > 1
                ? `${listing.bothrooms} Bathrooms`
                : `${listing.bothrooms} Bathroom`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
