import React, { useState, useEffect, useRef } from "react";
import load from '../../img/load.gif'

function QuoteBox() {
  const quoteRef = useRef();
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      fetch("https://type.fit/api/quotes")
        .then((response) => response.json())
        .then((data) => {
          const randomIndex = Math.floor(Math.random() * data.length);
          setQuote(data[randomIndex]);
          setIsLoading(false);
        });
  }, []);
  
  
  const [val] = useState(Math.floor(Math.random() * 7))
  const randomColor = () => {
    const colors = ["#29d7b9", "#FFB399", "#7acb95", "#b17bbb", "#543fb4", "#8cbab0", "#75b5b0"];
    return colors[val];
  };

  const loader = (
    <div className="loader">
      <img src={load} alt="loading"/>
    </div>
  );

  return (
    <div className=".quote-box" style={{ width: '12rem' }}>
      <div
        style={{
          backgroundColor: quote && randomColor(),
          padding: '10px',
          margin: '1rem 0 1rem 1rem',
          width: '100%',
          boxShadow: '0 0 .5rem .5rem rgba(0, 0, 0, 0.5)',
          borderRadius: '1rem',
          maxHeight: '18rem',
          overflow: 'scroll',
        }}
        className=".quote-text"
      >
        {isLoading ? (
          loader
        ) : (
          <>
            <h5
              ref={quoteRef}
              className="quote"
              style={{
                margin: '-.5rem 0 0 0',
              }}
            >
              "{quote?.text}"
            </h5>
            <p className="author">- {quote?.author}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default QuoteBox;
