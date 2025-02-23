from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
import re
import dateparser
import google.generativeai as genai
import nltk
from nltk.tokenize import sent_tokenize

# Load NLP model
try:
    print("[INFO] Loading NLP model...")
    nlp = spacy.load("en_core_web_sm", disable=["parser", "tagger"])
except OSError:
    print("[WARNING] SpaCy model not found. Downloading now...")
    import subprocess
    subprocess.run(["python", "-m", "spacy", "download", "en_core_web_sm"])
    nlp = spacy.load("en_core_web_sm", disable=["parser", "tagger"])
print("[SUCCESS] NLP model loaded.")

# Configure Gemini API
GEMINI_API_KEY = "AIzaSyA7muIhx00seoQrQ9pjnFAA9MqzJIrVLt8"
genai.configure(api_key=GEMINI_API_KEY)
print("[INFO] Gemini API configured.")

# Initialize Flask app
app = Flask(__name__)
CORS(app)
print("[INFO] Flask server initialized.")

# Ensure NLTK tokenizer is available
nltk.download("punkt")

def extract_actions(text):
    """Extract action items, dates, and key discussion points."""
    print(f"[INFO] Received text for extraction: {text}")

    if not text.strip():
        print("[WARNING] Empty text received.")
        return {"actions": [], "dates": [], "key_points": []}

    doc = nlp(text)
    actions, dates, key_points = [], [], []

    # Extract dates
    for ent in doc.ents:
        if ent.label_ in ["DATE", "TIME"]:
            parsed_date = dateparser.parse(ent.text)
            date_value = parsed_date.strftime("%Y-%m-%d %H:%M:%S") if parsed_date else ent.text
            dates.append(date_value)
    print(f"[INFO] Extracted Dates: {dates}")

    # Identify action items
    action_regex = r"\b(will|should|must|need to|plan to|scheduled to|have to|aim to|intend to|expect to|decided to|agreed to)\b"
    for sent in sent_tokenize(text):
        if re.search(action_regex, sent, re.IGNORECASE):
            actions.append(sent.strip())
    print(f"[INFO] Extracted Actions: {actions}")

    # Extract key discussion points using Gemini AI
    try:
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(f"Extract key discussion points from: {text}")
        if response and hasattr(response, "text"):
            key_points = [line.strip() for line in response.text.split("\n") if line.strip()]
        print(f"[INFO] Extracted Key Points: {key_points}")
    except Exception as e:
        print(f"[ERROR] Gemini API Error: {str(e)}")
        key_points = ["(Failed to extract key points due to API error)"]

    return {"actions": actions, "dates": dates, "key_points": key_points}

@app.route("/extract", methods=["POST"])
def extract():
    """API endpoint to extract action items from the provided text."""
    try:
        data = request.get_json()
        text = data.get("text", "").strip()

        if not text:
            print("[ERROR] No text provided in request.")
            return jsonify({"error": "No text provided"}), 400

        result = extract_actions(text)
        print(f"[SUCCESS] Extraction result: {result}")
        return jsonify(result)

    except Exception as e:
        print(f"[ERROR] Unexpected error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("[INFO] Starting Flask server on http://127.0.0.1:5000")
    app.run(debug=True)
