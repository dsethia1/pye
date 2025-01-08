import boto3
import pickle
import os
import pandas as pd
import numpy as np

from Backend.Extraction import data_processing

def download_model(bucket_name, model_key, local_path='model.pkl'):
    s3 = boto3.client('s3')
    s3.download_file(bucket_name, model_key, local_path)
    s3.download_file(bucket_name, "train_both.csv", "train_both.csv")
    print("Model Downloaded")

def pred():
    bucket_name = "pyebucket"
    model_key= "model.pkl"
    local_path = "model.pkl"
    
    download_model(bucket_name, model_key, local_path)
    
    try: 
        with open(local_path, 'rb') as f:
            model = pickle.load(f)
            print("Model Loaded")
    except Exception as e:
        print(f"Error loading model: {e}")
        return "Error loading model", "0%"
    
    data = data_processing()
    train_both = pd.read_csv("train_both.csv")
    labels_both = train_both.pop('Diagnosis')
    from sklearn.preprocessing import MinMaxScaler
    norm = MinMaxScaler().fit(train_both)
    data = norm.transform(data)
    
    new_pred = model.predict(data)
    confidence_score = 0.0
    if new_pred == 1:
        print_pred = "Autism Positive"
        confidence_score = model.predict_proba(data)[0][1]
    else:
        print_pred = "Autism Negative"
        confidence_score = model.predict_proba(data)[0][0]
    
    confidence_score = round(confidence_score * 100)
    confidence_score_str = f"{confidence_score}%"
    return print_pred, confidence_score_str

