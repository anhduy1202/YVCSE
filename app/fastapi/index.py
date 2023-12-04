from fastapi import FastAPI
from hume import HumeStreamClient
from hume.models.config import LanguageConfig
from collections import defaultdict
import os
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=dotenv_path)


class Comment(BaseModel):
    comment_data: List[str]


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/analyze")
async def analyze(comment: Comment):
    client = HumeStreamClient(os.getenv("HUME_API_KEY"))
    config = LanguageConfig()
    res = []
    comment_with_emotion = []
    async with client.connect([config]) as socket:
        for sample in comment.comment_data:
            result = await socket.send_text(sample)
            emotions = result["language"]["predictions"][0]["emotions"]
            comment_with_emotion.append([sample, emotions])
            aggregated_scores = defaultdict(float)
            count_per_emotion = defaultdict(int)

            for emotion in emotions:
                aggregated_scores[emotion["name"]] += emotion["score"]
                count_per_emotion[emotion["name"]] += 1

            # Calculate mean scores
            mean_scores = {
                emotion: aggregated_scores[emotion] / count_per_emotion[emotion]
                for emotion in aggregated_scores
            }

            # Rank emotions based on mean scores
            ranked_emotions = sorted(
                mean_scores.items(), key=lambda x: x[1], reverse=True
            )

            top_emotions = ranked_emotions[0]
            # round the score to 2 decimal places
            top_emotions = (top_emotions[0], round(top_emotions[1], 2))
            res.append(list(top_emotions))

    # Sort the emotions based on the score
    # Create a dictionary to store the highest score for each emotion
    emotion_dict = {}
    for emotion, score in res:
        if emotion not in emotion_dict or score > emotion_dict[emotion]:
            emotion_dict[emotion] = score

    # Convert the dictionary back to a list
    result = [[emotion, score] for emotion, score in emotion_dict.items()]
    result.sort(key=lambda x: x[1], reverse=True)
    # Sort the emotions based on the score, only take the top 3
    for emotion in comment_with_emotion:
        title, properties = emotion
        properties.sort(key=lambda x: x["score"], reverse=True)
        emotion[1] = properties[:5]
    return {"result": result, "comment_with_emotion": comment_with_emotion}
