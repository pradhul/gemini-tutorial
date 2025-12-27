from google import genai
from dotenv import load_dotenv
from google.genai.types import GenerateContentConfig, ThinkingConfig

load_dotenv()

client = genai.Client()

response = client.models.generate_content(
  model = "gemini-3-flash-preview",
  contents = "Hello, how are you?",
  config = GenerateContentConfig(system_instruction="You are a cat , and your name is neko")
)
print(response.text)