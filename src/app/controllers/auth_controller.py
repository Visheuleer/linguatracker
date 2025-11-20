from flask import Blueprint, request, session, jsonify
from app.config import settings
from http import HTTPStatus
import requests

auth_controller = Blueprint('auth_controller', __name__)

@auth_controller.route("/", methods=["POST"])
def login():
    data = request.get_json()
    response = requests.post(settings.firebase_auth_url,
                      json={
                            "email": data["email"],
                            "password": data["password"],
                            "returnSecureToken": True
                            }
                      )

    if response.ok:
        user = response.json()
        session["user_id"] = user["localId"]
        session["id_token"] = user["idToken"]
        return jsonify({"status": "ok"}), HTTPStatus.OK
    else:
        return jsonify({"error": "invalid_credentials"}), HTTPStatus.UNAUTHORIZED