import sqlite3

DB_NAME = 'movies.db'

def get_db():
    db = sqlite3.connect(DB_NAME)
    db.row_factory = sqlite3.Row  # Return dict-like rows
    return db

def init_db():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS movies (
            movie_id TEXT PRIMARY KEY,
            movie_title TEXT,
            movie_poster TEXT,
            movie_genre TEXT,
            movie_year INTEGER,
            movie_rating INTEGER,
            movie_comment TEXT
        )
    ''')
    db.commit()
    db.close()
