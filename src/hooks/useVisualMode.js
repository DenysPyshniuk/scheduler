import { useState } from "react";

// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);
//   const transition = function (newMode, replace = false) {
//     if (replace) {
//       setMode(newMode);
//       setHistory([...history.slice(0, -1), newMode]);
//     } else {
//       setMode(newMode);
//       const newHistory = [...history, newMode];
//       setHistory(newHistory);
//     }
//   };
//   const back = function () {
//     if (history.length < 2) {
//       return;
//     } else {
//       setHistory(history.slice(0, -1));
//       setMode(history[history.length - 2]);
//     }
//   };
//   return { mode, transition, back };
// }

// import { useState } from "react";

// // HOOK FOR TRANSITIONING BETWEEN MODES:
export default function useVisualMode(initialMode) {
  const [history, setHistory] = useState([initialMode]);

  const transition = function (mode, replace = false) {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), mode]);
    } else {
      setHistory((prev) => [...prev, mode]);
    }
  };

  const back = () => {
    setHistory((prev) => {
      if (prev.length > 1) {
        return prev.slice(0, -1);
      }
      return prev;
    });
  };

  return { mode: history[history.length - 1], back, transition };
}

// export default useVisualMode;
