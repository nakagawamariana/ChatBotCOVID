# -*- coding: utf-8 -*-
"""
Created on Tue Nov 17 02:50:58 2020

@author: nakag
"""

import random #quiero aleatorizar las respuestas que doy
import json
import torch
from model import NeuralNetwork
from nltk_utils import bag_of_words, tokenize

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')


with open('intents.json', 'r') as f:
    intents = json.load(f)
    
FILE = "data.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data["all_words"]
tags = data["tags"]
model_state = data["model_state"]

model = NeuralNetwork(input_size, hidden_size, output_size).to(device)#pushing onto device
model.load_state_dict(model_state)#para que conozca los parametros de aprendizaje
model.eval()

bot_name = "Mariana"
print("Hola, soy XXX. Me han creado para intentar ayudarte con todas tus posibles dudas relacionadas con el Covid-19. Estoy encantado/a de hablar contigo y ayudarte en todo lo que pueda. Entre las cosas que puedo hacer son: indicarte si tus síntomas son compatibles con Covid-19, darte recomendaciones sobre qué hacer en caso de aislamiento o cuarentena, facilitarte el teléfono Covid de tu comunidad autónoma y las restricciones que se aplican. Estoy listo/a para ayudarte, pero antes deja que nos conozcamos un poco para que pueda ofrecerte información personalizada… ¿Qué edad tienes?")

#\nWelcome to COVID-19 Checker. \nIf you are experiencing life-threatening symptoms, call 911 immediately!
while True:
    sentence = input('Tú: ')
    if sentence == "quit":
        break
    sentence = tokenize(sentence)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1,X.shape[0])#metemos una fila porque solo tenemos una muestra
    X = torch.from_numpy(X)#porque nuestra función .bag_of_words() devuelve un array
    
    output = model(X)#nos devuelve la prediccion
    _, predicted = torch.max(output, dim = 1)
    tag = tags[predicted.item()]#dentro del corchete tengo la class label, luego metemos en tag la categoría en concreto eg. greeting
    
    #calculo las probs de que corresponda realmente a esa tag mediante la implementacion de la softmax
    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]#esta será la probabilidad
    
    if prob.item() > 0.75:
    #ahora queremos encontrar el intent correspondiente, vamos a hacer loop sobre todos los intents para ver si coincide el tag
        for intent in intents["intents"]:
            if tag ==intent["tag"]:
                print(f"{bot_name}: {random.choice(intent['responses'])}")
    else:
        print(f"{bot_name}: No entiendo... :(")
    
    
    
    
    
    
    
    
    
    