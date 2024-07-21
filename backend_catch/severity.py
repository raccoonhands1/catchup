import boto3
import json
from botocore.exceptions import ClientError
import os
from dotenv import load_dotenv
import string

load_dotenv()

# Print AWS credentials for debugging (make sure not to expose these in production)
print(os.getenv('AWS_ACCESS_KEY_ID'))
print(os.getenv('AWS_SECRET_ACCESS_KEY'))

# Initialize the Bedrock client
brt = boto3.client("bedrock-runtime", region_name="us-east-1")
model_id = "meta.llama3-8b-instruct-v1:0"
company_context = ""
user_role_context = ""

def changeUserRoleContext(new_context):
    global user_role_context
    user_role_context = new_context

def changeCompanyContext(new_context):
    global company_context
    company_context = new_context

def extract_keyword(response_text):
    # Remove punctuation from the response text
    response_text_clean = response_text.translate(str.maketrans('', '', string.punctuation))
    for word in response_text_clean.split():
        if word in {"high", "medium", "low"}:
            return word
    return "unknown"  # Return "unknown" if no valid severity is found

def getSeverity(type_of_context="", summaries=[]): 
    global company_context
    global user_role_context

    if(type_of_context == "" or summaries == [] or user_role_context == ""):
        print("No context provided or research papers provided")
        return -1

    for summary in summaries:
        print(summary)
        prompt = (
            f"The purpose of the user's company is as follows: {company_context}. "
            f"The role of the user is a {user_role_context}. "
            f"Please rate the level of impact (i.e., high, medium, low) the following {type_of_context} summaries might have on this company and the user's role within the company."
            f"1. High: If there is a significant impact on both the company and the user's role.\n"
            f"2. Medium: If there is a significant impact on either the company or the user's role, but not both.\n"
            f"3. Low: If there is little to no impact on both the company and the user's role.\n\n"
            f"Examples:\n"
            f"- If the user is a graphics researcher at a gaming company, a summary about a new robotics technology would likely have a low impact.\n"
            f"- If the user is a UX designer at a tech company, a summary about a new UX strategy would likely have a high impact.\n"
            f"- If the company focuses on developing software for NVIDIA GPUs, a summary about a new CPU developed by Intel would likely have a medium impact.\n\n"
            f"Summary: {summary}\n"
            f"Provide a single word response: high, medium, or low. Do not provide any other reasoning. \n\n"
        )

        try:
            # Create the request body
            request_body = json.dumps({
                "prompt": prompt,
                "temperature": 0.20,
                "top_p": 0.7,
                "max_gen_len": 512
            })

            # Invoke the model with the request
            response = brt.invoke_model(modelId=model_id, body=request_body)
            
            # Decode the response body
            model_response = json.loads(response["body"].read())

            # Extract and print the response text
            response_text = model_response.get("generation", "").lower()
            response_text = extract_keyword(response_text)
            print(f"Response for paper summary:\n{response_text}\n")
        
        except (ClientError, Exception) as e:
            print(f"ERROR: Can't invoke '{model_id}' for the summary '{summary}'. Reason: {e}")

    return response_text


if __name__ == "__main__":
    # Test usage
    changeCompanyContext("user's company is a tech company that specializes in developing software for the gaming industry.")
    changeUserRoleContext("graphics researcher")
    getSeverity("research papers", [
        "An RTX 3090 GPU is released by NVIDIA with 24GB of GDDR6X memory.", 
        "Robotics research concludes that new forms of airplanes are viable",
        "Halo Infinite releases a new DLC and its graphics are powered by Unreal Engine 5 and a new RTX technique", 
        "New Elden Ring trailer was released with innovative new gameplay design choices", 
        "Fallout Creation Engine disliked by popular consensus"
    ])