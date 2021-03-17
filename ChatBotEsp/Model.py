#Things we need for Tensorflow
import numpy as np
import tensorflow as tf
import random
import json
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import keras
from numpy import loadtxt
from keras.models import Sequential
from keras.layers import Dense
import tensorflowjs as tfjs
from tensorflow.keras.layers import Conv2D, Flatten, Dense

#==INTENTS MODEL==
#Import X_train_i, y_train_i
with open("./Train_sets/Train_i.json", "r") as read_file:
    Train_i = json.load(read_file)

X_train_i = np.array(Train_i["X_train_i"])
y_train_i = np.array(Train_i["y_train_i"])

# Neural network
model_i = Sequential()
model_i.add(Dense(16, input_dim = X_train_i.shape[1], activation='relu'))
model_i.add(Dense(12, activation='relu'))
model_i.add(Dense(y_train_i.shape[1], activation='softmax'))

model_i.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

model_i.fit(X_train_i, y_train_i, epochs=200, batch_size=10)

# Save model in a .h5 file
model_i.save("./Models/model_i.h5")

#==AUTONOMOUS COMMUNITIES MODEL==
#Import X_train_ca, y_train_ca
with open("./Train_sets/Train_ca.json", "r") as read_file:
    Train_ca = json.load(read_file)

X_train_ca = np.array(Train_ca["X_train_ca"])
y_train_ca = np.array(Train_ca["y_train_ca"])

# Neural network
model_ca = Sequential()
model_ca.add(Dense(16, input_dim = X_train_ca.shape[1], activation='relu'))
model_ca.add(Dense(12, activation='relu'))
model_ca.add(Dense(y_train_ca.shape[1], activation='softmax'))

model_ca.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

model_ca.fit(X_train_ca, y_train_ca, epochs=200, batch_size=10)

# Save model in a .h5 file
model_ca.save("./Models/model_ca.h5")
