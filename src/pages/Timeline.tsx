import { useState, useEffect } from "react";
import { Chrono } from "react-chrono";
import axios from "axios";

export default function Timeline() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/timeline-event"
        );
        const apiData = response.data;

        setItems(apiData);
      } catch (error) {
        console.error("Error fetching timeline items:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {items.length > 0 ? (
        <Chrono
          items={items}
          mode="VERTICAL_ALTERNATING"
          // cardWidth={450}
          cardHeight={300}
          contentDetailsHeight={100}
          enableDarkToggle={true}
          disableToolbar={true}
          enableOutline={true}
          fontSizes={{
            title: "1rem",
          }}
        />
      ) : (
        <p>No items to display.</p> // Provide feedback if no items are present
      )}
    </div>
  );
}
