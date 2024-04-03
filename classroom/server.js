const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("require-session");
// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie", (req, res) => {
//   res.cookie("made-in", "India", { signed: true });
//   res.send("SIgned cookie Send");
// });

// app.get("/verify", (req, res) => {
//   console.log(req.signedCookies);
//   res.send("verified");
// });

// app.get("/getcookies", (req, res) => {
//   res.cookie("greet", "hello");
//   res.cookie("Madein", "India");
//   res.send("Sent you some cookies");
// });

// app.get("/greet", (req, res) => {
//   let { name = "anonymous" } = req.cookies;
//   res.send(`Hello, I am ${name}`);
// });

// app.get("/", (req, res) => {
//   console.dir(req.cookies);
//   res.send("Hi I am Root");
// });

// app.use("/users", users);
// app.use("/posts", posts);

app.use(session({ secret: "mysupersecretstring" }));

app.get("/test", (req, res) => {
  res.send("test successful!");
});

app.listen(3000, () => {
  console.log("Server is listening to 3000");
});
