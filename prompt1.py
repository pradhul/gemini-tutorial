from google import genai
from dotenv import load_dotenv
from google.genai.types import GenerateContentConfig, ThinkingConfig

load_dotenv()

client = genai.Client()

response = client.models.generate_content(
  model = "gemini-3-flash-preview",
  contents = "How does an AI work in a few words",
  config = GenerateContentConfig(thinking_config=ThinkingConfig(thinking_budget=0))  #this disables thinking
)
print(response.text)