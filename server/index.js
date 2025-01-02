require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://assignment-11-batch-10.netlify.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: "UnAuthorized Access" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).send({ message: "UnAuthorized Access" });
    }

    req.user = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@programmershakib.sm4uc.mongodb.net/?retryWrites=true&w=majority&appName=programmershakib`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );

    const userCollection = client.db("usersDB").collection("users");
    const questionCollection = client.db("booksDB").collection("questions");
    const bookCollection = client.db("booksDB").collection("books");
    const academicBookCollection = client
      .db("booksDB")
      .collection("academicBooks");
    const borrowCollection = client.db("booksDB").collection("borrows");

    // jwt
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    };

    app.post("/jwt", async (req, res) => {
      const email = req.body;

      const token = jwt.sign(email, process.env.SECRET_KEY, {
        expiresIn: "10d",
      });
      res.cookie("token", token, cookieOptions).send({ success: true });
    });

    app.post("/signOut", async (req, res) => {
      res
        .clearCookie("token", { ...cookieOptions, maxAge: 0 })
        .send({ success: true });
    });

    // books
    app.get("/all-books", verifyToken, async (req, res) => {
      const { showAvailable } = req.query;

      let filter = {};

      if (showAvailable === "true") {
        filter.quantity = { $gt: 0 };
      }

      const result = await bookCollection.find(filter).toArray();
      res.send(result);
    });

    app.get("/gift-books", async (req, res) => {
      const result = await bookCollection
        .find()
        .sort({ _id: -1 })
        .limit(5)
        .toArray();
      res.send(result);
    });

    app.get("/category/:category", verifyToken, async (req, res) => {
      const category = req.params.category;

      const { source } = req.query;

      const filter = { category: category };

      if (source === "available") {
        filter.quantity = { $gt: 0 };
      }

      const result = await bookCollection.find(filter).toArray();
      res.send(result);
    });

    app.get("/book/:id", verifyToken, async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await bookCollection.findOne(query);
      res.send(result);
    });

    app.post("/add-book", verifyToken, async (req, res) => {
      const newBook = req.body;

      const result = await bookCollection.insertOne(newBook);
      res.send(result);
    });

    app.patch("/book/:id", verifyToken, async (req, res) => {
      const id = req.params.id;

      const filter = { _id: new ObjectId(id) };

      const updatedBook = {
        $set: {
          name: req.body.name,
          author: req.body.author,
          image: req.body.image,
          rating: req.body.rating,
          category: req.body.category,
        },
      };

      const result = await bookCollection.updateOne(filter, updatedBook);
      res.send(result);
    });

    // academic book
    app.get("/all-academic-books", verifyToken, async (req, res) => {
      const result = await academicBookCollection.find().toArray();
      res.send(result);
    });

    app.get("/academic-books", async (req, res) => {
      const result = await academicBookCollection
        .find()
        .sort({ _id: -1 })
        .limit(5)
        .toArray();
      res.send(result);
    });

    app.get("/academic-book/:id", verifyToken, async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await academicBookCollection.findOne(query);
      res.send(result);
    });

    app.post("/add-academic-book", verifyToken, async (req, res) => {
      const newBook = req.body;

      const result = await academicBookCollection.insertOne(newBook);
      res.send(result);
    });

    app.patch("/academic-book/:id", verifyToken, async (req, res) => {
      const id = req.params.id;

      const filter = { _id: new ObjectId(id) };

      const updatedBook = {
        $set: {
          name: req.body.name,
          class_name: req.body.class_name,
          image: req.body.image,
          year: req.body.year,
          source: req.body.source,
        },
      };

      const result = await academicBookCollection.updateOne(
        filter,
        updatedBook
      );
      res.send(result);
    });

    // borrows
    app.get("/borrow/:email", verifyToken, async (req, res) => {
      const email = req.params.email;

      const decodedEmail = req.user?.email;
      if (decodedEmail !== email) {
        return res.status(401).send({ message: "unauthorized access" });
      }

      const query = { email: email };

      const result = await borrowCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/gifted-book/:email", verifyToken, async (req, res) => {
      const email = req.params.email;

      const decodedEmail = req.user?.email;
      if (decodedEmail !== email) {
        return res.status(401).send({ message: "unauthorized access" });
      }

      const query = { sender_mail: email };

      const result = await borrowCollection.find(query).toArray();

      res.send(result);
    });

    app.post("/add-borrow", verifyToken, async (req, res) => {
      const borrowInfo = req.body;

      const { email } = borrowInfo;

      const userBorrowedBooks = await borrowCollection
        .find({ email })
        .toArray();

      if (userBorrowedBooks.length >= 3) {
        return res.send({
          status: false,
          message: "You can borrow up to 3 books only",
        });
      }

      const query = {
        email: borrowInfo.email,
        bookId: borrowInfo.bookId,
      };

      const existingBorrow = await borrowCollection.findOne(query);
      if (existingBorrow) {
        return res.send({
          status: false,
          message: "You cannot borrow the same book without returning it first",
        });
      }

      const result = await borrowCollection.insertOne(borrowInfo);
      const filter = { _id: new ObjectId(borrowInfo.bookId) };
      const update = {
        $inc: { quantity: -1 },
      };

      await bookCollection.updateOne(filter, update);
      res.send(result);
    });

    app.delete("/borrow/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const bookId = req.query.bookId;

      const filter = { _id: new ObjectId(bookId) };
      const update = {
        $inc: { quantity: 1 },
      };

      await bookCollection.updateOne(filter, update);
      const query = { _id: new ObjectId(id) };
      const result = await borrowCollection.deleteOne(query);
      res.send(result);
    });

    // users
    app.post("/user", async (req, res) => {
      const newUser = req.body;

      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    app.patch("/user/login", async (req, res) => {
      const email = req.body.email;

      const filter = { email };
      const updatedUser = {
        $set: {
          lastSignInTime: req.body.lastSignInTime,
        },
      };
      const result = await userCollection.updateOne(filter, updatedUser);
      res.send(result);
    });

    app.patch("/user", verifyToken, async (req, res) => {
      const email = req.body.email;

      const filter = { email };
      const updatedUser = {
        $set: {
          name: req.body.name,
          photo: req.body.photo,
        },
      };
      const result = await userCollection.updateOne(filter, updatedUser);
      res.send(result);
    });

    app.delete("/user/:email", verifyToken, async (req, res) => {
      const email = req.params.email;

      const result = await userCollection.deleteOne({ email });
      res.send(result);
    });

    // questions
    app.post("/question", verifyToken, async (req, res) => {
      const question = req.body;

      const result = await questionCollection.insertOne(question);
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("assignment 11 is running");
});

app.listen(port, () => {
  console.log(`assignment 11 is running on port ${port}`);
});
