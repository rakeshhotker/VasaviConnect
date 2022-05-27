import { useState } from "react";
import Auth from "./Components/Auth";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [authenticate, setisAuthenticate] = useState(false);
  const [profile, setProfile] = useState(false);
  const [user, setUser] = useState("");
  return (
    <>
      <Navbar
        setisLoggedIn={setisLoggedIn}
        isLoggedIn={isLoggedIn}
        authenticate={authenticate}
        setisAuthenticate={setisAuthenticate}
        profile={profile}
        setProfile={setProfile}
      />
      {!isLoggedIn && authenticate && (
        <Auth
          setisLoggedIn={setisLoggedIn}
          isLoggedIn={isLoggedIn}
          user={user}
          setUser={setUser}
        />
      )}
      {!profile && isLoggedIn && <Home />}
      {profile && isLoggedIn && <Profile user={user} />}
    </>
  );
}

export default App;
