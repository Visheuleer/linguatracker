import os
import dotenv

dotenv.load_dotenv()

class Settings:
    def __init__(self):
        self.app_secret_key = os.getenv('APP_SECRET_KEY')
        self.templates_path = os.getenv('TEMPLATES_FOLDER')
        self.static_path = os.getenv('STATIC_FOLDER')
        self.firebase_auth_url = os.getenv('FIREBASE_AUTH_URL')

settings = Settings()