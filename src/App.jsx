import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 className="font-bold text-4xl">Movie Portal</h1>
    </div>
  );
}

export default App;
