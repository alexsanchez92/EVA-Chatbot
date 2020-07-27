var express = require('express');
var router = express.Router();
const dialogflow = require('dialogflow');
const googleAuth = require('google-oauth-jwt');
const DLP = require('@google-cloud/dlp');

const projectId = 'chatbotsau-220511';
const languageCode = 'es' ;

const config = {
    credentials: {
      private_key: process.env.PRIVATE_KEY,
      client_email: process.env.CLIENT_EMAIL
    }
}
//private_key: process.env.PRIVATE_KEY,
//client_email: process.env.CLIENT_EMAIL
//te-708@consultas-sau.iam.gserviceaccount.com

router.get('/token', (req, res) => {
    process.exit();
    //https://www.googleapis.com/auth/dialogflow
    //https://www.googleapis.com/auth/cloud-platform

    //console.log(config.credentials.client_email)
    //console.log(config.credentials.private_key)

    googleAuth.authenticate({
        email: config.credentials.client_email,
        key: config.credentials.private_key,
        scopes: ['https://www.googleapis.com/auth/cloud-platform']
    }, function (err, token) {
        //console.log(JSON.stringify(err))
        //console.log(JSON.stringify(token))
        //console.log("E: "+err);
        //console.log("T: "+token);
        res.json(token);
    });
    
});

router.post('/mask', (req, res) => {

    var text = req.body.query;
    const dlp = new DLP.DlpServiceClient();

    /*
        Número de tarjeta - OK
        Número de cuenta/IBAN - OK
        CIF/NIF/NIE - nif nie con infotype. Cif con custom: [a-z]{1}[\d]{7}[a-z0-9]{1}
        Teléfono - debería con infotype
        Número de comercio - custom -    [0-9]{9}
        nº tpv - 11 digitos - custom -   [0-9]{11}
        nº pedido - 12 digitos- custom -   [0-9]{12}
    */

    // The infoTypes of information to match
    const infoTypes = [{name: 'PERSON_NAME'},{name: 'MALE_NAME'},{name: 'FEMALE_NAME'}, {name: 'SPAIN_NIE_NUMBER'}, {name: 'SPAIN_NIF_NUMBER'}, {name: 'SPAIN_PASSPORT'}, {name: 'CREDIT_CARD_NUMBER'}, {name: 'IBAN_CODE'}, {name: 'PHONE_NUMBER'}, {name: 'EMAIL_ADDRESS'}];

    const customTypes = [
        {
            infoType:{
                name:"N_TPV"
            },
            regex:{
                pattern:"[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}"
            },
            likelihood:"POSSIBLE"
        },
        {
            infoType:{
                name:"N_COMERCIO"
            },
            regex:{
                pattern:"[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}"
            },
            likelihood:"POSSIBLE"
        },
        {
            infoType:{
                name:"NIF_CUSTOM"
            },
            regex:{
                pattern:"[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[\-]{0,1}[\t\n\f\r ]{0,2}[a-zA-Z]{1}"
            },
            likelihood:"POSSIBLE"
        },
        {
            infoType:{
                name:"CIF"
            },
            regex:{
                pattern:"[a-zA-Z]{1}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[\-]{0,1}[\t\n\f\r ]{0,2}[a-zA-Z0-9]{1}"
            },
            likelihood:"POSSIBLE"
        },
        {
            infoType:{
                name:"TLF"
            },
            regex:{
                pattern:"[9|7|6][0-9]{1}[\t\n\f\r ]{0,2}[\-]{0,1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[\-]{0,1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[\-]{0,1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[\-]{0,1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[\-]{0,1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[\-]{0,1}[\t\n\f\r ]{0,2}[0-9]{1}[\t\n\f\r ]{0,2}[\-]{0,1}[\t\n\f\r ]{0,2}[0-9]{1}"
            },
            likelihood:"POSSIBLE"
        }
    ];

    // Construct deidentification request
    const request = {
        parent: dlp.projectPath(projectId),
        inspectConfig: {
            infoTypes: infoTypes,
            customInfoTypes: customTypes
        },
        deidentifyConfig: {
            infoTypeTransformations: {
                transformations:
                [{
                    primitiveTransformation: {
                        characterMaskConfig: {
                            maskingCharacter: '*'
                        },
                    },
                }],
            },
        },
        item: {value: text},
    };

    // Run deidentification request
    dlp.deidentifyContent(request)
    .then(response => {
        const deidentifiedItem = response[0];
        //console.log(JSON.stringify(response))
        //console.log("TPVA: "+deidentifiedItem.item.value)
        //res.json(response)
        res.json(deidentifiedItem.item.value)
    })
    .catch(err => {
        //console.log(`Error in deidentifyWithMask: ${err.message || err}`);
        res.json({})
    });
});

router.get('/query', (req, res) => {

    process.exit();

    var t = req.query.r;
    const sessionId = '222' ;

    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: t,
          languageCode: languageCode,
        },
      },
    };

    // Send request and log result
    sessionClient
    .detectIntent(request)
    .then(responses => {
        console.log('Detected intent');
        //const result = responses[0].queryResult.fulfillmentMessages;
        res.json(responses)
        //console.log(`  Query: ${result.queryText}`);
        //console.log(`  Response: ${result.fulfillment}`);
        /*if (result.intent) {
          console.log(`  Intent: ${result.intent.displayName}`);
          return res.json({p:"HOLA"});
        } else {
          console.log(`  No intent matched.`);
        }*/
    })
    .catch(err => {
        console.error('ERROR:', err);
    });
});

router.get('/event', (req, res) => {
  
    process.exit();
  
    var e = req.query.event;
    //var r = req.body.e;

    const sessionId = '222' ;

    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: e,
          languageCode: languageCode,
        },
      },
    };

    // Send request and log result
    sessionClient
    .detectIntent(request)
    .then(responses => {
        console.log('Detected event');
        res.json(responses)
    })
      .catch(err => {
        console.error('ERROR:', err);
    });

});

module.exports = router;