import React, { useState, useEffect } from "react";

function Date() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div>{date.toLocaleDateString()}</div>;
}

export default Date;
