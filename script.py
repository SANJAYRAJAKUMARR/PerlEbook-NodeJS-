import pandas as pd
import tensorflow as tf
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Read the CSV files
ordered_books_df = pd.read_csv('sample.csv')
all_books_df = pd.read_csv('authors.csv')

# Fill missing values with an empty string
ordered_books_df['original_title'] = ordered_books_df['original_title'].fillna('')
ordered_books_df['authors'] = ordered_books_df['authors'].fillna('')
all_books_df['original_title'] = all_books_df['original_title'].fillna('')
all_books_df['authors'] = all_books_df['authors'].fillna('')

# Concatenate 'original_title' and 'authors' columns to create a text-based representation of the books
ordered_books_df['text_representation'] = ordered_books_df['original_title'] + ' ' + ordered_books_df['authors']
all_books_df['text_representation'] = all_books_df['original_title'] + ' ' + all_books_df['authors']

# Create TF-IDF vectorizer
tfidf_vectorizer = TfidfVectorizer(stop_words='english')

# Fit and transform the TF-IDF vectorizer on all books
tfidf_matrix_all_books = tfidf_vectorizer.fit_transform(all_books_df['text_representation'])

# Transform the TF-IDF vectorizer on the ordered books
tfidf_matrix_ordered_books = tfidf_vectorizer.transform(ordered_books_df['text_representation'])

# Compute cosine similarity between ordered books and all books
cosine_similarities = cosine_similarity(tfidf_matrix_ordered_books, tfidf_matrix_all_books)

# Get recommended books for each ordered book
for i, row in ordered_books_df.iterrows():
    ordered_book_title = row['original_title']
    ordered_book_author = row['authors']
    cosine_similarities_row = cosine_similarities[i]
    similar_indices = cosine_similarities_row.argsort()[:-6:-1]  # Get top 5 similar books
    print(f"Recommended books for '{ordered_book_title}' by {ordered_book_author}:")
    for j in similar_indices:
        recommended_book_title = all_books_df.iloc[j]['original_title']
        recommended_book_author = all_books_df.iloc[j]['authors']
        if recommended_book_title != ordered_book_title:  # Exclude the ordered book itself
            print(f"- {recommended_book_title} by {recommended_book_author}")
    print()
