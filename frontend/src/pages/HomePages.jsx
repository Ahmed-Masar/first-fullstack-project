import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NoteNotFound from "../components/NoteNotFound";

const HomePages = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const fecthNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data.notes);
        setNotes(res.data.notes);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fecthNotes();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isloading && (
          <div className="text-center text-primary py-10">Loading Notes...</div>
        )}

        {notes.length === 0 && !isRateLimited && !isloading && <NoteNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div key={note._id}>
                <NoteCard note={note} setNotes={setNotes} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePages;
