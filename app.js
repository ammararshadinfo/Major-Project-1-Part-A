const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
async function main(){
    await mongoose.connect(MONGO_URL);
}
main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Hi I am Root");
});

//Index Route
app.get("/listings", async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

//New Route

app.get("/listings/new",(req, res)=>{
    res.render("/listings/new.ejs");
});

//SHow Route

app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});



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