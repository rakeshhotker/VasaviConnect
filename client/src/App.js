import { useState } from "react";
import Auth from "./Components/Auth";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [authenticate, setisAuthenticate] = useState(false);
  return (
    <>
      <Navbar
        setisLoggedIn={setisLoggedIn}
        isLoggedIn={isLoggedIn}
        authenticate={authenticate}
        setisAuthenticate={setisAuthenticate}
      />
      {!isLoggedIn && authenticate && (
        <Auth setisLoggedIn={setisLoggedIn} isLoggedIn={isLoggedIn} />
      )}
      {isLoggedIn && <Home />}
    </>
  );
}

export default App;
