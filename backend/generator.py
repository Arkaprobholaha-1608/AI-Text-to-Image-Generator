from transformers import CLIPTextModel, CLIPTokenizer
from diffusers import StableDiffusionPipeline
import torch

# Load the tokenizer and text encoder
tokenizer = CLIPTokenizer.from_pretrained("openai/clip-vit-base-patch32")
text_encoder = CLIPTextModel.from_pretrained("openai/clip-vit-base-patch32")

# Load the Stable Diffusion pipeline
pipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5")
pipe.to("cuda" if torch.cuda.is_available() else "cpu")

def generate_image(prompt):
    # Tokenize and encode the text
    inputs = tokenizer(prompt, return_tensors="pt")
    inputs = {key: value.to("cuda" if torch.cuda.is_available() else "cpu") for key, value in inputs.items()}
    
    # Generate image
    image = pipe(prompt).images[0]
    return image
