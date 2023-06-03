import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'PrintSc') {
        event.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div>
      <h1>Welcome to my website!</h1>
      <p>Pressing the "G" key will be disabled on this page.</p>
      <textarea></textarea>
    </div>
  );
}

export default App;
