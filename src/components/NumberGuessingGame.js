// NumberGuessingGame.js

import React, { useState, useRef } from 'react';
import './NumberGuessingGame.css';

const NumberGuessingGame = () => {
  const [guess, setGuess] = useState('');
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts] = useState(5);
  const inputRef = useRef(null);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1; // Generates a random number between 1 and 100
  }

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const guessedNumber = parseInt(guess, 10);

    if (isNaN(guessedNumber)) {
      setMessage('Please enter a valid number.');
    } else {
      setAttempts(prevAttempts => prevAttempts + 1);

      if (guessedNumber === randomNumber) {
        setMessage(`Congratulations! You guessed the number ${randomNumber} correctly in ${attempts + 1} attempts.`);
        setGuess('');
        setRandomNumber(generateRandomNumber());
        setAttempts(0);
        inputRef.current.focus();
      } else if (guessedNumber < randomNumber) {
        setMessage('Try a higher number.');
        setGuess('');
        inputRef.current.focus();
      } else {
        setMessage('Try a lower number.');
        setGuess('');
        inputRef.current.focus();
      }

      if (attempts >= maxAttempts - 1 && guessedNumber !== randomNumber) {
        setMessage(`Game over! The number was ${randomNumber}.`);
        setRandomNumber(generateRandomNumber());
        setAttempts(0);
        setGuess('');
        inputRef.current.focus();
      }
    }
  };

  const handleResetGame = () => {
    setRandomNumber(generateRandomNumber());
    setGuess('');
    setMessage('');
    setAttempts(0);
    inputRef.current.focus();
  };

  return (
    <div className="number-guessing-game">
      <h2>Number Guessing Game</h2>
      <p>Guess a number between 1 and 100:</p>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={guess}
          onChange={handleInputChange}
          ref={inputRef}
          className="form-control"
          placeholder="Enter your guess"
        />
        <button type="submit" className="btn btn-primary">Guess</button>
      </form>
      <p className="message">{message}</p>
      {attempts > 0 && (
        <p className="attempts-left">Attempts left: {maxAttempts - attempts}</p>
      )}
      <button className="btn btn-outline-secondary reset-button" onClick={handleResetGame}>Reset Game</button>
    </div>
  );
};

export default NumberGuessingGame;
