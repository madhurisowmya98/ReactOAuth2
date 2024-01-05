import { Box } from "@mui/material";
import React, { useState } from "react";
import SignUp from "./SignUp"; // Import your SignUp component here
import LoginPage from "./LoginPage";

function Signinsignup() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignUpClick = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };
  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignUp(false);
  };

  return (
    <div>
      {showLogin && (
        <LoginPage />
        // Your Login component here
      )}

      {showSignUp && (
        <SignUp />
      )}

      {!showSignUp && (
        <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <p>
            Don't have an account?{" "}
            <span style={{color:'blue' , cursor:'pointer'}}  onClick={handleSignUpClick}>SignUp</span>
          </p>
        </Box>
      )}

      {!showLogin && (
        <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <p>
            Already have an account?{" "}
            <span  style={{color:'blue', cursor:'pointer'}} onClick={handleLoginClick}>SignIn</span>
          </p>
        </Box>
      )}
    </div>
  );
}

export default Signinsignup;
