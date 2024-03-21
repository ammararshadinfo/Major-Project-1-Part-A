const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
const ejsMate=require("ejs-mate");

async function main(){
    await mongoose.connect(MONGO_URL);
}
app.use(express.json());
main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("Hi I am Root");
});

//Index Route
app.get("/listings", async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

//Create Route

app.post("/listings", async (req,res)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
console.log(newListing);
    res.redirect("/listings");
});

//New Route

app.get("/listings/new",(req, res)=>{
    res.render("listings/new.ejs");
});

//SHow Route

app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
    console.log(listing);
});
//edit route

app.get("/listings/:id/edit", async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

//Update Route

app.put("/listings/:id", async (req,res)=>{
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
res.redirect(`/listings/${id}`);
});

//Delete Route

app.delete("/listings/:id", async (req, res)=>{
    let {id}=req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})

// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"My New Villa",
//         description:"by the Beach",
//         price:1200,
//         location:"Calangute, Goa",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("successful Testing");
// });

app.listen(8080, ()=>{
    console.log("Server is listening to Port");
});