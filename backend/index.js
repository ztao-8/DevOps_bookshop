import express  from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST || "mysql",
    user: process.env.DB_USER || "user",
    password: process.env.DB_PASSWORD || "temporary_password",
    database: process.env.DB_NAME || "golinksdb",
    port: 3306
})

app.use(express.json())//return json data using the api server postman


// const allowedOrigins = ["https://bestziyu.xyz", "http://localhost:3000", "https://rc.bestziyu.xyz"];
//
//
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, origin); // ✅ 允许前端请求
//         } else {
//             callback(new Error("Not allowed by CORS")); // ❌ 拒绝
//         }
//     },
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"]
// };
const corsOptions = {
    origin: ["https://bestziyu.xyz", "https://rc.bestziyu.xyz","http://localhost:3000"], // ✅ 允许特定域名
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // ✅ 允许携带 Cookie 或者身份验证信息
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

app.get("/", (req,res)=>{
    res.json("Hello World from the backend!!!")
})

//postman -> get method  http://localhost:8800/books
app.get("/books", (req,res)=>{
    const query = "SELECT * FROM books"
    db.query(query, (err,data)=>{
          if(err) return res.json(err)
          return res.json(data)
    })
  })


  //postman ---> post method
  //json body bellow
  //----------------------------- http://localhost:8800/books
  //{
// "title": "title from client",
// "description": "description from client",
// "cover": "cover from client"
// }

  app.post("/books", (req,res)=>{
    const query = "INSERT INTO books (`title`, `description`, `price`, `cover`) VALUES (?)"
    const values = [
       req.body.title,
       req.body.description,
       req.body.price,
       req.body.cover
    ]

    db.query(query, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.status(201).json("Book has been created successfully!!!")
    })
  })

  app.delete("/books/:id", (req,res)=>{
      const bookID = req.params.id
      const query = "DELETE FROM books WHERE id = ?"

      db.query(query, [bookID], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Book has been deleted successfully!!!")
      } )
  })

  app.put("/books/:id", (req,res)=>{
    const bookID = req.params.id
    const query = "UPDATE books SET `title`= ?, `description`= ?, `price`= ?, `cover`= ? WHERE id = ?";

    const values = [
      req.body.title,
      req.body.description,
      req.body.price,
      req.body.cover
    ]

    db.query(query, [...values, bookID], (err, data)=>{
      if(err) return res.json(err)
      return res.json("Book has been updated successfully!!!")
    } )
})

app.listen(8800, "0.0.0.0",()=>{
    console.log("Connect to the backend!!!!")
})

//npm start