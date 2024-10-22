
import pandas as pd
import numpy as np
import csv
import collections
import os

#from demo_data create map where each ID associated with 0(NT) or 1(ASD)
ID = {}
Dem_file = os.path.abspath('Backend/DemoData.csv')
ID_reader = pd.read_csv(Dem_file, nrows=159, header=None)
line = 0
id_col = 0
diag_col = 1
for header,row in ID_reader.iterrows():
    if line == 0:
        print("processing")
    else:
        if(row[diag_col] == 'TD'):
            ID[row[id_col]] = 0
        else:
            ID[row[id_col]] = 1
    line += 1
    
#add colomn to eGeMAPS_us with 0 or 1 score using ID label
US_file = os.path.abspath('Backend/egemaps_us.csv')
us_reader = pd.read_csv(US_file, nrows = 328, header=0)
diag_chart_us = []
for header, row in us_reader.iterrows():
    diag_chart_us.append(ID[row["ID"]])
diag_chart_us = pd.DataFrame(diag_chart_us, columns=['Diagnosis'])
us_reader['Diagnosis'] = diag_chart_us

#add colomn to eGeMAPS_dk with 0 or 1 score using ID label
DK_file = os.path.abspath('Backend/egemaps_dk.csv')
dk_reader = pd.read_csv(DK_file, nrows = 767, header=0)
diag_chart_dk = []
for header, row in dk_reader.iterrows():
    diag_chart_dk.append(ID[row["ID"]])
diag_chart_dk = pd.DataFrame(diag_chart_dk, columns=['Diagnosis'])
dk_reader['Diagnosis'] = diag_chart_dk

# clean up data. delete un-needed coloumns and combine both for train_both dataset
delete_cols = ['name', 'frameTime', 'ID', 'story_type', 'condition', 'trial', 'country', 'feature_set', 'Unnamed']

train_us = us_reader
train_dk = dk_reader

for i in range(len(delete_cols)):
    train_us.pop(delete_cols[i])
    train_dk.pop(delete_cols[i])

train_both = pd.concat([train_us, train_dk], ignore_index=True)