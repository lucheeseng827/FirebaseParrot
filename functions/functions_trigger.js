// Imports the Google Cloud client library
const Speech = require('@google-cloud/speech');
const fs = require('fs');

// Your Google Cloud Platform project ID
const projectId = 'fir-parrot-3077a';

// Instantiates a client
const speechClient = Speech({
  projectId: projectId
});

// The name of the audio file to transcribe
//put into google cloud storage
const fileName = 'GS://parrotmalaysiahackathon/ang_m6.wav';

// Reads a local audio file and converts it to base64
const file = fs.readFileSync(fileName);
const audioBytes = file.toString('base64');

// The audio file's encoding, sample rate in hertz, and BCP-47 language code
const audio = {
  content: audioBytes
};
const config = {
  encoding: 'LINEAR16',
  sampleRateHertz: 16000,
  languageCode: 'en-US'
};
const request = {
  audio: audio,
  config: config
};
//function starts here
const functions = require('firebase-functions');

//storage object on change
//exports.setTrigger = functions.https.onRequest((request, response)) => {
//    response.send("Triggered");
//    speechClient.recognize(request);
//    };

// Detects speech in the audio file
speechClient.recognize(request)
  .then((data) => {
    const response = data[0];
    const transcription = response.results.map(result =>
        result.alternatives[0].transcript).join('\n');
    console.log(`Transcription: ${transcription}`);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });

/*
exports.helloGCS = function (event, callback) {
  const file = event.data;

  if (file.resourceState === 'not_exists') {
    console.log(`File ${file.name} deleted.`);
  } else if (file.metageneration === '1') {
    // metageneration attribute is updated on metadata changes.
    // on create value is 1
    console.log(`File ${file.name} uploaded.`);
    response.send("Triggered");
    speechClient.recognize(request);
  } else {
    console.log(`File ${file.name} metadata updated.`);
  }

  callback();
};
*/