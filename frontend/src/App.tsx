import "./App.css";
import Messages from "./pages/Messenger";
// Import the type definition for MessagesData
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import PostDetail from "./components/post/PostDetail";
import "./App.css";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Message from "./components/message/Message";
import Messenger from "./pages/Messenger";
import MessageById from "./pages/MessageById";

const messagesData: any = [
  {
    id: 1,
    sender: "John",
    message: "Hello, how are you?",
    timestamp: "2022-01-01 10:00:00",
  },
  {
    id: 2,
    sender: "Jane",
    message: "I'm good, thanks! How about you?",
    timestamp: "2022-01-01 10:01:00",
  },
  {
    id: 3,
    sender: "John",
    message: "I'm doing great!",
    timestamp: "2022-01-01 10:02:00",
  },
  {
    id: 4,
    sender: "Jane",
    message: "That's awesome!",
    timestamp: "2022-01-01 10:03:00",
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "post/:id",
    element: <PostDetail />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "messages",
    element: <Messenger />,
  },
  {
    path: "messages/:id",
    element: <MessageById />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
