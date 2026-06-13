import React, { useState, useEffect } from 'react';
import './Quiz.css';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState([]);

  // Expanded question bank
  const questionBank = [
    {
      id: 1,
      question: "Pizza boxes are always recyclable.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Only clean parts of pizza boxes can be recycled. Grease and cheese contaminate the cardboard, making it unsuitable for recycling."
    },
    {
      id: 2,
      question: "Which of these items is considered hazardous waste?",
      options: ["Plastic bottles", "Batteries", "Vegetable peels", "Glass jars"],
      correctAnswer: "Batteries",
      explanation: "Batteries contain heavy metals and chemicals that can contaminate soil and water if not disposed of properly."
    },
    {
      id: 3,
      question: "You should rinse food containers before recycling them.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Food residue can contaminate entire batches of recyclables, making them unsuitable for processing."
    },
    {
      id: 4,
      question: "Which plastic code is most commonly recycled?",
      options: ["♳ PET (1)", "♴ HDPE (2)", "♵ PVC (3)", "All of them equally"],
      correctAnswer: "♳ PET (1)",
      explanation: "PET (Polyethylene Terephthalate) is the most commonly accepted plastic in recycling programs worldwide."
    },
    {
      id: 5,
      question: "What should you do with used cooking oil?",
      options: [
        "Pour it down the drain",
        "Dispose with regular trash",
        "Take to recycling center",
        "Mix with water and flush"
      ],
      correctAnswer: "Take to recycling center",
      explanation: "Cooking oil should be taken to a recycling center. Never pour it down drains as it can cause blockages and environmental damage."
    },
    {
      id: 6,
      question: "Which of these can be composted at home?",
      options: [
        "Meat and dairy products",
        "Fruit and vegetable scraps",
        "Plastic packaging",
        "Glass containers"
      ],
      correctAnswer: "Fruit and vegetable scraps",
      explanation: "Fruit and vegetable scraps are ideal for home composting. Meat and dairy can attract pests and create odors."
    },
    {
      id: 7,
      question: "How should you dispose of broken glass?",
      options: [
        "In the recycling bin",
        "Wrap securely and place in general waste",
        "Leave it for street cleaners",
        "Bury it in the garden"
      ],
      correctAnswer: "Wrap securely and place in general waste",
      explanation: "Broken glass should be wrapped in paper or placed in a sealed container before disposal to prevent injuries to waste handlers."
    },
    {
      id: 8,
      question: "What does the recycling symbol with number 5 mean?",
      options: [
        "Not recyclable",
        "Polypropylene plastic",
        "Compostable material",
        "Hazardous waste"
      ],
      correctAnswer: "Polypropylene plastic",
      explanation: "Number 5 represents Polypropylene (PP), commonly used for yogurt containers, bottle caps, and food containers. Check local recycling guidelines."
    },
    {
      id: 9,
      question: "Which item takes the longest to decompose in landfills?",
      options: [
        "Paper napkins",
        "Apple core",
        "Plastic bottles",
        "Cotton t-shirt"
      ],
      correctAnswer: "Plastic bottles",
      explanation: "Plastic bottles can take up to 450 years to decompose, while paper takes 2-6 weeks, apple cores 2 months, and cotton 1-5 months."
    },
    {
      id: 10,
      question: "What is e-waste?",
      options: [
        "Electronic waste like old phones and computers",
        "Energy-efficient waste",
        "Edible waste",
        "Emergency waste"
      ],
      correctAnswer: "Electronic waste like old phones and computers",
      explanation: "E-waste refers to discarded electronic devices which often contain hazardous materials and should be recycled separately."
    },
    {
      id: 11,
      question: "Can you recycle aluminum foil?",
      options: [
        "Yes, if it's clean",
        "No, never",
        "Only industrial aluminum",
        "Only if it's shiny"
      ],
      correctAnswer: "Yes, if it's clean",
      explanation: "Clean aluminum foil can be recycled. Make sure to remove any food residue and ball it up to prevent it from getting lost in sorting machines."
    },
    {
      id: 12,
      question: "What is the proper way to dispose of expired medications?",
      options: [
        "Flush down toilet",
        "Throw in regular trash",
        "Take to pharmacy or designated collection",
        "Bury in backyard"
      ],
      correctAnswer: "Take to pharmacy or designated collection",
      explanation: "Expired medications should be taken to pharmacies or designated collection sites to prevent water contamination and misuse."
    },
    {
      id: 13,
      question: "Which of these materials is biodegradable?",
      options: [
        "Plastic bags",
        "Styrofoam",
        "Food waste",
        "Glass"
      ],
      correctAnswer: "Food waste",
      explanation: "Food waste is biodegradable and breaks down naturally. Plastic, styrofoam, and glass are not biodegradable and persist in the environment."
    },
    {
      id: 14,
      question: "What should you do with old clothes that are too worn to donate?",
      options: [
        "Throw in regular trash",
        "Burn them",
        "Use as textile recycling",
        "Bury them"
      ],
      correctAnswer: "Use as textile recycling",
      explanation: "Many communities have textile recycling programs that can repurpose even heavily worn clothing into industrial rags or insulation."
    },
    {
      id: 15,
      question: "How long does it take for a plastic bag to decompose?",
      options: [
        "5-10 years",
        "20-50 years",
        "100-200 years",
        "500-1000 years"
      ],
      correctAnswer: "20-50 years",
      explanation: "Plastic bags typically take 20-50 years to decompose, which is why reusable bags are much better for the environment."
    },
    {
      id: 16,
      question: "What is 'wishcycling'?",
      options: [
        "Hoping your recycling gets processed",
        "Putting non-recyclables in recycling bin hoping they'll be recycled",
        "Recycling birthday wishes",
        "Special holiday recycling program"
      ],
      correctAnswer: "Putting non-recyclables in recycling bin hoping they'll be recycled",
      explanation: "Wishcycling contaminates recycling streams and can cause entire batches to be sent to landfill. Only put accepted items in recycling."
    },
    {
      id: 17,
      question: "Which of these should NEVER go in recycling?",
      options: [
        "Clean cardboard",
        "Plastic bags",
        "Glass jars",
        "Aluminum cans"
      ],
      correctAnswer: "Plastic bags",
      explanation: "Plastic bags should never go in curbside recycling as they jam sorting machinery. Take them to supermarket collection bins instead."
    },
    {
      id: 18,
      question: "What percentage of plastic ever produced has been recycled?",
      options: [
        "About 9%",
        "About 25%",
        "About 50%",
        "About 75%"
      ],
      correctAnswer: "About 9%",
      explanation: "Only about 9% of all plastic ever produced has been recycled, highlighting the importance of reducing plastic consumption."
    },
    {
      id: 19,
      question: "Which country leads the world in recycling rates?",
      options: [
        "United States",
        "Germany",
        "China",
        "Japan"
      ],
      correctAnswer: "Germany",
      explanation: "Germany leads with about 65% recycling rate, followed by South Korea and Austria. The US recycles about 32% of its waste."
    },
    {
      id: 20,
      question: "What is the main benefit of composting?",
      options: [
        "Reduces landfill waste",
        "Creates nutrient-rich soil",
        "Reduces greenhouse gases",
        "All of the above"
      ],
      correctAnswer: "All of the above",
      explanation: "Composting reduces landfill waste, creates valuable soil amendment, and reduces methane emissions from landfills."
    }
  ];

  // Generate random quiz
  const generateRandomQuiz = () => {
    const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10); // 10 random questions per quiz
  };

  // Initialize quiz on component mount
  useEffect(() => {
    setCurrentQuiz(generateRandomQuiz());
  }, []);

  const handleAnswerClick = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    
    const isCorrect = selectedOption === currentQuiz[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    // Store the answer for review
    setAnswers([...answers, {
      question: currentQuiz[currentQuestion].question,
      selectedAnswer: selectedOption,
      correctAnswer: currentQuiz[currentQuestion].correctAnswer,
      explanation: currentQuiz[currentQuestion].explanation,
      isCorrect
    }]);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < currentQuiz.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuiz(generateRandomQuiz());
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setAnswers([]);
  };

  // Show loading until quiz is generated
  if (currentQuiz.length === 0) {
    return (
      <div className="quiz-container">
        <div className="loading-quiz">
          <h2>Preparing Your Quiz...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="quiz-container">
        <div className="score-section">
          <h1>Quiz Completed!</h1>
          <div className="score-card">
            <h2>Your Score</h2>
            <div className="score-circle">
              {score}<span>/{currentQuiz.length}</span>
            </div>
            <p className="score-percentage">
              {Math.round((score / currentQuiz.length) * 100)}% Correct
            </p>
            <div className="performance-feedback">
              {score === currentQuiz.length && <p className="perfect-score">Perfect! You're a waste management expert! 🌟</p>}
              {score >= currentQuiz.length * 0.8 && score < currentQuiz.length && <p className="great-score">Excellent! Great knowledge! 👍</p>}
              {score >= currentQuiz.length * 0.6 && score < currentQuiz.length * 0.8 && <p className="good-score">Good job! Keep learning! 💪</p>}
              {score < currentQuiz.length * 0.6 && <p className="improve-score">Keep practicing! Every bit of knowledge helps! 📚</p>}
            </div>
          </div>

          <div className="answers-review">
            <h3>Review Your Answers</h3>
            {answers.map((answer, index) => (
              <div key={index} className="answer-item">
                <div className="question-text">Q{index + 1}: {answer.question}</div>
                <div className="answer-details">
                  <span className={`your-answer ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                    Your answer: {answer.selectedAnswer} 
                    <span className="answer-icon">{answer.isCorrect ? '✓' : '✗'}</span>
                  </span>
                  {!answer.isCorrect && (
                    <span className="correct-answer">
                      Correct answer: {answer.correctAnswer}
                    </span>
                  )}
                  <p className="explanation">{answer.explanation}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="quiz-actions">
            <button onClick={restartQuiz} className="restart-button">
              Take New Quiz
            </button>
            <button onClick={() => window.location.reload()} className="home-button">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>Waste Management Quiz</h1>
        <p>Test your knowledge about proper waste disposal</p>
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / currentQuiz.length) * 100}%` }}
            ></div>
          </div>
          <div className="progress-text">
            <span>Question {currentQuestion + 1} of {currentQuiz.length}</span>
            <span className="progress-numbers">{currentQuestion + 1}/{currentQuiz.length}</span>
          </div>
        </div>
      </div>

      <div className="question-section">
        <h2 className="question-text">
          {currentQuiz[currentQuestion].question}
        </h2>

        <div className="options-grid">
          {currentQuiz[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                selectedAnswer === option 
                  ? option === currentQuiz[currentQuestion].correctAnswer 
                    ? 'correct' 
                    : 'incorrect'
                  : ''
              }`}
              onClick={() => !selectedAnswer && handleAnswerClick(option)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>

        {selectedAnswer && (
          <div className="explanation-section">
            <h3>Explanation</h3>
            <p>{currentQuiz[currentQuestion].explanation}</p>
            <button onClick={handleNextQuestion} className="next-button">
              {currentQuestion === currentQuiz.length - 1 ? 'See Results' : 'Next Question'}
            </button>
          </div>
        )}
      </div>

      <div className="quiz-info">
        <p>Each quiz contains 10 random questions from our question bank</p>
      </div>
    </div>
  );
};

export default Quiz;