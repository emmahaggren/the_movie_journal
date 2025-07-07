from bottle import Bottle, run, request, response
from database import init_db, get_db
import requests
import os
from dotenv import load_dotenv

app = Bottle()
init_db()

#Get all movies from the database
@app.get('/movies')
def get_all_movies():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM movies')
    movies = cursor.fetchall()
    db.close()
    return {'movies': [dict(m) for m in movies]}

# Get a specific movie by ID
@app.get('/movies/<movie_id>')
def get_movie_by_id(movie_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM movies WHERE movie_id = ?', (movie_id,))
    movie = cursor.fetchone()
    db.close()
    if movie:
        return {'movie': dict(movie)}
    else:
        response.status = 404
        return {'error': 'Movie not found'}

# Add a new movie to the database
@app.post('/movies')
def add_movie():
    data = request.json
    db = get_db()
    cursor = db.cursor()
    cursor.execute('''
        INSERT INTO movies (
            movie_id, movie_title, movie_poster, movie_genre, movie_date, movie_rating, movie_comment
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (
        data.get('id'),
        data.get('title'),
        data.get('poster'),
        data.get('genre'),
        data.get('date'),
        data.get('rating'),
        data.get('comment')
    ))
    db.commit()
    db.close()
    response.status = 201
    return {'message': 'Successfully added movie'}


# Load OMDb API key from environment variables
load_dotenv()
OMDB_API_KEY = os.getenv("OMDB_API_KEY")
print(f"OMDb API Key: {OMDB_API_KEY}")

# Search for a movie using the OMDb API
@app.get('/omdb/search')
def search_movie():
    title = request.query.title
    if not title:
        return {'error': 'Missing title parameter'}

    response = requests.get(
        'http://www.omdbapi.com/',
        params={
            'apikey': OMDB_API_KEY,
            't': title
        }
    )

    if response.status_code != 200:
        return {'error': 'OMDb request failed'}

    data = response.json()
    if data.get('Response') == 'False':
        return {'error': data.get('Error', 'Movie not found')}

    return {
        'title': data.get('Title'),
        'year': data.get('Year'),
        'poster': data.get('Poster'),
        'genre': data.get('Genre'),
        'plot': data.get('Plot'),
        'imdbID': data.get('imdbID')
    }

# Initialize the database
if __name__ == '__main__':
    print("Server is starting at http://localhost:8080 ...")
    run(app, host='localhost', port=8080, debug=True)