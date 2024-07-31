# Plagiarism Detection System

This project is a web-based Plagiarism Detection System that allows users to check text for potential plagiarism by comparing it with online sources. It uses advanced natural language processing techniques to provide accurate similarity scores.

## Features

- User authentication (register, login, logout)
- Text input for plagiarism checking
- Multiple URL comparison
- Advanced similarity analysis using TF-IDF, Word Embeddings, and N-gram techniques
- Detailed results display

## Tech Stack

- Backend: Python, Flask, SQLAlchemy, JWT
- Frontend: React, Material-UI
- Database: PostgreSQL
- NLP: NLTK, scikit-learn, gensim

## Setup and Installation

1. Clone the repository
2. Set up the backend:
   - Create a virtual environment and activate it
   - Install dependencies: `pip install -r requirements.txt`
   - Set up the PostgreSQL database and update `config.py`
   - Run migrations: `flask db upgrade`
   - Start the Flask server: `python backend/app.py`
3. Set up the frontend:
   - Navigate to the frontend directory: `cd frontend`
   - Install dependencies: `npm install`
   - Start the React development server: `npm start`

## Usage

1. Register a new account or log in
2. Enter the text you want to check for plagiarism
3. Provide URLs of potential sources
4. Submit the form to get plagiarism analysis results

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
