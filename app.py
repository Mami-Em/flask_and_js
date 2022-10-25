from crypt import methods
import requests, os
from urllib import request
from flask import Flask, render_template, jsonify, request
from api import api_key
from flask_socketio import SocketIO, emit

app = Flask('__name__')

app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

# API key
key = api_key()

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_weather', methods = ['POST'])
def get_weather():

    # query for getting weather of a city
    city = request.form.get('city')
    res = requests.get(f"https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={key}")

    # make sure request succeded
    if res.status_code != 200:
        return jsonify({'success': False})

    # get country's weather and country's details
    data = res.json()
    ans = {
        'code': data['sys']['country'],
        'desc': data['weather'][0]['description'],
        'temp': data['main']['temp']
    }

    return jsonify({'success': True, 'val': ans})

    

@socketio.on('submit vote')
def vote(data):
    selection = data['selection']
    emit('announce vote', {'selection': selection}, broadcast = True)

