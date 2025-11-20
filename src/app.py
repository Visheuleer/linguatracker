from flask import Flask, render_template
from app.config import settings
from app.controllers import auth_controller


app = Flask(__name__, template_folder=settings.templates_path, static_folder=settings.static_path)
app.secret_key = settings.app_secret_key
app.register_blueprint(auth_controller, url_prefix='/auth')

@app.route("/")
def login():
    return render_template("login.html")

@app.route("/dashboard")
def dashboard():
    return "Usuário logado!"


if __name__ == "__main__":
    app.run(debug=True)