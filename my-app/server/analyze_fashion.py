import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
from io import BytesIO
import requests

app = FastAPI()

class ImageRequest(BaseModel):
    imagePath: str  # The S3 URL of the image

@app.post("/analyze-image/")
async def analyze_image(req: ImageRequest):
    image_path = req.imagePath

    try:
        # Fetch the image from the URL
        response = requests.get(image_path, stream=True)
        response.raise_for_status()  # Raise an error for bad responses
        image = Image.open(BytesIO(response.content)).convert("RGB")

        # Load the Pre-Trained BLIP Model
        processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
        model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")

        # Process the Image
        inputs = processor(image, return_tensors="pt")
        output = model.generate(**inputs)
        caption = processor.decode(output[0], skip_special_tokens=True)

        return {"caption": caption}

    except requests.exceptions.RequestException as req_err:
        raise HTTPException(status_code=400, detail=f"Error fetching image: {str(req_err)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")