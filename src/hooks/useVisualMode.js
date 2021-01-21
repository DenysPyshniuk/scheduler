import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([]);
  const [mode, setMode] = useState(initial);

  function transition(newMode, replace) {
    setMode(newMode);
  }
  return { mode, transition };
}

// import { useState, useEffect } from "react";
// export default function useVisualMode() {
//   const [history, setHistory] = useState([initial]);
//   const transition = function (mode, replace = false) {
//     setHistory([...prev, mode])
//   }
//   const back = function () {
//     if (history.length < 2) {
//       return;
//     }
//     setHistory(prev => [...prev.slice(0, prev.length - 1)]);
//     const mode = history.slice(-1)[0];
//     return {mode, transition, back}
//   }
// }
