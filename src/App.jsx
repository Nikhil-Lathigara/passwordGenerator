import { useState, useCallback, useEffect, useRef } from "react";
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&*_+-=";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-lg rounded-lg p-6 bg-gray-800 text-orange-500">
      <h3 className="text-white text-center text-xl font-semibold mb-4">Password Generator</h3>
      <div className="flex shadow-md rounded-lg overflow-hidden mb-6">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-4 bg-gray-900 text-white placeholder-gray-400"
          placeholder="Generated Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 font-medium">
          COPY
        </button>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <label className="text-white font-medium">Password Length: {length}</label>
          <input
            type="range"
            min={6}
            max={15}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-white font-medium" htmlFor="numberInput">Include Numbers</label>
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed(prev => !prev)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-white font-medium" htmlFor="charInput">Include Special Characters</label>
          <input
            type="checkbox"
            checked={charAllowed}
            id="charInput"
            onChange={() => setCharAllowed(prev => !prev)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
