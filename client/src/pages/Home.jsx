import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, Pagination, Keyboard } from "swiper/modules";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import Loader from "../components/Loader";

export default function Home() {
  SwiperCore.use([Autoplay, Pagination, Keyboard]);

  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchListings = async (type) => {
      try {
        const res = await fetch(`/api/listing/get?${type}&limit=4`);
        return await res.json();
      } catch (error) {
        console.error(error);
        return [];
      }
    };

    const fetchAllListings = async () => {
      const offers = await fetchListings("offer=true");
      const rents = await fetchListings("type=rent");
      const sales = await fetchListings("type=sale");

      setOfferListings(offers);
      setRentListings(rents);
      setSaleListings(sales);
      setLoading(false); // Set loading to false once data is fetched
    };

    fetchAllListings();
  }, []);

  // If the data is still loading, show the Loader component
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto py-10 px-4 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-800">
          Find your next perfect place with ease
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          ApnaGhar is the best place to find your next perfect place to live. We
          have a wide range of properties for you to choose from.
        </p>
        <Link
          className="inline-block mt-6 text-green-500 font-semibold text-lg hover:underline"
          to="/search"
        >
          Let's get started
        </Link>
      </header>

      {/* Image Carousel */}
      <Swiper
        loop
        speed={500}
        keyboard
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="h-[500px]"
      >
        {offerListings.map((listing) => (
          <SwiperSlide key={listing._id}>
            <div
              style={{
                backgroundImage: `url(${listing.imageUrls[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="h-full w-full flex items-center justify-center"
            >
              <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center">
                <h1 className="text-white text-3xl lg:text-5xl font-bold">
                  Discover Your Dream Home
                </h1>
                <p className="text-white text-lg mt-2">
                  Exclusive offers waiting for you!
                </p>
                <Link
                  className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  to="/search"
                >
                  View Listings
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Listings Section */}
      <div className="max-w-6xl mx-auto p-6 flex flex-col gap-10 my-10">
        {/* Offer Listings */}
        {offerListings.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Recent Offers
              </h2>
              <Link
                className="text-sm text-blue-600 hover:underline"
                to="/search?offer=true"
              >
                Show more
              </Link>
            </div>
            <div className="flex flex-wrap gap-6">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Rent Listings */}
        {rentListings.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Recent Rent Listings
              </h2>
              <Link
                className="text-sm text-blue-600 hover:underline"
                to="/search?type=rent"
              >
                Show more
              </Link>
            </div>
            <div className="flex flex-wrap gap-6">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Sale Listings */}
        {saleListings.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Recent Sale Listings
              </h2>
              <Link
                className="text-sm text-blue-600 hover:underline"
                to="/search?type=sale"
              >
                Show more
              </Link>
            </div>
            <div className="flex flex-wrap gap-6">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
