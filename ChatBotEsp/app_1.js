//Importamos todos los módulos necesarios para hacer la aplicación
const path = require('path');
const fs = require('fs');
const tf = require('@tensorflow/tfjs-node');
const { natural, tokenizer, Tokenize, stemmer, Stemming, Bag_of_words, Bag_of_words_t, Bag_nostem } = require("./Functions_NLP.js")
const { outerProduct } = require('@tensorflow/tfjs-node');
const express = require("express");
const bodyParser = require('body-parser');


//Importamos el vocabulario
//%%Intents
var vocabulary_intents = fs.readFileSync(path.resolve(__dirname, './Vocabulary/vocabulary_intents.json'));
var vocabulary_intents = JSON.parse(vocabulary_intents);
//%%Comunidades autónomas
var vocabulary_ca = fs.readFileSync(path.resolve(__dirname, './Vocabulary/vocabulary_ca.json'));
var vocabulary_ca = JSON.parse(vocabulary_ca);


/*
Transformamos los modelos convolucionales desde los ficheros .h5:

tensorflowjs_converter --input_format keras /Users/nakag/OneDrive/Escritorio/Hospi/my_model_ca.h5 /Users/nakag/OneDrive/Escritorio/Hospi/Models/model_ca 
tensorflowjs_converter --input_format keras /Users/nakag/OneDrive/Escritorio/Hospi/my_model_i.h5 /Users/nakag/OneDrive/Escritorio/Hospi/Models/model_i

*/
async function tensorFlow(path) {
    const model = await tf.loadLayersModel(path);
    return model
}

//Carga de los modelos
var model_ca = tensorFlow('file://./Models/model_ca/model.json')
var model_i = tensorFlow('file://./Models/model_i/model.json')

function Chatbot(input) {
    

    var input_msg = Bag_of_words(input, vocabulary_intents.v_i);
    

    var input_msg = tf.tensor(input_msg).reshape([-1, vocabulary_intents.v_i.length])
    console.log(input_msg)

    //Predicción de la respuesta óptima
    model_i.then(function (res) {

        var prediction = res.predict(input_msg);

        var prob = prediction.dataSync();

        var index_winner = prob.indexOf(Math.max(...prob));
        var prob_winner = Math.max(...prob)

        if (prob_winner >= 0.85) {

            var label_response = vocabulary_intents.tags_i[index_winner];

            var output_msg = null;

            for ([idx, element] of vocabulary_intents.tag_ii) {
                if (element == label_response) {
                    var responses = vocabulary_intents.responses_i[idx]
                    output_msg = responses[Math.floor(Math.random() * responses.length)]
                    let response_msg = { "response": output_msg };
                    let data = JSON.stringify(response_msg);
                    fs.writeFileSync("response.json", data);
                }
            }

            if (label_response == 'CovidTelephone') {

                var input_ca = Bag_nostem(input, vocabulary_ca.v_ca)

                var input_ca = tf.tensor(input_ca).reshape([-1, vocabulary_ca.v_ca.length])

                var response_tlf = null;

                model_ca.then(function (res_1) {


                    var prediction_ca = res_1.predict(input_ca)

                    var prob_ca = prediction_ca.dataSync();


                    var index_winner_ca = prob_ca.indexOf(Math.max(...prob_ca));
                    var prob_winner_ca = Math.max(...prob_ca);


                    if (prob_winner_ca >= 0.25) {
                        var community = vocabulary_ca.tags_ca[index_winner_ca]
                        var phone_number = null;
                        for ([com, phone] of vocabulary_ca.tlf_ca) {
                            if (com == community) {
                                phone_number = phone
                            }
                        }
                        response_tlf = `<br> El número de teléfono de ${community} es
                        : ${phone_number}`

                        var final_msg = output_msg + response_tlf
                        let response_msg = { "response": final_msg };
                        let data = JSON.stringify(response_msg);
                        fs.writeFileSync("response.json", data);

                    } else {
                        response_tlf = "<br> Puedes preguntar por un teléfono covid en específico, pon por ejemplo: teléfono covid de Madrid"
                        var final_msg = output_msg + response_tlf
                        let response_msg = { "response": final_msg };
                        let data = JSON.stringify(response_msg);
                        fs.writeFileSync("response.json", data);
                    }
                })
            }
        } else {
            var final_msg = "Lo siento, no te he entendido"
            let response_msg = { "response": final_msg };
            let data = JSON.stringify(response_msg);
            fs.writeFileSync("response.json", data);
        }
    }, function (err) {

    })
    
}

//$$CONFIGURACION DEL SERVIDOR$$

const port = 3002

const app = express();

//Middlewares
//Obtain data from POST method as an object readable by javascript
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//Obtain static files from this folder
app.use(express.static('./public_1'));

app.post('/new', (req,res) => {
    res.setHeader('Content-type', 'text/html');
    
    const input = req.body.input;
    console.log(input)
    Chatbot(input)

    res.redirect('/')
    //res.send(input)
})

app.get("/", (req, res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.sendFile('./public_1/index.html')
})

app.get('/get-response', (req,res)=>{
    res.setHeader('Content-type', 'text/json')
    res.sendFile(path.resolve(__dirname, './response.json'))
})

app.listen(port, () => {
    console.log("Serving at port: ", port)
})