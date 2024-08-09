import { Chrono } from "react-chrono";
import { items } from "./data";

export default function Timeline() {
  return (
    <div style={{ width: "100%" }}>
      {
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
      }
    </div>
  );
}
