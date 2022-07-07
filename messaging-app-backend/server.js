import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Cors from 'cors'
import Pusher from 'pusher'

// App config
const app = express();
const port = process.env.PORT || 9000
const connection_url = 'mongodb+srv://lucky9174:lucky9174@myclustor.00d1t.mongodb.net/?retryWrites=true&w=majority'

// Middleware
app.use(express.json())
app.use(Cors())

//DB config
mongoose.connect(connection_url)


const pusher = new Pusher({
  appId: "1419493",
  key: "f0b5451baa2a7f214f66",
  secret: "ec1588d1dfb9080cb418",
  cluster: "ap2",
  useTLS: true
});

// API endpoints
const db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection Error:'))

db.once('open', () => {
    console.log("DB Connected")
    const msgCollection = db.collection("messagingmessages")
    const changeStream = msgCollection.watch()

    changeStream.on('change', change => {
        console.log(change)

        if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timeStamp: messageDetails.timeStamp,
                received: messageDetails.received
            })
        } else {
            console.log('Error triggering Pusher')
        }
    })
})

app.get('/', (req, res) => {
    res.status(200).send("Hello TheWebDev")
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body
    Messages.create(dbMessage, (err, data) => {
        if(err)
            res.status(500).send(err)
        else
            res.status(201).send(data)
    })
})

app.get('/messages/sync', (req, res) => [
    Messages.find((err, data) => {
        if(err)
            res.status(500).send(err)
        else
            res.status(200).send(data)
    })
])

// Listener
app.listen(port, ()=> console.log(`Listening on localhost:${port}`))
