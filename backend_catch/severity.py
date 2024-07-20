import boto3
import json
from botocore.exceptions import ClientError

# Initialize the Bedrock client
brt = boto3.client("bedrock-runtime", region_name="us-east-1")
model_id = "amazon.titan-text-express-v1"
company_context = ""

def changeCompanyContext(new_context):
    global company_context
    company_context = new_context

#type of context should be a string, "research papers" or "market space information". The second argument should be an array of summary strings
def getSeverity(type_of_context = "", summaries = []): 
    global company_context

    if(type_of_context == "" or summaries == []):
        print ("no context provided or research papers provided")
        return -1

    #this function takes in summaries, not full articles. 
    
    # TEST DATA FOR FUNCTION
    # summaries = [
    #     "An RTX 3090 GPU is released by NVIDIA with 24GB of GDDR6X memory.",
    #     "Pigs have learned to fly!",
    #     "Halo infinite releases a new DLC and its graphics are powered by Unreal Engine 5 and a new RTX technique",
    # ]

    text_generation_config = {
        "maxTokenCount": 512,
        "temperature": 0.5,
        "topP": 0.9
    }

    for summary in summaries:
        prompt = f"The purpose of the user's company is as follows: {company_context}. Please rate the level of impact (i.e., high, medium, low) the following {type_of_context} summaries might have on this company provided its context. Give only a 1 word response, that being high, medium, or low. \n\nSummary: {summary}"
        
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
       
    return response_text
    #2 different contexts and similiarities for each context. Market Space and Research

changeCompanyContext("user's company is a tech company that specializes in developing software for the gaming industry.")
getSeverity("research papers", ["An RTX 3090 GPU is released by NVIDIA with 24GB of GDDR6X memory.", "Pigs have learned to fly!", "Halo infinite releases a new DLC and its graphics are powered by Unreal Engine 5 and a new RTX technique"])