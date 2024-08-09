import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface ItemDetails {
  id: string;
  cardTitle: string;
  cardSubtitle: string;
  cardDetailedText: string;
  date: string;
  url: string;
  imageUrl?: string;
}

export default function EditTimeline() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const currentId = id ? Number(id) : NaN;

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ItemDetails>({
    id: "",
    cardTitle: "",
    cardSubtitle: "",
    cardDetailedText: "",
    date: "",
    url: "",
    imageUrl: "",
  });

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get<ItemDetails>(
          `${import.meta.env.VITE_API_URL}/timeline-event-item/${id}`
        );

        setFormData(response.data);
      } catch (err) {
        setError("Error fetching item details");
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "cardDetailedText" && textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${e.target.scrollHeight}px`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) throw new Error("API URL is not defined");

      await axios.patch(`${apiUrl}/timeline-event-item/${id}`, formData);
      alert("Item updated successfully");
    } catch (err) {
      setError("Error updating item");
    }
  };

  const handlePrevious = () => {
    if (!isNaN(currentId) && currentId > 1) {
      const prevId = currentId - 1;
      navigate(`/timeline_item/${prevId}`);
    } else {
      alert("No previous item");
    }
  };

  const handleNext = () => {
    if (!isNaN(currentId)) {
      const nextId = currentId + 1;
      navigate(`/timeline_item/${nextId}`);
    } else {
      alert("No next item");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Edit Item Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              <tr>
                <td className="p-2 font-medium text-gray-700">Card Title</td>
                <td className="p-2">
                  <input
                    type="text"
                    name="cardTitle"
                    value={formData.cardTitle || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2 font-medium text-gray-700">Card Subtitle</td>
                <td className="p-2">
                  <input
                    type="text"
                    name="cardSubtitle"
                    value={formData.cardSubtitle || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2 font-medium text-gray-700">
                  Card Detailed Text
                </td>
                <td className="p-2">
                  <textarea
                    name="cardDetailedText"
                    value={formData.cardDetailedText || ""}
                    onChange={handleChange}
                    ref={textAreaRef}
                    className="w-full h-40 p-2 border border-gray-300 rounded-md shadow-sm resize-none"
                    rows={1} // Start with a small height
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2 font-medium text-gray-700">Date</td>
                <td className="p-2">
                  <input
                    type="date"
                    name="date"
                    value={formData.date || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2 font-medium text-gray-700">URL</td>
                <td className="p-2">
                  <input
                    type="url"
                    name="url"
                    value={formData.url || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2 font-medium text-gray-700">Image URL</td>
                <td className="p-2">
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handlePrevious}
            className="bg-gray-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-700"
          >
            Previous
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="bg-gray-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-700"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
