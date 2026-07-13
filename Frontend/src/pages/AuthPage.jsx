import { useState } from "react";
import LoginForm from "../components/loginForm.jsx";
import RegisterForm from "../components/registerForm.jsx";

function AuthPage() {
  const [currentAction, setCurrentAction] = useState("login");

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 px-4">
      {currentAction === "login" ? (
        <LoginForm setCurrentAction={setCurrentAction} />
      ) : (
        <RegisterForm setCurrentAction={setCurrentAction} />
      )}
    </div>
  );
}

export default AuthPage;
