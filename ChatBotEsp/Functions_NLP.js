//Importar el módulo "natural" para poder realizar el procesamiento NLP, que  sirve tanto para español como para inglés
var natural = require('natural');
/* 
==Función para la tokenización==
De esta manera dividimos las palabras en subsegmentos llamados tokens. 
*/

//Importamos el tokenizador del módulo natural
var tokenizer = new natural.WordTokenizer({language: "esp"});

function Tokenize(sentence) {
    return tokenizer.tokenize(sentence);
}

/*
==Stemming==
Reducimos las palabras a la raíz de las mismas (para de esta manera quedarnos sólo con el significado)
*/

//Importamos PorterStemmer para realizar lo anterior
stemmer = natural.PorterStemmerEs;

function Stemming(word){
    return stemmer.stem(word.toLowerCase());
}

/* 
== Bag of words ==
Crearemos un repositorio de palabras. Para cada una de las palabras que se introduzcan a la función, 
se comprobará su existencia en la bag of words. En caso afirmativo se añadirá un valor 1 en la posición
correspondiente en el array de la oración, que ya habrá sido tokenizada y stemmizada.
*/

function Bag_of_words(sentence, vocabulary){
    
    sentence = Tokenize(sentence);//tokenización

    vocabulary = vocabulary.map(x => x.toLowerCase())//pasamos todos los caracteres a minúsculas

    sentence = sentence.map(x => x.toLowerCase());

    sentence = sentence.map(x => Stemming(x));//Stemmizamos cada palabra de la oración tokenizada

    //Creamos un array de ceros para poder binarizar las palabras de input
    let n = vocabulary.length
    let bag = new Array(n); for (let i=0; i<n; ++i) bag[i] = 0;
    
    /*
    Comprobación de la presencia de las palabras de la bag of words y binarización de la oración
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

    //Vocabulary to lower case 
    vocabulary = vocabulary.map(x => x.toLowerCase())

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
    //Stem each word of the non-tokenized sentence
    sentence = sentence.map(x => x.toLowerCase());

    //Vocabulary to lower case 
    vocabulary = vocabulary.map(x => x.toLowerCase())

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

function Bag_of_words_t_n(sentence, vocabulary){
    //Stem each word of the non-tokenized sentence
    sentence = sentence.map(x => x.toLowerCase());

    //Vocabulary to lower case 
    vocabulary = vocabulary.map(x => x.toLowerCase())

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


module.exports = {natural, tokenizer, Tokenize, stemmer, Stemming, Bag_of_words, Bag_of_words_t, Bag_nostem, Bag_of_words_t_n}

