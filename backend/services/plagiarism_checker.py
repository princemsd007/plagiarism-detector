import nltk
import requests
from bs4 import BeautifulSoup
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from gensim.models import Word2Vec
from .text_processor import preprocess_text

nltk.download('punkt')
nltk.download('stopwords')

def get_web_content(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    return ' '.join([p.text for p in soup.find_all('p')])

def tfidf_similarity(text1, text2):
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([text1, text2])
    return cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])[0][0]

def word_embedding_similarity(text1, text2):
    sentences1 = [preprocess_text(text1).split()]
    sentences2 = [preprocess_text(text2).split()]
    model = Word2Vec(sentences1 + sentences2, vector_size=100, window=5, min_count=1, workers=4)
    
    vec1 = sum([model.wv[word] for word in sentences1[0]]) / len(sentences1[0])
    vec2 = sum([model.wv[word] for word in sentences2[0]]) / len(sentences2[0])
    
    return cosine_similarity([vec1], [vec2])[0][0]

def ngram_similarity(text1, text2, n=3):
    def get_ngrams(text, n):
        return set([text[i:i+n] for i in range(len(text)-n+1)])
    
    ngrams1 = get_ngrams(text1, n)
    ngrams2 = get_ngrams(text2, n)
    
    intersection = len(ngrams1.intersection(ngrams2))
    union = len(ngrams1.union(ngrams2))
    
    return intersection / union if union > 0 else 0

def check_plagiarism(text, urls):
    processed_text = preprocess_text(text)
    web_contents = [preprocess_text(get_web_content(url)) for url in urls]
    
    results = []
    for url, content in zip(urls, web_contents):
        tfidf_sim = tfidf_similarity(processed_text, content)
        word_emb_sim = word_embedding_similarity(processed_text, content)
        ngram_sim = ngram_similarity(processed_text, content)
        
        avg_similarity = (tfidf_sim + word_emb_sim + ngram_sim) / 3
        
        results.append({
            'url': url,
            'similarity': round(avg_similarity * 100, 2),
            'tfidf_similarity': round(tfidf_sim * 100, 2),
            'word_embedding_similarity': round(word_emb_sim * 100, 2),
            'ngram_similarity': round(ngram_sim * 100, 2)
        })
    
    return sorted(results, key=lambda x: x['similarity'], reverse=True)