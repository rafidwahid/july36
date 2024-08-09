import { useState } from "react";
import axios from "axios";

export default function NewEventItems() {
  const [formData, setFormData] = useState({
    date: "",
    cardTitle: "",
    cardSubtitle: "",
    cardDetailedText: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/timeline-event-item",
        formData
      );
      console.log("Data submitted:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      <table className="table-auto w-full">
        <tbody>
          <tr className="mb-4">
            <td className="pr-4">
              <label htmlFor="date" className="block text-gray-700">
                Date
              </label>
            </td>
            <td>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </td>
          </tr>
          <tr className="mb-4">
            <td className="pr-4">
              <label htmlFor="cardTitle" className="block text-gray-700">
                Card Title
              </label>
            </td>
            <td>
              <input
                type="text"
                id="cardTitle"
                name="cardTitle"
                value={formData.cardTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </td>
          </tr>
          <tr className="mb-4">
            <td className="pr-4">
              <label htmlFor="cardSubtitle" className="block text-gray-700">
                Card Subtitle
              </label>
            </td>
            <td>
              <input
                type="text"
                id="cardSubtitle"
                name="cardSubtitle"
                value={formData.cardSubtitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </td>
          </tr>
          <tr className="mb-4">
            <td className="pr-4">
              <label htmlFor="cardDetailedText" className="block text-gray-700">
                Detail Text
              </label>
            </td>
            <td>
              <textarea
                id="cardDetailedText"
                name="cardDetailedText"
                value={formData.cardDetailedText}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>
              <button
                type="submit"
                className="w-full px-3 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
              >
                Submit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
