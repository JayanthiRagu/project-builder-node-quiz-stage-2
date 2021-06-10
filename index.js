const mongodb=require('mongodb')
const express=require('express')
const app=express()
app.use(express.json())
const mongoClient= mongodb.MongoClient
const url="mongodb+srv://admin:admin@cluster0.izyvf.mongodb.net/quiz?retryWrites=true&w=majority"

//find all data from questions
app.get('/', async function(req,res){
    const client = await mongoClient.connect(url)
    try{
        let db=client.db('quiz')
        let questions=await db.collection('questions').find().toArray()
        res.json({
            questions,
            message :"Records Found"
        })
    }
    catch(error)
    {
        console.log(error)
    }
    finally{
        client.close()
    }     
})

//find particular questions
app.get('/question', async function(req,res){
    const client = await mongoClient.connect(url)
    try{
        let db=client.db('quiz')
        let questions=await db.collection('questions').find({question:req.body.question}).toArray()
        res.json({
            questions,
            message :"Records Found"
        })
    }
    catch(error)
    {
        console.log(error)
    }
    finally{
        client.close()
    }     
})

//insert into questions
app.post('/', async function(req,res){
    const client = await mongoClient.connect(url)
    try{
        let db=client.db('quiz')
        let questions=await db.collection('questions').insertOne(req.body)
        res.json({
            questions,
            message :"Records Posted"
        })
    }
    catch(error)
    {
        console.log(error)
    }
    finally{
        client.close()
    }     
})

//update into questions
app.put('/:question', async function(req,res){
    const client = await mongoClient.connect(url)
    try{
        let db=client.db('quiz')
        let question = await db.collection('questions').findOne({question: req.params.question})
        if(question)
        {
            let questions=await db.collection('questions').updateOne({question: req.params.question}, {$set:{question:req.body.question}})
            res.json({
                questions,
                message :"Records Updated"
            })
        }
        else{
            res.json({
                message: "No question is available"
            })
        }
    }
    catch(error)
    {
        console.log(error)
    }
    finally{
        client.close()
    }     
})


//delete questions
app.delete('/:question', async function(req,res){
    const client = await mongoClient.connect(url)
    try{
        let db=client.db('quiz')
        let question = await db.collection('questions').findOne({question: req.params.question})
        if(question)
        {
            let questions=await db.collection('questions').findOneAndDelete({question: req.params.question})
            res.json({
                questions,
                message :"Record Deleted"
            })
        }
        else{
            res.json({
                message: "No question is available"
            })
        }
    }
    catch(error)
    {
        console.log(error)
    }
    finally{
        client.close()
    }     
})

app.listen(5000,()=>console.log("Server running"))


