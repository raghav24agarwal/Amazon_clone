const functions = require("firebase-functions");

const express = require("express")
const cors = require("cors");
const { request, response } = require("express");
const stripe = require("stripe")("sk_test_51JUzTnSC8ESNVgdblaQApIkcgRgaZyIQA97vqkGWPX1OGO0WmvjUB3UPHgjwSquDt9KLktkwefdDLVSc6YbLi3dh00zgMi58nH")

// SETTING UP AN API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));  //for security thing (somewhat)
app.use(express.json());  //helps us to send and parse data in json format

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"))

app.post("/payments/create", async (request, response) => {
    const total = request.query.total

    console.log("payment request received ", total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of the currency
        currency: "usd"
    })

    // OK - created something
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

// - Listen command
exports.api = functions.https.onRequest(app)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
