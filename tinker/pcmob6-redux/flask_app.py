from flask import Flask, render_template, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from flask_jwt import JWT, current_identity, jwt_required
from flask_cors import CORS
import datetime
import os

app = Flask(__name__)
app.config["DEBUG"] = True

# EDIT THE ____ ON THE NEXT LINE

basedir = os.path.abspath(os.path.dirname(__file__)) # /home/LeonWee/mysite

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir,"db.sqlite")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SECRET_KEY'] = 'anything'
app.config["JWT_EXPIRATION_DELTA"] = datetime.timedelta(days=1)
CORS(app, resources={r"/*": {"origins": "*"}})
db = SQLAlchemy(app)


class BlogPosts(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(4096))
    content = db.Column(db.String(4096))

    def json(self):
        return {"id": self.id, "title": self.title, "content": self.content}

class Users(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(4096), unique=True)
    password = db.Column(db.String(4096))

    def json(self):
        return {"id": self.id, "username": self.username, "password": self.password}

db.create_all()

@app.route('/', methods=['GET','POST'])
def home():
    if request.method == 'POST':
        return {'about': 'This is a Flask API for PCMOB5'}
    # Home Page to display info on how to use API
    return { "message": "You are all set for PCMOB6" }

@app.route('/users', methods=['GET'])
def users():
    users = Users.query.all()
    return jsonify([user.json() for user in users])


@app.route('/newuser', methods=['POST'])
def newuser():
    if request.is_json:
        username = request.get_json()['username']
        #Check if user already exists
        user = Users.query.filter(Users.username == username).first()
        if user is None:
            data = request.get_json()
            new_user = Users(username=data['username'], password=data['password'])
            db.session.add(new_user)
            db.session.commit()
            return {"Message": f"User {new_user.username} has been added successfully."}
        elif user is not None:
            return {"Error": "User already exists"}
    else:
        return abort(400)
    
@app.route('/create', methods=['POST'])
@jwt_required()
def createPost():
    if request.is_json:
        try:
            json_data = request.get_json()
            title = json_data["title"]
            content = json_data["content"]
            post = BlogPosts(title=title, content=content)
            db.session.add(post)
            db.session.commit()
            return post.json()
        except:
            abort(400)
    else:
        abort(400)

@app.route('/posts')
@jwt_required()
def getAllPosts():
    posts = BlogPosts.query.all()
    json_posts = []
    for post in posts:
        json_posts.append(post.json())
    return jsonify(json_posts)
    ## Alternatively...
    # return jsonify([post.json() for post in posts])

@app.route('/posts/<int:id>', methods=['GET', 'DELETE', 'PUT'])
@jwt_required()
def getPost(id):
    # find the post with the given id before deciding what to do with it
    post = BlogPosts.query.get(id)
    if post is None:
        abort(404)
    else:
        if request.method == 'DELETE':
            db.session.delete(post)
            db.session.commit()
            return {"Message": "Post id " + str(id) + " has been deleted."}

        if request.method == 'PUT':
            json_data = request.get_json()

            # check if the key exists in the dictionary
            if 'title' in json_data:
                post.title = json_data['title']
            if 'content' in json_data:
                post.content = json_data['content']
            else:
                abort(400)
            db.session.commit()
            return post.json()
        else:
            return post.json()


@app.route('/whoami', methods=['GET'])
@jwt_required()
def whoami():
    return {"username": current_identity.username}

def authenticate(username,password):
    user = Users.query.filter_by(username=username).first()
    if user and password == user.password:
        return user

def identity(payload):
    user_id = payload["identity"]
    return Users.query.filter_by(id=user_id).scalar()

jwt = JWT(app,authenticate,identity)

# app.run(host='0.0.0.0', port=81)

