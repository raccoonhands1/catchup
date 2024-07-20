import boto3
import json
from botocore.exceptions import ClientError



# Initialize the Bedrock client
brt = boto3.client("bedrock-runtime", region_name="us-east-1")

model_id = "amazon.titan-text-express-v1"
company_context = "A company who works on developing gaming software"

research_papers = [
    "An RTX 3090 GPU is released by NVIDIA with 24GB of GDDR6X memory.",
    "Pigs have learned to fly!",
    "Halo infinite releases a new DLC and its graphics are powered by Unreal Engine 5 and a new RTX technique",
]

text_generation_config = {
    "maxTokenCount": 512,
    "temperature": 0.5,
    "topP": 0.9
}

# Iterate over each research paper summary
for paper in research_papers:
    prompt = f"The purpose of the user's company is as follows: {company_context}. Please rate the level of impact (i.e., high, medium, low) the following research paper summaries might have on this company provided its context. Give only a 1 word response, that being high, medium, or low. \n\nSummary: {paper}"
    
    native_request = {
        "inputText": prompt,
        "textGenerationConfig": text_generation_config,
    }

    request = json.dumps(native_request)

    try:
        # Invoke the model with the request
        response = brt.invoke_model(modelId=model_id, body=request)
        
        # Decode the response body
        model_response = json.loads(response["body"].read())

        # Extract and print the response text
        response_text = model_response["results"][0]["outputText"]
        print(f"Response for paper summary:\n{response_text}\n")
    
    except (ClientError, Exception) as e:
        print(f"ERROR: Can't invoke '{model_id}' for the summary '{paper}'. Reason: {e}")
