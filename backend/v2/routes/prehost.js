var express = require('express');
var router = express.Router();
const dialogflow = require('dialogflow');
const googleAuth = require('google-oauth-jwt');
const DLP = require('@google-cloud/dlp');

const projectId = '#' ;
const languageCode = 'es' ;
const config = {
    credentials: {
      private_key: JSON.parse(process.env.PRIVATE_KEY),
      client_email: JSON.parse(process.env.CLIENT_EMAIL)
    }
}
/*
private_key: process.env.PRIVATE_KEY,
client_email: process.env.CLIENT_EMAIL
*/

router.get('/token', (req, res) => {
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


router.get('/query', (req, res) => {

    var t = req.query.r;
    //var r = req.body.r;

    const dlp = new DLP.DlpServiceClient();

    // Construct deidentification request
    const item = {value: string};
    const request = {
        parent: dlp.projectPath(callingProjectId),
        deidentifyConfig: {
        infoTypeTransformations: {
            transformations: [
            {
                primitiveTransformation: {
                characterMaskConfig: {
                    maskingCharacter: maskingCharacter,
                    numberToMask: numberToMask,
                },
                },
            },
            ],
        },
        },
        item: item,
    };

    try {
        // Run deidentification request
        const [response] = await dlp.deidentifyContent(request);
        const deidentifiedItem = response.item;
        console.log(deidentifiedItem.value);
    } catch (err) {
        console.log(`Error in deidentifyWithMask: ${err.message || err}`);
    }

    process.exit();
});

router.get('/event', (req, res) => {
  
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