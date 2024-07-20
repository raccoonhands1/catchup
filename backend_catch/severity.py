import boto3

# Create an &BR; client in the &region-us-east-1; Region.
bedrock = boto3.client(
    service_name="bedrock",
    region_name="us-east-1"
)

bedrock.list_foundation_models()