const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 6500;
const saltRounds = 10;

// Middleware
app.use(cors({
    origin: [process.env.URL],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
const uri = `mongodb+srv://sohanurrahmanabir:${process.env.Password}@cluster0.ryt44.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

async function connectDB() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
        console.log("Connected to MongoDB");
    }
}

const database = client.db("Book-Store");
const Users = database.collection("Users");
const BookInfo = database.collection("Book_info");

// JWT Verification Middleware
const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) return res.status(401).send({ message: 'Token Not Found' });
    
    jwt.verify(token, process.env.SECRET, (err, decode) => {
        if (err) return res.status(401).send({ error: err.message });
        req.user = decode;
        next();
    });
};

// Routes
app.get('/', (req, res) => res.send('hello'));

app.post('/verify', (req, res) => {
    jwt.verify(req.body.token, process.env.SECRET, (err, decoded) => {
        res.send(decoded || { error: err?.message });
    });
});

app.post('/signup', async (req, res) => {
    try {
        await connectDB();
        const user = req.body;
        user.password = await bcrypt.hash(user.password, saltRounds);
        const result = await Users.insertOne(user);
        res.status(201).send(result.acknowledged ? { user, result } : { error: 'Error creating user' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        await connectDB();
        const user = await Users.findOne({ email: req.body.email });
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(401).send({ message: "Invalid email or password" });
        }
        const token = jwt.sign(req.body, process.env.SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: true }).status(201).send({ user });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.post('/wishlist', async (req, res) => {
    try {
        await connectDB();
        const { book, _id } = req.body;
        const user = await Users.findOne({ _id: new ObjectId(_id) });
        if (!user) return res.status(404).send({ message: 'User not found' });
        
        if (user.wishlist?.[book._id] || user.readlist?.[book._id]) {
            return res.status(203).send({ message: 'Book already in wishlist or readlist' });
        }
        
        const update = { $set: { [`wishlist.${book._id}`]: book } };
        await Users.updateOne({ _id: new ObjectId(_id) }, update);
        res.status(201).send({ message: 'Added to Wishlist' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.post('/readlist', async (req, res) => {
    try {
        await connectDB();
        const { book, _id } = req.body;
        const user = await Users.findOne({ _id: new ObjectId(_id) });
        if (!user) return res.status(404).send({ message: 'User not found' });

        if (user.readlist?.[book._id]) {
            return res.status(203).send({ message: 'Already in Readlist' });
        }

        const update = { $set: { [`readlist.${book._id}`]: book } };
        await Users.updateOne({ _id: new ObjectId(_id) }, update);
        res.status(201).send({ message: 'Added to Readlist' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get('/get-books/:type/:id', async (req, res) => {
    try {
        await connectDB();
        const { type, id } = req.params;
        const user = await Users.findOne({ _id: new ObjectId(id) }, { projection: { [type]: 1 } });
        res.status(200).send({ books: user?.[type] || {} });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get('/book-list', async (req, res) => {
    try {
        await connectDB();
        const books = await BookInfo.find({}, { sort: { totalPages: 1 } }).toArray();
        res.status(200).send({ data: books });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
