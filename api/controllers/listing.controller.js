import { query } from "express";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
export const createListing = async (req , res , next)=>{
    try {
        const listing = await Listing.create(req.body);
        return res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}
export const deleteListing = async (req , res, next)=>{
    console.log(req.params.name);
    try{
        const listing = await Listing.findById(req.params.id);
        if(listing.userRef != req.user.id) return next(errorHandler(401 , "You can only delete your own listings"));
        const result = await Listing.findByIdAndDelete(req.params.id);
        return res.status(200).json("Listing has been deleted");
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}
export const updateListing = async (req , res, next)=>{
    const listing = await Listing.findById(req.params.id);
    if(!listing) next(errorHandler(404 , "Listing Not found"));
    if(listing.userRef != req.user.id) return next(errorHandler(401 , "You can only update your own listings"));
    try{
        const updatedListing = await Listing.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        return res.status(200).json(updatedListing);
    }
    catch (error) {
        next(error);
    }
}
export const getListing = async (req , res, next)=>{
    try{
        const listing = await Listing.findById(req.params.id);
        if(!listing) return next(errorHandler(404 , "Listing Not found"));
        return res.status(200).json(listing);
    }
    catch (error) {
        next(error);
    }
}

export const getListings = async (req, res , next)=>{
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;
        if(offer === undefined || offer === 'false'){
            offer = {$in :[true , false]};
        }
        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [true, false] };
        }
        let parking = req.query.parking;
        if (parking === undefined || parking === 'false') {
            parking = { $in: [true, false] };
        }
        let type = req.query.type;
        if (type === undefined || type === 'all') {
            type = { $in: ['sale', 'rent'] };
        }
        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createAt';
        const order = req.query.order || 'desc';
        const listings = await Listing.find({
            name:{$regex:searchTerm, $options:'i'},
            offer,
            furnished,
            parking,
            type,
        }).sort(
            {[sort]:order}
            ).skip(startIndex).limit(limit);
        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
}