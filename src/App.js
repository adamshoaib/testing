import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [showLockModal, setShowLockModal] = useState(false);
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     event.preventDefault();
  //     event.returnValue = "Hello world";
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);
  const [sessions, setSessions] = useState("");

  const TAB_ID = Math.random().toString(36).substring(2, 15);

  useEffect(() => {
    const openTabs = JSON.parse(localStorage.getItem("openTabs") || "[]");
    localStorage.setItem("openTabs", JSON.stringify([...openTabs, TAB_ID]));

    const handleBeforeUnload = (event) => {
      const remainingTabs = JSON.parse(
        localStorage.getItem("openTabs") || "[]"
      ).filter((id) => id !== TAB_ID);
      localStorage.setItem("openTabs", JSON.stringify(remainingTabs));

      if (remainingTabs.length === 0) {
        event.preventDefault();
        alert("Im closing sorry");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // handleBeforeUnload();
    };
  }, []);

  return (
    <div className="App">
      <a href="www.google.com">Link</a>
      <div>
        <h1>{sessions}</h1>
      </div>
      <button
        onClick={() => {
          setShowLockModal(true);
        }}
      >
        Click Me
      </button>
    </div>
  );
}

export default App;
