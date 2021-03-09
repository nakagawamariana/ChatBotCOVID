//==TRAIN SETS==

//Import NLP Functions
var {natural, tokenizer, Tokenize, stemmer, Stemming, Bag_of_words, Bag_of_words_t} = require("./Functions_NLP.js")
var path = require('path')
//%%INTENTS MODEL%%
//CREATE X_Train, y_train
//Import vocabulary
var fs = require('fs');
var vocabulary_intents = fs.readFileSync(path.resolve(__dirname,'./Vocabulary/vocabulary_intents.json'));
var vocabulary_intents = JSON.parse(vocabulary_intents);


//Create arrays for X_train and y_train 
var X_train_i = [];
var y_train_i = [];

/*
For each pattern sentence, we will create a bag of words and append it
to the X_train dataset, then we will append the output label for that 
sentence to the y_train dataset. This way, we will create our training
dataset. 

The X_train dataset will consist of a matrix containing the bag vector of
each pattern sentence of 0's and 1's. On the other hand, the y_train will
consist of the output labels in the form of indexes, so the indexes will 
range from 0 to the length of the list "tags". 
*/

for (element of vocabulary_intents.xy_i){
    let pattern = element[0];
    let tag = element[1];

    //Create bag of words for the pattern sentence 
    bag = Bag_of_words_t(pattern, vocabulary_intents.v_i);

    //Append it to the X_train array
    X_train_i.push(bag);

    //Append the index of the tag in the tags_i array
    y_train_i.push(vocabulary_intents.tags_i.indexOf(tag));
    
}

/*
The output of our model won't consist of a number corresponding
to the proper tag, but it will consist of an array of 0's and 1's 
where a 1 tells you that the sentence correspond to that tag and 0
tells you that the pattern do not correspond to that tag. Therefore,
the output of the neural network will tell us the probability that
that sentence corresponds to a given tag in a range of values from 0
to 1. 
*/

//Create y_array with #elements equal to those of X_train
//#outputs in each element equal to the #tags in tags_i
var y_array_i = [];

for(var i=0; i<X_train_i.length; i++) {
    y_array_i[i] = new Array(vocabulary_intents.tags_i.length).fill(0);
}

/*
Assign a one to the position of each y_array_i element that indicates
the tag that the pattern sentence of X_train_i corresponds to
*/

for(index in y_train_i){
    label = y_train_i[index];
    y_array_i[index][label] = 1;
}

//%%AUTONOMOUS COMMUNITIES MODEL%%
//CREATE X_Train, y_train
//Import vocabulary
var vocabulary_ca = fs.readFileSync(path.resolve(__dirname, './Vocabulary/vocabulary_ca.json'));
var vocabulary_ca = JSON.parse(vocabulary_ca);

//Create arrays for X_train and y_train 
var X_train_ca = [];
var y_train_ca= [];

/*
For each autonomous community sentence, we will create a bag of words and append it
to the X_train dataset, then we will append the output label for that 
sentence to the y_train dataset. This way, we will create our training
dataset. 

The X_train dataset will consist of a matrix containing the bag vector of
each autonomous community sentence of 0's and 1's. On the other hand, the y_train will
consist of the output labels in the form of indexes, so the indexes will 
range from 0 to the length of the list "tags". 
*/

for (element of vocabulary_ca.xy_ca){
    let pattern = element[0];
    let tag = element[1];

    //Create bag of words for the autonomous community sentence 
    bag = Bag_of_words_t(pattern, vocabulary_ca.v_ca);

    //Append it to the X_train array
    X_train_ca.push(bag);

    //Append the index of the tag in the tags_ca array
    y_train_ca.push(vocabulary_ca.tags_ca.indexOf(tag));
    
}

/*
The output of our model won't consist of a number corresponding
to the proper tag, but it will consist of an array of 0's and 1's 
where a 1 tells you that the sentence correspond to that tag and 0
tells you that the pattern do not correspond to that tag. Therefore,
the output of the neural network will tell us the probability that
that sentence corresponds to a given tag in a range of values from 0
to 1. 
*/

//Create y_array with #elements equal to those of X_train
//#outputs in each element equal to the #tags in tags_ca
var y_array_ca = [];

for(var i=0; i<X_train_ca.length; i++) {
    y_array_ca[i] = new Array(vocabulary_ca.tags_ca.length).fill(0);
}

/*
Assign a one to the position of each y_array_ca element that indicates
the tag that the pattern sentence of X_train_ca corresponds to
*/

for(index in y_train_ca){
    label = y_train_ca[index];
    y_array_ca[index][label] = 1;
}


//==SAVE ALL THE ARRAYS CREATED TO A FILE==
let Train_i = {"X_train_i": X_train_i, "y_train_i": y_array_i}
let data_1 = JSON.stringify(Train_i)
fs.writeFileSync(path.resolve(__dirname, './Train_sets/Train_i.json'),data_1)

let Train_ca = {"X_train_ca": X_train_ca, "y_train_ca": y_array_ca}
let data_2 = JSON.stringify(Train_ca)
fs.writeFileSync(path.resolve(__dirname, './Train_sets/Train_ca.json'),data_2)
 