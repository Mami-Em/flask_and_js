from crypt import methods
import os,requests
from urllib import request
from flask import Flask, render_template, jsonify, request

app = Flask('__name__')

# API key
API_key = os.getenv('API_KEY')

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_weather', methods = ['POST'])
def get_weather():

    # query for getting weather of a city
    city = request.form.get('city')
    res = requests.get(f'https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={API_key}')

    # make sure request succeded
    # if res.status_code != 200:
    #     return jsonify({'success': False})


    # data = res.json()
    # if city not in data['']:
    #     ...

    return jsonify(res)