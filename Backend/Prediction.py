import pandas as pd
import numpy as np
import matplotlib as mpl
import xgboost as xgb
from xgboost import XGBClassifier, plot_tree

from Data_Set_Up import train_us
from Data_Set_Up import train_dk
from Data_Set_Up import train_both
from Extraction import data

labels_us = train_us.pop('Diagnosis')
labels_dk = train_dk.pop('Diagnosis')
labels_both = train_both.pop('Diagnosis')

#feature scaling
from sklearn.preprocessing import MinMaxScaler
norm = MinMaxScaler().fit(train_both)
train_us = norm.transform(train_us)

norm = MinMaxScaler().fit(train_dk)
train_dk = norm.transform(train_dk)

norm = MinMaxScaler().fit(train_both)
train_both = norm.transform(train_both)

data = norm.transform(data)

#train-test split
from sklearn.model_selection import train_test_split
x_train_us, x_test_us, y_train_us, y_test_us = train_test_split(train_us, labels_us, test_size=0.2)
x_train_dk, x_test_dk, y_train_dk, y_test_dk = train_test_split(train_dk, labels_dk, test_size=0.2)

x_train_both = np.concatenate((x_train_us, x_train_dk), axis=0)
x_test_both = np.concatenate((x_test_us, x_test_dk), axis=0)
y_train_both = np.concatenate((y_train_us, y_train_dk), axis=0)
y_test_both = np.concatenate((y_test_us, y_test_dk), axis=0)

#model training 
from sklearn.pipeline import Pipeline
from sklearn.model_selection import ShuffleSplit, cross_val_score, GridSearchCV
import xgboost as xgb
from xgboost import XGBClassifier

rf = XGBClassifier(random_state=0, learning_rate= 0.1, verbosity=1, n_estimators=128, max_depth=4)
pipeline = Pipeline(steps=[('m',rf)])

#fitting model
pipeline.fit(x_train_both, y_train_both)
y_pred_both = pipeline.predict(x_test_both)

#prediction
new_pred = pipeline.predict(data)
print_pred = ''
if(new_pred == 1):
    print_pred = "Autism Positive"
else:
    print_pred = "Autism Negative"

#report accuracy. 
from sklearn.metrics import roc_curve, auc
fpr, tpr, thresholds = roc_curve(y_test_both, y_pred_both)
roc_auc = auc(fpr, tpr)
confidence_score = round(roc_auc*100)
confidence_score_str = f"{confidence_score}%"

