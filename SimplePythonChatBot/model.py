# -*- coding: utf-8 -*-
"""
Created on Tue Nov 17 00:32:57 2020

@author: nakag
"""

import torch
import torch.nn as nn

class NeuralNetwork(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super(NeuralNetwork,self).__init__()
        self.l1 = nn.Linear(input_size, hidden_size)
        self.l2 = nn.Linear(hidden_size, hidden_size)
        self.l3 = nn.Linear(hidden_size, num_classes)
        self.relu = nn.ReLU()#Funcion de activacion
        
    def forward(self, a):
        output = self.l1(a)
        output = self.relu(output)
        output = self.l2(output)
        output = self.relu(output)
        output = self.l3(output)
        #en la tercera capa no meto la funcion de activacion, es decir, no softmax, vamos a meter cross entropy
        return output
            
            