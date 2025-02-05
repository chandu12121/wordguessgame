import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import Button from "../Button";
import Input from "../Input";
import Confetti from "react-confetti";
import "./index.css";

const WORDS = ["apple", "dance", "light", "mango", "chair"];
const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

const Home = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [targetWord, setTargetWord] = useState(getRandomWord());
  const [guesses, setGuesses] = useState([]);
  const [attemptsLeft, setAttemptsLeft] = useState(6);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState("ongoing");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setCurrentGuess(e.target.value.toLowerCase());
    setError("");
  };

  const checkGuess = () => {
    if (currentGuess.length !== 5) {
      setError("Guess must be exactly 5 letters!");
      return;
    }

    const feedback = currentGuess.split("").map((char, index) => {
      if (char === targetWord[index]) return "green";
      if (targetWord.includes(char)) return "yellow";
      return "gray";
    });

    setGuesses([...guesses, { word: currentGuess, feedback }]);
    setAttemptsLeft(attemptsLeft - 1);
    setCurrentGuess("");

    if (currentGuess === targetWord) {
      setGameStatus("won");
    } else if (attemptsLeft - 1 === 0) {
      setGameStatus("lost");
    }
  };

  const handleRestart = () => {
    setTargetWord(getRandomWord());
    setGuesses([]);
    setAttemptsLeft(6);
    setGameStatus("ongoing");
    setCurrentGuess("");
    setError("");
  };

  return (
    <div className={`game-container ${isDarkMode ? "dark" : "light"}`}>
      <div className="theme-button">
        <Button onClick={toggleTheme} className="button theme-toggle">
          {isDarkMode ? "Light" : "Dark"}
        </Button>
      </div>
      <h1 className="title">Word Guessing Game</h1>

      {guesses.map(({ word, feedback }, idx) => (
        <div key={idx} className="guess-row">
          {word.split("").map((char, i) => (
            <span key={i} className={`guess-box ${feedback[i]}`}>
              {char.toUpperCase()}
            </span>
          ))}
        </div>
      ))}

      {gameStatus === "ongoing" ? (
        <div>
          <div className="input-container">
            <Input
              type="text"
              value={currentGuess}
              onChange={handleInputChange}
              maxLength={5}
              className="input-field"
              placeholder="Enter a 5-letter word"
            />
            <Button onClick={checkGuess} className="button submit-button">
              Submit
            </Button>
          </div>
          <br />
          {error && <p className="error-message">{error}</p>}
        </div>
      ) : (
        <div className="result-container">
          {gameStatus === "won" ? (
            <>
              <Confetti width={window.innerWidth} height={window.innerHeight} />
              <p className="result-message">🎉 You guessed the word!</p>
            </>
          ) : (
            <p className="result-message">
              ❌ Game Over! The word was {targetWord.toUpperCase()}.
            </p>
          )}
        </div>
      )}

      <Button onClick={handleRestart} className="button restart-button">
        New Game
      </Button>
    </div>
  );
};

export default Home;
