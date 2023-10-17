
# TO BE USED IN pythonanywhere https://www.pythonanywhere.com/user/LeonWee/files/home/LeonWee/mysite/flask_app.py?edit

from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt import JWT, jwt_required, current_identity
from flask_cors import CORS
import datetime
import os


basedir = os.path.abspath(os.path.dirname(__file__)) # /home/LeonWee/mysite

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir,"db.sqlite")
# app.config["JWT_EXPIRATION_DELTA"] = datetime.timedelta(days=1)
# CORS(app, resources={r"/*": {"origins": "*"}})
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
# JWT setup
app.config['SECRET_KEY'] = 'anything'

def authenticate(username, password):
    user = User.query.filter_by(username=username).first()
    if user and password == user.password:
        return user

def identity(payload):
    return User.query.filter_by(id=payload["identity"]).first()

jwt = JWT(app, authenticate, identity)

@app.route('/users', methods=['GET'])
def users():
    users = User.query.all()
    return jsonify([user.json() for user in users])

@app.route("/whoami")
@jwt_required()
def whoami():
    return {"username":current_identity.username}


@app.route('/', methods=["GET","POST"])
def index():
    if request.method=="POST":
        return {"about":"This is an API for a blog Get / to read more."}
    return render_template("index.html")


## Add model for BlogPost
class BlogPost(db.Model):
    # no need init!
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80))
    content = db.Column(db.String(400))

    def json(self):
        return {"id": self.id, \
                "title": self.title, \
                "content": self.content}

## Add model for User
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    password = db.Column(db.String(100))

    def json(self):
        return {"id": self.id, \
                "username": self.username, \
                "password": self.password}

@app.route('/newuser', methods=['POST'])

def newuser():
    json_data = request.get_json()
    username = json_data["username"]
    password = json_data["password"]
    users = User.query.all()
    for u in users:
        if username == u.username:
            return { "Error": "User already exists" }
    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    return { "Success": "New user " + username + " created" }



db.create_all()
####

@app.route('/create', methods=['POST'])
def createPost():
    json_data = request.get_json(force=True)
    title = json_data["title"]
    content = json_data["content"]
    post = BlogPost(title=title, content=content)
    db.session.add(post)
    db.session.commit()
    return post.json()



@app.route('/posts/<int:id>')
def getPost(id):
    post = BlogPost.query.get(id)
    return post.json()


@app.route('/posts')
def getAllPosts():
    posts = BlogPost.query.all()
    json_posts = []
    for post in posts:
        json_posts.append(post.json())
    print(json_posts)
    return jsonify(json_posts)
