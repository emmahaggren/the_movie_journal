
import sqlite3
from bottle import get, post, request, response
from app import db

cursor = db.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        rating INTEGER,
        comment TEXT
    )
''')
db.commit()
db.close()

@get('/movies')
def get_movies():
    db = sqlite3.connect('movies.db')
    cursor.execute('SELECT * FROM movies')
    movies = cursor.fetchall()
    db.close()
    return {'movies': movies}

@post('/movies')
def add_movie():
    data = request.json
    title = data.get('title')
    rating = data.get('rating')
    comment = data.get('comment')

    db = sqlite3.connect('movies.db')
    cursor.execute('INSERT INTO movies (title, rating, comment) VALUES (?, ?, ?)', (title, rating, comment))
    db.commit()
    db.close()
    response.status = 201
    return {'message': 'Movie added!'}