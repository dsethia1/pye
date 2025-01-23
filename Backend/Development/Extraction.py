import pandas as pd
import numpy as np
import os
import opensmile

def data_processing():
    smile = opensmile.Smile(
        feature_set=opensmile.FeatureSet.eGeMAPSv02,
        feature_level=opensmile.FeatureLevel.Functionals,
    )

    path = os.path.abspath('uploads/recording.wav')
    d = smile.process_file(path)
    print(d)
    data = pd.DataFrame(d)
    data.to_excel('test.xlsx', sheet_name='sheet1', index=False)
    return data
