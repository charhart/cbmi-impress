from flask import Flask, url_for
from flask import render_template


app = Flask(__name__)

@app.route('/')
def handleIndexPage():
    return 'impress.html'

@app.route('/impress/')
@app.route('/impress/impress.html')
def handleMainPage():
    
    return render_template('impress.html')

@app.route('/admin/')
@app.route('/admin/index.html')
def handleAdminPage():
    
    return render_template('admin/index.html')


"""
Handle Static Resources
"""
with app.test_request_context():
    url_for('static', filename='style.css')
    
if __name__ == '__main__':
    app.run()