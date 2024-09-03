import { useEffect, useRef, useState } from "react";

export interface Message {
  sender: string;
  content: string;
  timestamp: string;
  //   title: string;
}

const IndMes = ({ sender, trip, title }: any) => {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [hi, setHi] = useState(1);
  // Fetch previous messages when the trip changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://192.168.40.65:8000/api/trips/${trip}/messages/?format=json`
        );
        if (response.ok) {
          const data: Message[] = await response.json();
          console.log(data);
          setMessages(data);
          setHi((prev) => prev + 1);
        } else {
          console.error("Failed to fetch previous messages.");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [trip]);

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = new WebSocket(`ws://192.168.40.65:8000/ws/chat/${trip}/`);
    setWs(socket);

    // Handle incoming messages
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: data.user_id, // Assuming 'user_id' is the sender's identifier
          content: data.message, // The message content
          timestamp: new Date().toISOString(), // Add a timestamp for the message
        },
      ]);
    };

    // Handle WebSocket errors
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Clean up on component unmount
    return () => {
      socket.close();
    };
  }, [trip]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && ws) {
      ws.send(
        JSON.stringify({
          user_id: "1",
          message: content,
        })
      );
      setContent(""); // Clear the input field
    }
  };

  const messagesEndRef = useRef(null);
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[500px] border border-gray-300 rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
        <h1 className="text-2xl">{title}</h1>
        {messages.map((message, index) => (
          <div key={index} className="border-b border-gray-200 pb-2">
            {/* <h1 className="font-semibold text-gray-800"></h1> */}
            <p className="text-gray-600">{message.content}</p>
            {/* <span className="text-xs text-gray-400">
              {new Date(message.timestamp).toLocaleString()}
            </span> */}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        className="flex items-center p-4 border-t border-gray-300 bg-white"
        onSubmit={sendMessage}
      >
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg mr-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
          aria-label="Message input"
        />
        <button
          type="submit"
          className={`p-2 bg-blue-500 text-white rounded-lg ${
            !content.trim() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!content.trim()}
          aria-label="Send message"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default IndMes;
