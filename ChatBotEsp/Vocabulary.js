//==VOCABULARY FOR COVID-19 CHATBOT==

//Import NLP functions
var {natural, tokenizer, Tokenize, stemmer, Stemming, Bag_of_words} = require("./Functions_NLP.js")

//Import FS module to read and write files
var fs = require('fs');
var path = require('path');

//== INTENTS VOCABULARY

//Load vocabulary from JSON-JS transformed document
var intents = fs.readFileSync(path.resolve(__dirname, './new_intent.json'));

var intents = JSON.parse(intents);
//Empty array with pattern words
var v_i = [];
//Empty array with tags
var tags_i = [];
//Empty array for tuples tags and pattern words
var xy_i = [];
//Empty array for tuples tag and tag index
var tag_ii = [];
//Empty array for responses
var responses_i = [];

for (intent of intents.intents){
    //Tag from this intent
    let tag = intent.tag;
    //Append tag to the tags list for this intent
    tags_i.push(tag);
    //Create empty response array for this intent
    let response_intent = [];
    
    for (pattern of intent.patterns){
        //Tokenize each pattern
        let words = Tokenize(pattern);
        //Add words to the pattern words array 
        for(word of words){
            v_i.push(word);
        }
        //Add words and tag "tuple array" to xy array
        xy_i.push([words, tag]);
    }
    
    //Add responses of this intent to the response list for our vocabulary
    for (response of intent.responses){
        response_intent.push(response);
    }
    responses_i.push(response_intent);

}

//Add Tag and Tag index "tuple array" to the tag_ii array
for (index in tags_i){
    tag_ii.push([index, tags_i[index]]);
}

//Stem vocabulary words and transform to lower case
//Punctuation characters have already been removed with the function Tokenize()
v_i = v_i.map(x => Stemming(x).toLowerCase());

//Remove repeated values and sort alphabetically
const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
}
v_i = v_i.filter(distinct).sort();
tags_i = tags_i.filter(distinct).sort();



//==AUTONOMOUS COMMUNITIES VOCABULARY

//Load vocabulary from JSON-JS transformed document
var ca = fs.readFileSync(path.resolve(__dirname, './comunidades_autonomas.json'));
var ca = JSON.parse(ca);
const { builtinModules } = require("module");

//Empty array with pattern words
var v_ca = [];
//Empty array with tags
var tags_ca = [];
//Empty array for tuples tags and pattern words
var xy_ca = [];
//Empty array for tuples tag and tag index
var tag_ica = [];
//Empty array for telephones
var tlf_ca = [];

for (cam of ca.CA){
    //Append tag to the tags_ca list of the current ca
    let tag = cam.coma
    tags_ca.push(tag)

    for (pattern of cam.patterns){
        //Tokenize each pattern
        let words = Tokenize(pattern);
        //Add words to the pattern words array v_ca
        for(word of words){
            v_ca.push(word);
        }
        //Add words and tag "tuple array" to xy array
        xy_ca.push([words, tag]);
    }

    //Add each telephone of the current ca
    for (telephone of cam.telephone){
        tlf_ca.push([cam.coma, telephone])
    }
}

//Add Tag and Tag index "tuple array" to the tag_ica array
for (index in tags_ca){
    tag_ica.push([index, tags_ca[index]]);
}

//Transform to lower case
//Punctuation characters have already been removed with the function Tokenize()
v_i = v_i.map(x => x.toLowerCase());

//Remove repeated values and sort alphabetically
v_ca = v_ca.filter(distinct).sort();
tags_ca = tags_ca.filter(distinct).sort();

//==SAVE ALL THE ARRAYS CREATED TO A FILE==
let vocabulary_intents = {"v_i": v_i, "tags_i":tags_i, "xy_i": xy_i ,"tag_ii": tag_ii,
"responses_i": responses_i};
let data_1 = JSON.stringify(vocabulary_intents);
fs.writeFileSync(path.resolve(__dirname, './Vocabulary/vocabulary_intents.json'),data_1);

let vocabulary_ca = {"v_ca": v_ca, "tags_ca": tags_ca, "xy_ca": xy_ca, "tag_ica": tag_ica,
"tlf_ca": tlf_ca}
let data_2 = JSON.stringify(vocabulary_ca)
fs.writeFileSync(path.resolve(__dirname, './Vocabulary/vocabulary_ca.json'),data_2)
 