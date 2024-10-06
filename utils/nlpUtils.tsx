import { SentimentAnalyzer } from 'ai-text-processor';
import natural from 'natural';

// Initialize the sentiment analyzer
const sentimentAnalyzer = new SentimentAnalyzer({
    language: 'en', // Set language to English
    strategy: 'bayes', // Choose a sentiment analysis strategy
});

// Function to analyze sentiment
export const analyzeSentiment = (text) => {
    return sentimentAnalyzer.analyze(text).score;
};

// Function to classify text into categories
export const classifyText = (text) => {
    const tokenizer = new natural.WordTokenizer();
    const words = tokenizer.tokenize(text);
    // You can add more sophisticated classification logic here
    return words;
};

// Function to get appropriate responses based on sentiment
export const getResponseBasedOnSentiment = (sentiment) => {
    switch (sentiment) {
        case 'positive':
            return 'It sounds like you are in a good mood! How can I assist with your needs?';
        case 'negative':
            return 'It seems like something might be troubling you. Can I assist with anything specific?';
        case 'angry':
            return 'I understand you might be frustrated. Let’s try to resolve this issue.';
        case 'sad':
            return 'I’m sorry to hear that you’re feeling down. How can I help?';
        case 'love':
            return 'It sounds like you’re in a romantic mood. How can I assist with your romantic interests?';
        case 'motivated':
            return 'Great to see you motivated! How can I support your goals?';
        default:
            return 'I didn’t quite catch that. Can you please clarify?';
    }
};
