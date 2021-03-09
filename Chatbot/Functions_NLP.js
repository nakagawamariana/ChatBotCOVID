//Import "natural" Module for NLP
var natural = require('natural');
/* 
==Tokenization Function==
Tokenization is the process of splitting the given text into smaller pieces
called tokens. 
*/

//Import Tokenizer Method
var tokenizer = new natural.WordTokenizer();

function Tokenize(sentence) {
    return tokenizer.tokenize(sentence);
}

/*
==Stemming==
Stemming refers to the reduction of words to their word stem, base
or root form (e.g books = book, looked = look)
*/

//Import Porter Stemmer Method with Tokenizer together
stemmer = natural.PorterStemmer;

function Stemming(word){
    return stemmer.stem(word.toLowerCase());
}

/* 
== Bag of words ==
For each word in the vocabulary, if that word is present in the sentence, 
it puts a value of 1 in the position of a vector that corresponds to the 
position of the corresponding word in the sentence, previously tokenized and 
stemmed.
*/

function Bag_of_words(sentence, vocabulary){
    //Tokenize the sentence    
    sentence = Tokenize(sentence);

    //Stem each word of the tokenized sentence
    sentence = sentence.map(x => x.toLowerCase());

    //Stem each word of the tokenized sentence
    sentence = sentence.map(x => Stemming(x));

    //Create all-zeros array for bag with length equal to the vocabulary length
    let n = vocabulary.length
    let bag = new Array(n); for (let i=0; i<n; ++i) bag[i] = 0;
    
    /*
    Check if each of the words in the vocabulary is present in the sentence.
    If present, a value of 1 is placed in the position that corresponds to 
    the corresponding word in the vocabulary.
    */
    for (word in vocabulary){
        if (sentence.includes(vocabulary[word])){
            bag[word] = 1;
        }
    }
    return bag
}

function Bag_nostem(sentence, vocabulary){
    //Tokenize the sentence    
    sentence = Tokenize(sentence);

    //Stem each word of the tokenized sentence
    sentence = sentence.map(x => x.toLowerCase());

    //Create all-zeros array for bag with length equal to the vocabulary length
    let n = vocabulary.length
    let bag = new Array(n); for (let i=0; i<n; ++i) bag[i] = 0;
    
    /*
    Check if each of the words in the vocabulary is present in the sentence.
    If present, a value of 1 is placed in the position that corresponds to 
    the corresponding word in the vocabulary.
    */
    for (word in vocabulary){
        if (sentence.includes(vocabulary[word])){
            bag[word] = 1;
        }
    }
    return bag
}

function Bag_of_words_t(sentence, vocabulary){
    //Stem each word of the tokenized sentence
    sentence = sentence.map(x => x.toLowerCase());

    //Stem each word of the tokenized sentence
    sentence = sentence.map(x => Stemming(x));

    //Create all-zeros array for bag with length equal to the vocabulary length
    let n = vocabulary.length
    let bag = new Array(n); for (let i=0; i<n; ++i) bag[i] = 0;
    
    /*
    Check if each of the words in the vocabulary is present in the sentence.
    If present, a value of 1 is placed in the position that corresponds to 
    the corresponding word in the vocabulary.
    */
    for (word in vocabulary){
        if (sentence.includes(vocabulary[word])){
            bag[word] = 1;
        }
    }
    return bag
}

module.exports = {natural, tokenizer, Tokenize, stemmer, Stemming, Bag_of_words, Bag_of_words_t, Bag_nostem}

