const express = require('express');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 6500



// ______JWT_______

const jwt = require('jsonwebtoken')

// ______bcrypt_____________

const bcrypt = require('bcrypt')
const saltRounds = 10;

// _________middleware____________
const cors = require('cors')
const CookieParser = require('cookie-parser')
app.use(cors(
    {
        origin: ['https://book-store-mern-rouge.vercel.app','http://localhost:5173'],
        credentials: true
    }
))
app.use((express.json()))

app.use(CookieParser())



// _________middleware____________




// ____________________MongoDB Connection _________________________



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://sohanurrahmanabir:${process.env.Password}@cluster0.ryt44.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch {
        console.log("error")
    }

}

run();

const database = client.db("Book-Store");
const Users = database.collection("Users");
const BookInfo = database.collection("Book_info");


// ____________________MongoDB Connection _________________________


const verification_token = async (req, res, next) => {

    const token = req.cookies?.token

    if (token) {
        await jwt.verify(token, process.env.SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({
                    error: err
                })
            }
            req.user = decode
            next()

        }
        )

    }else{
        res.status(401).send({
            'message':'Token Not Found'
        })
    }


}

app.get('/hello',(req,res)=>{
    res.send('hello')
})
app.post('/hello', verification_token, (req, res) => {
    console.log(req.user)
})





// app.get('/jwt', (req, res) => {
//     const data = {
//         'name': 'Abir'
//     }
//     const token = jwt.sign(data, process.env.SECRET, {
//         expiresIn: '1h'
//     });
//     res.cookie('token', token).send({
//         'token': token
//     })

// })
app.post('/verify', async (req, res) => {

    const token = req.body.token
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        res.send(decoded)
    })

})

app.post('/signup', async (req, res) => {
    let user = req.body
    let pass = user.password


    const hash = await bcrypt.hash(pass, 10)
    user.password = hash


    const result = await Users.insertOne(user)

    if (result.acknowledged) {
        res.status(201).send({
            'user': user,
            'result': result
        })

    }else{
        res.status(401).send('There is a error')
    }
   


})

app.post('/login', async (req, res) => {
    const emaill = req.body.email
    const query = { email: emaill }
    const result = await Users.findOne(query)

    const verify = await bcrypt.compare(req.body.password, result.password)

    if (verify) {

        const token = jwt.sign(req.body, process.env.SECRET, { expiresIn: '1h' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: true
        })
            .status(201).send({
                "user": result,
            })
    }
    else {
        res.status(401).send({
            "message": "Password Not Matched"
        })
    }

})

app.post('/wishlist',async (req,res)=>{

    const id=req.body.book._id
    const userID=req.body._id
    const query={
        _id:new ObjectId(userID)
    }
    const result=await Users.findOne(query)
    const options = { upsert: true };
    let wishlistt=result.wishlist

    let readlist=result.readlist
    if(!(wishlistt.hasOwnProperty(id)) && !(readlist.hasOwnProperty(id))){
        wishlistt={...wishlistt,[id]:req.body.book}
        const update={
            $set :{
                wishlist:wishlistt
            }
        }
        const updateDoc= await Users.updateOne(query,update,options)
    
        res.status(201).send({
            'message':'Added To Wishlist'
        })
    }else if(readlist.hasOwnProperty(id)){
        res.status(203).send({
            'message':'Already In Readlist'
        })
    }else{
        res.status(203).send({
            'message':'Already In Wishlist'
        });
    }
    
})

app.post('/readlist',async (req,res)=>{

    const id=req.body.book._id
    const userID=req.body._id
    const query={
        _id:new ObjectId(userID)
    }
    const result=await Users.findOne(query)
    const options = { upsert: true };
    let readlistt=result.readlist

    if(!(readlistt.hasOwnProperty(id))){
        readlistt={...readlistt,[id]:req.body.book}
        const update={
            $set :{
                readlist:readlistt
            }
        }
        const updateDoc= await Users.updateOne(query,update,options)
    
        res.status(201).send({
            'message':'Added to Readlist'
        })
    }else{
        res.status(203).send({
            message:'Already In Readlist'
        })
    }
    
})

app.get('/get-books/:type/:id',async (req,res)=>{
    const type=req.params.type
    const userID=req.params.id
    const query={
        _id:new ObjectId(userID)
    }

    let options=''

    if(type=='wishlist'){

        options={
            projection:{wishlist:1}
        }
        
        

    }else if(type=='readlist'){
        options={
            projection:{readlist:1}
        }

    }

    const result=await Users.findOne(query,options!=''? options :'')

    res.status(201).send({
        'books':result[type]
    })


})



app.get('/book-list',async (req,res)=>{
    const query={}
    const options={
        sort:{totalPages:1}
    }
    const books= await BookInfo.find(query,options).toArray();

    res.status(201).send({
        'data':books
    })

})





app.listen((port), (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`The Server is running on ${port}`)
    }
})
