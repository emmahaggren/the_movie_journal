import sqlite3

def print_all_movies():
    conn = sqlite3.connect('movies.db')
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM movies")
    rows = cursor.fetchall()
    
    if not rows:
        print("No movies found in the database.")
    else:
        for row in rows:
            print(row)
    
    conn.close()

if __name__ == "__main__":
    print_all_movies()
