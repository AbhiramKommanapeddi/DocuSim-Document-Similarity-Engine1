from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)

def compute_similarity(doc1, doc2):
    vectorizer = CountVectorizer().fit_transform([doc1, doc2])
    vectors = vectorizer.toarray()
    return cosine_similarity([vectors[0]], [vectors[1]])[0][0]

@app.route('/compare', methods=['POST'])
def compare_documents():
    data = request.get_json()
    doc1 = data.get("doc1", "")
    doc2 = data.get("doc2", "")
    score = compute_similarity(doc1, doc2)
    return jsonify({"similarity_score": round(score, 4)})

if __name__ == "__main__":
    app.run(debug=True)
