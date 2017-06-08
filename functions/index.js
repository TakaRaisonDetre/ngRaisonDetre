var functions = require('firebase-functions');

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })
var stripe = require("stripe")("sk_test_97TQP5sYpxGlqHB0ZNRAwuDE");
exports.payment = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', "*")
    response.set('Access-Control-Allow-Methods', '*')
    console.log("request", request.query);
    let token = request.query.token;
    stripe.charges.create({
        amount: request.query.amount,
        currency: request.query.currency,
        description: "one time charge",
        source: request.query.token,
    }, function (err, charge) {
        response.send(JSON.stringify(charge))

    });
});

exports.paymentSub = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', "*")
    response.set('Access-Control-Allow-Methods', '*')
    console.log("request", request.query);
    let planName = "example plan"
    let token = request.query.token;
    stripe.plans.create({
        amount: request.query.amount,
        interval: 1,
        name: planName,
        currency: request.query.currency,
        id: planName,
        interval_count: 1,
        statement_descriptor: "test payment"
    }, function (err, plan) {
        console.log("plan is created");
         console.log(" error creating plan",err);
        //create a customer
        if(!err){
            stripe.customers.create({
            description: 'create a  customer',
            source: token
        }, function (err, customer) {
            console.log(" customer is created ",customer);
            console.log(" error creating customer ",err)
            //create for the plan
           if(!err){
                stripe.subscriptions.create({
                customer: customer.id,
                plan: "example plan"
            }, function (err, subscription) {
                console.log("error is subscription ",err)
                console.log(" user is subscribed");
                response.send(JSON.stringify(subscription))
            });
           }


        });
        }


    });



    //create a plan on the fly

});
