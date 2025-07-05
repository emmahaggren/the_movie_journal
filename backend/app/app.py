from bottle import run 
import sqlite3

db = sqlite3.connect('movies.db')
db.set_trace_callback(print)

print("Server is starting...")
run(host='localhost', port=8080)
