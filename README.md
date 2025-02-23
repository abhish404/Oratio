# Voice-Based Action Extraction System

## 📌 Project Overview
This project is a voice-powered action extraction system that listens to conversations, transcribes them into text, and extracts:

- **Action Items** (tasks, responsibilities, commitments)
- **Dates & Times** (deadlines, schedules, meeting dates)
- **Key Discussion Points** (summarized insights from conversations)

### 🔧 It utilizes:
- **Speech Recognition** (`webkitSpeechRecognition`) for voice input
- **Flask API** for backend processing
- **Natural Language Processing (NLP)** using `spaCy` and `nltk`
- **Google Gemini AI** for summarization

## 📂 Features
✅ Real-time Speech-to-Text  
✅ Action Item Extraction using regex & NLP  
✅ Date/Time Identification with `dateparser`  
✅ Key Discussion Summarization using Gemini AI  
✅ Flask API Integration for processing requests  
✅ Web Interface for recording and displaying results  

---

## 🖥 Tech Stack & Dependencies

### 🔹 Backend
- Python 3.8+
- Flask (REST API framework)
- spaCy (NLP)
- nltk (Sentence tokenization)
- dateparser (Date extraction)
- Google Generative AI SDK (Gemini AI integration)

### 🔹 Frontend
- HTML/CSS/JavaScript (Simple UI)
- Web Speech API (`webkitSpeechRecognition` for speech input)

---

## 🚀 Installation & Setup (Beginner-Friendly)

### 1️⃣ Install Python
Ensure you have **Python 3.8+** installed. Check by running:
```sh
python --version
```
If not installed, download from: [Python Downloads](https://www.python.org/downloads/)

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/voice-action-extraction.git
cd voice-action-extraction
```

### 3️⃣ Create a Virtual Environment (Recommended)
```sh
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 4️⃣ Install Required Dependencies
```sh
pip install -r requirements.txt
```
If the `spaCy` model is missing, install it manually:
```sh
python -m spacy download en_core_web_sm
```

### 5️⃣ Set Up Google Gemini API Key
- Get your Google Generative AI API Key from **Google AI Console**
- Set it as an environment variable:
```sh
export GEMINI_API_KEY="your_api_key_here"
```
On Windows:
```sh
set GEMINI_API_KEY="your_api_key_here"
```

---

## 🏃 Running the Project

### Start the Backend (Flask API)
```sh
python app.py
```
✅ API runs on: `http://127.0.0.1:5000/extract`

### Start the Frontend
Simply open the `index.html` file in your browser.

---

## 🎤 How to Use
1️⃣ Click **"Start Recording"** → Speak naturally 🗣  
2️⃣ Click **"Stop Recording"** → Transcript appears in the text box 📝  
3️⃣ Click **"Extract Actions"** → Extracted details appear 🔍  

---

## 📡 API Endpoint

### `POST /extract`
#### **Input:**
```json
{
  "text": "We need to complete the report by Monday. John will handle the presentation."
}
```
#### **Response:**
```json
{
  "actions": ["John will handle the presentation."],
  "dates": ["Monday"],
  "key_points": ["Report completion deadline set for Monday."]
}
```

---

## 🛠 Troubleshooting

❌ **Issue:** "ModuleNotFoundError: No module named 'flask'"  
👉 **Solution:** Run `pip install flask` inside your virtual environment.

❌ **Issue:** "spaCy model not found"  
👉 **Solution:** Run `python -m spacy download en_core_web_sm`

❌ **Issue:** "API key invalid"  
👉 **Solution:** Verify `GEMINI_API_KEY` is set correctly.

---

## 🏆 Future Enhancements

🔹 Improve AI Summarization with fine-tuned models  
🔹 Expand Date Recognition to support multiple formats  
🔹 Add Multi-language Support for global users  
🔹 Deploy on Cloud for real-world use  

---

## 📜 License
This project is open-source and available under the **MIT License**.

---

## 🤝 Contributing
Want to contribute? Follow these steps:
1. Fork the repository
2. Create a new branch:  
   ```sh
   git checkout -b feature-xyz
   ```
3. Make your changes and commit:  
   ```sh
   git commit -m 'Add new feature'
   ```
4. Push your branch:  
   ```sh
   git push origin feature-xyz
   ```
5. Open a **Pull Request** 🚀

Happy coding! 😊

