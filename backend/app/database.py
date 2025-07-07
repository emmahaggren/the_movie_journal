
import sqlite3
from bottle import get, post, request, response
from app import db

cursor = db.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS movies (
        movie_id TEXT PRIMARY KEY,
        movie_title TEXT,
        movie_poster TEXT,
        movie_genre TEXT,
        movie_date INTEGER,
        movie_rating INTEGER,
        movie_comment TEXT
    )
''')
db.commit()
db.close()

@get('/movies')
def get_all_movies():
    cursor.execute('SELECT * FROM movies')
    movies = cursor.fetchall()
    db.close()
    return {'movies': movies}

@get('/movies')
def get_movie_by_id():
    movie_id = request.query.id
    cursor.execute('SELECT * FROM movies WHERE movie_id = ?', (movie_id,))
    movie = cursor.fetchone()
    db.close()
    if movie:
        return {'movie': movie}
    else:
        response.status = 404
        return {'error': 'Movie not found'}

@post('/movies')
def add_movie():
    data = request.json
    id = data.get('id')
    title = data.get('title')
    poster = data.get('poster')
    genre = data.get('genre')
    date = data.get('date')
    rating = data.get('rating')
    comment = data.get('comment')
    cursor.execute('INSERT INTO movies (id, title, poster, genre, date, rating, comment) VALUES (?, ?, ?, ?, ?, ?, ?)', (id, title, poster, genre, date, rating, comment))
    db.commit()
    db.close()
    response.status = 201
    return {'message': 'Movie added!'}