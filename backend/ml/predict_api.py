from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load models with joblib
attack_model = joblib.load("attack_type_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")
severity_model = joblib.load("severity_model.pkl")
severity_vectorizer = joblib.load("severity_vectorizer.pkl")  # <-- important

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    text = data.get("scenario", "")

    # Attack type prediction
    features_attack = vectorizer.transform([text])
    attack_pred = attack_model.predict(features_attack)[0]

    # Severity prediction (use severity_vectorizer, not the same one!)
    features_severity = severity_vectorizer.transform([text])
    severity_pred = severity_model.predict(features_severity)[0]

    response = {
        "attack_type": str(attack_pred),
        "severity": str(severity_pred)
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=5001)

