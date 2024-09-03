import toast, { Toaster as ToastElement } from "react-hot-toast";

export const notifySuccess = (message: string) => toast.success(message);
export const notifyError = (message: string) => toast.error(message);

export const Toaster = () => {
  return (
    <div>
      <ToastElement
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333", // Dark gray background
            color: "#fff", // White text color
            padding: "12px 20px", // Increased padding for better spacing
            borderRadius: "8px", // Rounded corners
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Subtle shadow for depth
            fontFamily: "'Roboto', sans-serif", // Modern font
            fontSize: "14px", // Slightly larger text
          },
          success: {
            style: {
              background: "#4caf50", // Green background for success
              color: "#fff", // White text color
            },
          },
          error: {
            style: {
              background: "#f44336", // Red background for error
              color: "#fff", // White text color
            },
          },
        }}
      />
    </div>
  );
};
