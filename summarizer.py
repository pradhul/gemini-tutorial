from dotenv import load_dotenv
from google import genai 
import sys

from google.genai.types import GenerateContentConfig

load_dotenv()

client = genai.Client()

# read the file content from command line argument
# eg python summarizer.py <yourfile>
f= open(sys.argv[1],'r')    
file_content = f.read()
f.close()

#Check if the file is empty
if len(file_content) == 0:
    print("File is empty")
    exit()

response = client.models.generate_content(
  model = "gemini-3-flash-preview",
  contents = file_content,
  config = GenerateContentConfig(system_instruction="You are a summarizer, and you are given a text, and you need to summarize it in a short and concise way.")
)
print("Summary:\n", response.text)
print("Total tokens used:", response.usage_metadata.total_token_count)