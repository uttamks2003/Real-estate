import react from 'react'
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function CreateListing() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    sale: false,
    type: "rent",
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bothrooms: 1,
    regularPrice: 50000,
    discountedPrice: 45000,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setImageUploadError(false);
      setUploading(true);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 2 * 1024 * 1024) {
          setImageUploadError(`File ${files[i].name} is too large. Maximum allowed size is 2MB.`);
          setUploading(false);
          return;
        }
        const fileType = files[i].type;
        if (!['image/png', 'image/jpeg', 'image/jpg'].includes(fileType)) {
          setImageUploadError(`File ${files[i].name} is not a valid image type. Only png, jpg, and jpeg are allowed.`);
          setUploading(false)
          return;
        }
        promises.push(storeImage(files[i]));
      }
      Promise.allSettled(promises)
       .then((results) => {
          const successfulUploads = results
           .filter(result => result.status === "fulfilled")
           .map(result => result.value);
          const failedUploads = results
           .filter(result => result.status === "rejected");
  
          if (failedUploads.length > 0) {
            setImageUploadError(
              `Some images failed to upload. ${failedUploads.length} failed. Please ensure each image is less than 2MB and in png, jpg, or jpeg format.`
            );
          }
  
          setFormData({
           ...formData,
            imageUrls: formData.imageUrls.concat(successfulUploads),
          });
  
          setUploading(false);
        })
       .catch((error) => {
          setImageUploadError(`Image upload failed. Please try again. Error: ${error}`);
          setUploading(false);
        });
    } else if (files.length + formData.imageUrls.length > 6) {
      setImageUploadError(`You can upload up to 6 images per listing. You have already uploaded ${formData.imageUrls.length} images.`);
      setUploading(false);
    } else {
      setImageUploadError("Please select at least one image");
      setUploading(false);
    }
  };
  
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // Optional: handle upload progress
        },
        (error) => {
          reject(`Error uploading file ${file.name}: ${error.message}`);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.discountedPrice >= formData.regularPrice)
      return setError("Discounted Price must be less then regular Price");
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(false);
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Title"
            className="border
            p-3 rounded-lg"
            id="name"
            maxLength="100"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border
            p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border
            p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type == "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type == "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-5">
            <div className="flex items-center gap-2">
            <input
              type="text"
              id="bedrooms"
              className="p-3 border-gray-300 rounder-lg"
              pattern="[0-9]*"
              min="1"
              required
              onChange={handleChange}
              onKeyDown={(event) => {
                if (event.key < '0' || event.key > '9') {
                  event.preventDefault();
                }
              }}
              value={formData.bedrooms}
            />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="bothrooms"
                className="p-3 border-gray-300 rounder-lg"
                min="1"
                required
                onChange={handleChange}
                pattern="[0-9]*"
                onKeyDown={(event) => {
                  if (event.key < '0' || event.key > '9') {
                    event.preventDefault();
                  }
                }}
                value={formData.bothrooms}
              />
              <p>Bothrooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="regularPrice"
                className="p-3 border-gray-300 rounder-lg"
                min="5000"
                required
                onChange={handleChange}
                pattern="[0-9]*"
                onKeyDown={(event) => {
                  if (event.key < '0' || event.key > '9') {
                    event.preventDefault();
                  }
                }}
                value={formData.regularPrice}
              />
              <div className="flex flex-col item-center">
                <p>Regular Price</p>
                <span className="text-xs">
                  {formData.type === "rent" && " / Month"}
                </span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  id="discountedPrice"
                  className="p-3 border-gray-300 rounder-lg"
                  min="4500"
                  required
                  onChange={handleChange}
                  pattern="[0-9]*"
                  onKeyDown={(event) => {
                    if (event.key < '0' || event.key > '9') {
                      event.preventDefault();
                    }
                  }}
                  value={formData.discountedPrice}
                />
                <div>
                  <p className="flex flex-col item-center">Discounted Price</p>
                  <span className="text-xs">
                    {formData.type === "rent" && " / Month"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be cover (max - 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              multiple
              accept="image/*"
              id="images"
              className="border border-gray-300 p-3 rounded w-full"
              required
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 
              rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading.." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing"
                  className="w-24 h-24 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 "
          >
            {loading ? "Creating.." : "Create Listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
