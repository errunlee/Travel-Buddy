import { useState, useEffect } from "react";
import IndMes from "./IndMes";
import { api } from "@/api/instance";
import Navbar from "@/components/Nav/Navbar";
import { useParams } from "react-router-dom";
// Import your user context or dummy data if necessary
// import useUserContext from "@/context/useUserContext";
// import { userData } from "@/dummy/data";

interface Group {
  id: number;
  title: string;
}

const MessageById = () => {
  const { id } = useParams<{ id: string }>();
  // const { user } = useUserContext(); // Uncomment if using user context
  const [groups, setGroups] = useState<Group[]>([]);
  const [currTrip, setCurrTrip] = useState<number | null>(
    id ? parseInt(id) : null
  );
  const [error, setError] = useState<string | null>(null);

  // Fetch groups (trips) from the API
  useEffect(() => {
    const getGroups = async () => {
      try {
        const res = await api.get("/api/trips/?format=json");
        setGroups(res.data);

        // Set initial current trip if groups are available and ID is valid
        if (id && res.data.length > 0) {
          const initialTrip = res.data.find(
            (group) => group.id === parseInt(id)
          );
          setCurrTrip(initialTrip ? initialTrip.id : null);
        }
      } catch (error) {
        setError("Error fetching trips. Please try again later.");
        console.error("Error fetching trips:", error);
      }
    };

    getGroups();
  }, [id]);

  const currentGroup = groups.find((group) => group.id === currTrip);
  const title = currentGroup ? currentGroup.title : "Loading..."; // Provide a fallback title or message

  return (
    <div className="flex w-[800px] h-[500px] border border-gray-300 rounded-lg shadow-md overflow-hidden m-auto mt-7">
      <div className="w-[30%] bg-gray-100 border-r border-gray-300 mt-5">
        <div className="p-2 border-b border-gray-300 font-semibold text-lg">
          Groups List
        </div>
        {error && <div className="p-4 text-red-500 text-center">{error}</div>}
        {groups.length === 0 && !error ? (
          <div className="p-4 text-center text-gray-500">
            No trips available.
          </div>
        ) : (
          groups.map((group) => (
            <div
              key={group.id}
              onClick={() => setCurrTrip(group.id)}
              className={`text-left py-4 px-3 cursor-pointer ${
                currTrip === group.id
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
              aria-label={`Select trip ${group.title}`}
            >
              {group.title}
            </div>
          ))
        )}
      </div>

      <div className="flex-1 p-4">
        {currTrip ? (
          <IndMes
            title={title}
            trip={currTrip}
            sender={"your-username"} // Replace "your-username" with actual username or pass it dynamically
          />
        ) : (
          <div className="text-center text-gray-500">
            Select a trip to view messages.
          </div>
        )}
      </div>
      <Navbar />
    </div>
  );
};

export default MessageById;
