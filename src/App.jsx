import "./App.css";
import "./assets/css/tailwind2.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import { ChatProvider } from "./Context/ChatContext";
import Newlogin from "./AuthentiCation/Newlogin";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Register from "./AuthentiCation/Register";
// Import Protected Route

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <ChatProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={!authUser ? <Newlogin /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!authUser ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ChatProvider>
  );
}

export default App;
