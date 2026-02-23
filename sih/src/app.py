from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn, os, tempfile, pandas as pd
from fuzzywuzzy import fuzz
from gtts import gTTS
import speech_recognition as sr

# -----------------------
# Load datasets
# -----------------------
cities_df = pd.read_csv(
    r"C:\Users\vijay\OneDrive\Desktop\worldcities.csv",
    engine="python",
    on_bad_lines="skip"
)
travel_df = pd.read_csv(
    r"C:\Users\vijay\OneDrive\Desktop\qa_dataset.csv",
    engine="python",
    on_bad_lines="skip"
)

cities_df.columns = cities_df.columns.str.strip().str.lower()
travel_df.columns = travel_df.columns.str.strip().str.lower()

cities_df['city'] = cities_df['city'].str.lower()
travel_df['city'] = travel_df['city'].str.lower()

merged_df = pd.merge(cities_df, travel_df, on="city", how="left")

# -----------------------
# FastAPI app
# -----------------------
app = FastAPI()

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve audio files
tmp_dir = tempfile.gettempdir()
app.mount("/audio", StaticFiles(directory=tmp_dir), name="audio")

# -----------------------
# Helper functions
# -----------------------
def text_to_speech_file(text):
    tts = gTTS(text=text, lang="en")
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3", dir=tmp_dir)
    tts.save(tmp.name)
    return tmp.name


def format_city_info(row):
    return (
        f"🌍 City: {row['city'].title()}, {row.get('country','N/A')}\n"
        f"🏛 Population: {row.get('population','Unknown')}\n"
        f"📍 Coordinates: {row.get('lat','')}, {row.get('lng','')}\n"
        f"🏙 Capital Type: {row.get('capital','N/A')}\n"
        f"🗂 Admin Name: {row.get('admin_name','N/A')}\n"
        f"📍 Attraction: {row.get('attraction','N/A')}\n"
        f"🗓 Best Season: {row.get('best_season','N/A')}\n"
        f"💰 Avg Cost: {row.get('avg_cost','N/A')}\n"
        f"⏳ Recommended Days: {row.get('recommended_days','N/A')}"
    )


# Root
@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}


# -----------------------
# Get city info endpoint
# -----------------------
@app.post("/get_info")
async def get_city_info(text: str = Form(None), audio: UploadFile = None):
    query = text.lower().strip() if text else ""

    # Convert audio to text
    if not query and audio:
        recognizer = sr.Recognizer()
        with sr.AudioFile(audio.file) as source:
            data = recognizer.record(source)
        try:
            query = recognizer.recognize_google(data).lower()
        except:
            query = ""

    if not query:
        msg = "Please provide a query."
        file_path = text_to_speech_file(msg)
        return {"text": msg, "audio": f"/audio/{os.path.basename(file_path)}"}

    # Clean query
    for phrase in ["i want to go", "tell me about", "information on", "info on"]:
        query = query.replace(phrase, "").strip()

    # 1️⃣ Exact match
    exact_match = merged_df[merged_df["city"] == query]
    if not exact_match.empty:
        row = exact_match.iloc[0]
        result = format_city_info(row)
        file_path = text_to_speech_file(result)
        return {"text": result, "audio": f"/audio/{os.path.basename(file_path)}"}

    # 2️⃣ Substring match
    substring_match = merged_df[merged_df["city"].str.contains(query, na=False)]
    if not substring_match.empty:
        row = substring_match.iloc[0]
        result = format_city_info(row)
        file_path = text_to_speech_file(result)
        return {"text": result, "audio": f"/audio/{os.path.basename(file_path)}"}

    # 3️⃣ Fuzzy match
    best_row, best_score = None, 0
    for _, row in merged_df.iterrows():
        score = fuzz.partial_ratio(query, row["city"])
        if score > best_score:
            best_score, best_row = score, row

    if best_score > 75:
        result = format_city_info(best_row)
        file_path = text_to_speech_file(result)
        return {"text": result, "audio": f"/audio/{os.path.basename(file_path)}"}

    # 4️⃣ No match
    msg = "I don't have info on that destination."
    file_path = text_to_speech_file(msg)
    return {"text": msg, "audio": f"/audio/{os.path.basename(file_path)}"}


# -----------------------
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
