import express from "express";
import mysql from "mysql";
import cors from "cors";
import 'dotenv/config';
import e from "express"; 

// require("dotenv").config()

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME
});


// dkjs?dh?

const app = express();

//=================
//=================

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json("welcome to insta api");
});

// if any authentication error occurs or any fatal error then add below code
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_current_password';

app.get("/users", (req, res) => {
  const q = `SELECT * FROM users`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
}); 
 
app.get("/posts", (req, res) => {
  const q = `SELECT * FROM posts`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
})

app.get("/likes", (req, res) => {
  const q = `SELECT * FROM likes`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
})

app.get("/likecnt/:id", (req,res) => {
  const postId = req?.params?.id
  const q = `select count(postId) likecnt from likes where postId=${postId} group by postId;`
  // console.log(req.params,"req");
  // console.log(res,"res");
  db.query(q,(err,data)=>{
    if (err) return res.json(err);
    return res.json(data);
  })
})

app.post("/register", (req, res) => {
  const q = "INSERT INTO users (`username`,`email`, `password`) VALUES (?)";
  const values = [req.body.username, req.body.email, req.body.password];

  db.query(q, [values], (err, data) => {

    if (err) return res.json(err);
    // console.log(data);
    return res.send(data);
  });
});

app.post("/login", (req, res) => {
  const q = "SELECT * FROM users WHERE email =? AND password =?";
  const email = req.body.email;
  const password = req.body.password;

  db.query(q, [email, password], (err, data) => {
    if (err) {
      return res.send({ err: err });
    }

    if (data.length > 0) {
      res.send({ data, message: "Logged in successfully" });
    } else {
      res.send({ message: "Invalid Credentials" });
    }
  });
});

//Hello guys this is my first post on Instagram.
app.post("/createpost", (req, res) => { 
  console.log(req)
  const q = "INSERT INTO posts (`post_img`,`post_desc`,`post_create_date`,`userId`) VALUES (?)";
  const values = [req.body.url, req.body.description,req.body.createdDate,req.body.userID];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.send(data);
  });
});
 
app.listen(process.env.PORT || 8000, () => {
  console.log("connected to the backend");
});

app.post("/likeclicked",(req,res)=>{
  const q = "INSERT INTO likes(`userId`,`postId`) VALUES(?)";
  const values = [req.body.userId,req.body.postId]
 
   db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.send(data);
  });
  // console.log(req);
}) 

app.post("/dislikeclicked",(req,res)=>{
  const q = `DELETE FROM likes where userId = ${req.body.userId} AND postId = ${req.body.postId}` ;
  // const values = [req.body.userId,req.body.userId]

   db.query(q, (err, data) => {
    if (err) return res.json(err);

    console.log(data);
    return res.send(data);
  });
  // console.log(req);
}) 

