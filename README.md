# PYE

## Description: 
PYE (Prognosis Youth Evaluation) is a full-stack application aimed at improving Autism Spectrum Disorder (ASD) diagnosis through vocal biomarkers. Coded with a react frontend and flask backend, this application allows clinicians and users to upload vocal recordings and receive real-time diagnostic predictions powered by a multilingual-trained XGBoost Model. Since its launch, PYE has conducted 50+ diagnoses, providing accessible and virtual evaluations. 

## Requirements: 
- Python 3.12.7
- npm (Node Package Manager)

## Steps to Run: 

### 1. Clone the Repository
```bash
git clone https://github.com/dsethia1/pye.git
cd pye
```
### 2. Set Up Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate   # On macOS/Linux
# OR
.\venv\Scripts\activate    # On Windows
```
### 3. Install Required Dependencies
```bash
pip install -r requirements.txt
```
### 4. Set Up Frontend
```bash
cd Frontend
npm install
```
Build the React Application
```bash
npm run build
```
### 5. Run Flask Backend
Return to root directory
```bash
cd ..
```
Run app.py (default port is 5000)
```bash
python app.py
```



