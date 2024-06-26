const Listing = require("../models/listing")
const getGeocode = require("../utils/geocode");


module.exports.index = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};


module.exports.showListing = async (req, res) =>{
    let {id} = req.params;
    // console.log(state, " " , country);
    // let result = getGeocode(state, country);
    //console.log(result);
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews", 
            populate: {path: "author",
            },
        })
        .populate("owner");
    // const state = listing.location;
    // const country = listing.country;
    // console.log(`State: ${state}, Country: ${country}`);
    // let result = getGeocode(state, country);
    if(!listing){
      req.flash("error", "Listing view requested does not exist!");
      res.redirect("/listings");
    }
    
    // console.log(listing);
    res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async (req, res, next) => {
    let url =  req.file.path;
    let filename = req.file.filename;
    

    //let {title, description, image, price, country, location} = req.body;
      //let listing = req.body.listing;
      const newListing = new Listing(req.body.listing);
      newListing.owner = req.user._id;
      newListing.image = {url, filename};
      await newListing.save();
      console.log("added successfully");
      req.flash("success", "New Listing Created!");
      res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    console.log(id);
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error", "Listing view requested does not exist!");
      res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs", {listing, originalImageUrl});
};


module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    // typeof --- it checks defined or undefined
    if(typeof req.file !== "undefined"){
        let url =  req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};


module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};














