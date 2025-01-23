from flask import Flask, request, render_template, jsonify, redirect, url_for, session
import numpy as np
import pandas as pd
import pickle

# Flask app setup
app = Flask(__name__)
app.secret_key = '@1234'  # Replace with a strong, random key

# Load dataset and model
sym_des = pd.read_csv(r"C:\\Users\\OM\\OneDrive\\Desktop\\main\\symtoms_df.csv")
precautions = pd.read_csv(r"C:\Users\\OM\\OneDrive\\Desktop\\main\\precautions_df.csv")
description = pd.read_csv(r"C:\\Users\\OM\\OneDrive\\Desktop\\main\\description.csv")
svc = pickle.load(open('C:\\Users\\OM\\OneDrive\\Desktop\\main\\svc.pkl', 'rb'))

# Helper functions
def helper(dis):
    desc = description[description['Disease'] == dis]['Description'].iloc[0]
    pre = precautions[precautions['Disease'] == dis][['Precaution_1', 'Precaution_2', 'Precaution_3', 'Precaution_4']].values[0]
    return desc, pre

# Mapping dictionaries
symptoms_dict = { ... }  # Your symptoms dictionary
diseases_list = { ... }  # Your diseases dictionary

def get_predicted_value(patient_symptoms):
    input_vector = np.zeros(len(symptoms_dict))
    for item in patient_symptoms:
        input_vector[symptoms_dict.get(item, 0)] = 1
    return diseases_list[svc.predict([input_vector])[0]]

# Routes
@app.route('/')
def index():
    if 'username' in session:
        return redirect(url_for('home'))
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        # Simple authentication check
        if username == 'testuser' and password == 'password':  # Replace with real checks
            session['username'] = username
            return redirect(url_for('home'))
        else:
            return render_template('login.html', error="Invalid username or password.")
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

@app.route('/predict', methods=['GET', 'POST'])
def home():
    if 'username' not in session:
        return redirect(url_for('login'))
    if request.method == 'POST':
        symptoms = request.form.get('symptoms')
        if symptoms.lower() == "symptoms":
            message = "Please either write symptoms or you have written misspelled symptoms"
            return render_template('index.html', message=message)
        else:
            user_symptoms = [symptom.strip() for symptom in symptoms.split(',')]
            predicted_disease = get_predicted_value(user_symptoms)
            dis_des, precautions = helper(predicted_disease)
            return render_template('index.html', predicted_disease=predicted_disease, dis_des=dis_des, my_precautions=precautions)
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
