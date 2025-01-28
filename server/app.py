from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
# import pandas as pd
import numpy as np
# from sklearn.preprocessing import StandardScaler

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Allow only requests from the React app's domain

# Global variables to hold the model and scaler
model = None
scaler = None

# Load the trained model and scaler
try:
    model = joblib.load('D:/Project Vedant/Btech Project/server/models/model.pkl')  # Path to your model
    scaler = joblib.load('D:/Project Vedant/Btech Project/server/models/scaler.pkl')  # Path to your scaler
    print("Model and scaler loaded successfully.")
except Exception as e:
    print(f"Error loading model or scaler: {e}")

# List of remedy columns
remedy_columns = [
    'Adopt renewable energy for machinery and improve transport routes.',
       'Engage in community programs for awareness and participation.',
       'Implement carbon capture technologies and monitor emissions.',
       'Improve insulation and reduce fuel usage in machinery.',
       'Incorporate AI for energy optimization in machinery.',
       'Increase efficiency of machinery and optimize mine size.',
       'Optimize supply chains to minimize transportation distances.',
       'Plant trees and restore vegetation around the mining area.',
       'Shift to sustainable mining practices and carbon offset projects.',
       'Switch to electric or hybrid vehicles for transportation.',
       'Use advanced mining techniques to reduce environmental impact.',
       'Transition to renewable energy sources.',
       'Upgrade machinery to energy-efficient models.',
       'Enhance waste recycling practices.',
       'Install real-time emission monitoring systems.',
       'Implement smart water usage technologies.',
       'Use biofuels in machinery.',
       'Develop on-site renewable energy generation.',
       'Collaborate with local communities for conservation.',
       'Establish biodiversity protection zones.',
       'Adopt low-impact mining techniques.',
       'Transition to electric or hybrid transportation.',
       'Use sustainable materials in operations.',
       'Apply soil stabilization to prevent erosion.',
       'Optimize ventilation systems to reduce energy use.',
       'Educate staff on energy-saving practices.',
       'Conduct regular carbon audits.', 'Invest in green certifications.',
       'Create carbon sink projects, like reforestation.',
       'Enhance supply chain collaboration for sustainability.',
       'Minimize resource over-extraction.',
       'Adopt remote operation technologies to cut travel',
       'Use AI for predictive maintenance of machinery.',
       'Reduce water pollution by using advanced filters.',
       'Replace fossil fuel-based heating systems.',
       'Support research in sustainable mining innovations.'
]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if the model and scaler are loaded
        if model is None or scaler is None:
            return jsonify({'error': 'Model or scaler not loaded properly'}), 500
        
        # Get JSON data from the frontend request
        data = request.get_json()

        # Check if the required fields are present
        required_columns = [
            'Coal_Mined_CF(tons)', 'Mine_Size_CF(tons/m^2)', 
            'Machinery_Carbon_CF(tons)', 'Transportation_Carbon_CF(tons)'
        ]
        
        # If any of the required columns are missing, return an error
        if not all(col in data for col in required_columns):
            return jsonify({'error': 'Missing required fields'}), 400

        # Ensure the input values are numbers
        for col in required_columns:
            if not isinstance(data[col], (int, float)):
                return jsonify({'error': f"Invalid value for {col}, must be a number."}), 400
        
        # Prepare the input data for prediction
        input_data = [data[col] for col in required_columns]
        
        # Scale the input data using the scaler
        scaled_input = scaler.transform([input_data])

        reshaped_input=np.expand_dims(scaled_input, axis=1)

        # Make the prediction using the trained model
        prediction = model.predict(reshaped_input)
        prediction = (prediction>0.5).astype(int)
        # Map the model's prediction to the corresponding remedies
        predicted_remedies = []
        for i, value in enumerate(prediction[0]):
            if value == 1:
                predicted_remedies.append(remedy_columns[i])

        # If no remedies are predicted, return a default message
        if not predicted_remedies:
            predicted_remedies = ["No remedies predicted."]
        
        # Return the input data and the predicted remedies as a JSON response
        return jsonify({'input': data, 'predicted_remedies': predicted_remedies})

    except Exception as e:
        # Handle any unexpected errors and return a 500 response
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    # Run the Flask application
    app.run(debug=True)
