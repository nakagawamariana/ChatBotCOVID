# -*- coding: utf-8 -*-
"""
Created on Mon Nov 16 23:23:54 2020

@author: nakag
"""
import json
from nltk_utils import tokenize, stem, bag_of_words #Meto todas las funciones de preproc
import numpy as np

import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from model import NeuralNetwork

with open('intents.json', 'r') as f:
    intents = json.load(f)

all_words =[] #Aquí metemos todas las palabras de la bolsa
tags = []
xy = []#Guardamos tanto los patrones como las etiquetas, asociamos palabras a situaciones

for intent in intents['intents']:#parseamos json
    tag = intent['tag']
    tags.append(tag)
    for pattern in intent['patterns']:
        w = tokenize(pattern)
        all_words.extend(w)#uso .extend() porque no quiero hacer un array de arrays sino ampliar el que tengo
        xy.append((w, tag))
        
''' tercer punto de mi pipeline, excluyo signos de puntuacion'''
ignore_words = ['?', '!', '.', ',']
all_words = [stem(w) for w in all_words if w not in ignore_words]
all_words = sorted(set(all_words))#elimino duplicados y ordeno
tags = sorted(set(tags))


'''Creacion de mi dataset de entrenamiento'''

X_train =[]
y_train = []
for (pattern_sentence, tag) in xy:
    bag = bag_of_words(pattern_sentence, all_words)
    X_train.append(bag)
    label = tags.index(tag)#asociamos indice a cada tag (lista), el fin es hacer un one hot encoding
    y_train.append(label)
    
X_train = np.array(X_train)
y_train = np.array(y_train) 


class ChatDataset(Dataset):
    def __init__(self):
        self.n_samples = len(X_train)
        self.x_data = X_train
        self.y_data = y_train
        
    #dataset[idx]
    def __getitem__(self,index):
        return self.x_data[index], self.y_data[index]
    
    def __len__(self):
        return self.n_samples
    

# Hyperparameters
batch_size = 8
hidden_size = 8
output_size = len(tags)#numero de clases
input_size = len(X_train[0])#numero de bag of words, que es igual a la longitud de all_words
learn_rate = 0.001
num_epoch = 1000


    
dataset = ChatDataset()
train_loader = DataLoader(dataset = dataset, batch_size = batch_size, shuffle = True)


device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = NeuralNetwork(input_size, hidden_size, output_size).to(device)#pushing onto device


#Loss and optimizer
crit = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr = learn_rate)

for epoch in range(num_epoch):
    for (words, labels) in train_loader:
        words = words.to(device)
        labels = labels.to(device= device, dtype = torch.int64)
        
        #forward pass
        outputs = model(words)
        loss = crit(outputs, labels)
        
        #backward pass and opt step(tenemos que vaciar el gradiente primero)
        optimizer.zero_grad()
        loss.backward()#para calcular la backward propagation
        optimizer.step()
        
    if (epoch + 1) % 100 == 0:
        print (f'epoch {epoch + 1}/{num_epoch}, loss = {loss.item():.4f}')
        
print (f'final loss, loss = {loss.item():.4f}')
        
#Guardar los datos que hemos entrenado
data = {
        "model_state": model.state_dict(),
        "input_size": input_size,
        "output_size": output_size,
        "hidden_size": hidden_size,
        "all_words": all_words,
        "tags": tags,
}       

FILE = "data.pth"#pth hace referencia a pytorch
torch.save(data, FILE)


print(f'training done. File saved to {FILE}')






