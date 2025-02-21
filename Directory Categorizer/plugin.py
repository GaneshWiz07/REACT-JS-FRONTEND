import os
import logging
from dotenv import load_dotenv
import shutil
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed

# Configure logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

# Configure the Gemini API (Placeholder API endpoint and key)
GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent'
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')  # Get API key from environment variable
if not GEMINI_API_KEY:
    raise ValueError("Please set the GEMINI_API_KEY environment variable")

# Define the source and destination directories
source_dir = r'S:\Test-1'  # Change this to your source directory
dest_dir = r'S:\TEst-2'  # Change this to your destination directory

# Define the 10 maximum categories you want to use
MAX_CATEGORIES = 10
PREDEFINED_CATEGORIES = [
    "SEO", "Security", "Performance", "E-commerce", "Social Media", "Analytics",
    "Backup", "Customization", "Themes", "User Management"
]

# Add a function to test network connectivity
def test_network_connection():
    try:
        response = requests.get('https://www.google.com', timeout=5)
        logger.info(f"Network connection test successful. Status code: {response.status_code}")
        return True
    except requests.RequestException as e:
        logger.error(f"Network connection test failed: {e}")
        return False

# Modify the existing function to include more robust error handling
def get_plugin_category_from_gemini(plugin_name):
    try:
        # First, test network connectivity
        if not test_network_connection():
            logger.error("Network connectivity test failed")
            return ['Uncategorized']

        # Prepare headers and payload according to Gemini API specifications
        headers = {
            'Content-Type': 'application/json',
            'x-goog-api-key': GEMINI_API_KEY
        }

        # Create the payload for the Gemini API request
        payload = {
            "contents": [{
                "parts": [{
                    "text": f"Please categorize the WordPress plugin named '{plugin_name}'. Provide a list of categories from the following options: {', '.join(PREDEFINED_CATEGORIES)}. If it's not related to any of the categories, respond with 'Uncategorized'."
                }]
            }]
        }

        # Make the request with extended timeout and detailed logging
        logger.debug(f"Sending request to {GEMINI_API_URL}")
        response = requests.post(
            GEMINI_API_URL, 
            json=payload, 
            headers=headers,
            timeout=10  # Increased timeout
        )
        
        # Raise an exception for bad responses
        response.raise_for_status()
        
        logger.info("Request successful")
        response_data = response.json()
        
        # Extract the text from the Gemini API response
        if 'candidates' in response_data and response_data['candidates']:
            response_text = response_data['candidates'][0]['content']['parts'][0]['text'].strip()
            
            # Parse the categories
            categories = [category.strip() for category in response_text.split(',')]
            return categories if categories else ['Uncategorized']
        else:
            logger.error("No valid response from Gemini API")
            return ['Uncategorized']

    except requests.exceptions.ConnectionError as e:
        logger.error(f"Connection Error: {e}")
        logger.error("Possible causes:")
        logger.error("1. No internet connection")
        logger.error("2. DNS resolution failed")
        logger.error("3. Firewall blocking the connection")
        logger.error("4. Proxy issues")
    except requests.exceptions.Timeout:
        logger.error("Request timed out")
    except requests.exceptions.RequestException as e:
        logger.error(f"An error occurred: {e}")
    
    return ['Uncategorized']

def categorize_plugin(categories):
    # Match tags to predefined categories
    matched_categories = [category for category in PREDEFINED_CATEGORIES if category.lower() in (tag.lower() for tag in categories)]
    
    if not matched_categories:
        matched_categories = ['Uncategorized']  # Default category if no match
    
    # Return up to MAX_CATEGORIES categories
    return matched_categories[:MAX_CATEGORIES]

def move_plugin(folder):
    folder_path = os.path.join(source_dir, folder)
    if os.path.isdir(folder_path):
        # Fetch the category from Gemini
        categories = get_plugin_category_from_gemini(folder)
        
        # Get up to MAX_CATEGORIES categories
        matched_categories = categorize_plugin(categories)
        
        for category in matched_categories:
            # Create the destination category folder if it doesn't exist
            category_folder = os.path.join(dest_dir, category)
            os.makedirs(category_folder, exist_ok=True)

            # Move the folder to the appropriate category folder
            shutil.move(folder_path, category_folder)
            print(f'Moved {folder} to {category_folder}')
            break  # Move to the first matched category

# Use ThreadPoolExecutor to process folders in parallel
with ThreadPoolExecutor(max_workers=8) as executor:  # Set max_workers to 8
    futures = {executor.submit(move_plugin, folder): folder for folder in os.listdir(source_dir)}

    for future in as_completed(futures):
        folder = futures[future]
        try:
            future.result()  # Wait for the result to complete
        except Exception as e:
            print(f'Error moving {folder}: {e}')

print("Plugins have been categorized and moved successfully!")