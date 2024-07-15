from flask import Flask, request, jsonify
from generator import generate_image

app = Flask(__name__)

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    description = data['description']
    image_url = generate_image(description)
    return jsonify({"imageUrl": image_url})

if __name__ == '__main__':
    app.run(debug=True)
