import React, { useEffect } from "react";
import L from "leaflet";

const App = () => {
  useEffect(() => {
    const map = L.map("map").setView([37.8, -96], 4);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    fetch("https://eric.clst.org/assets/wiki/uploads/Stuff/gz_2010_us_040_00_500k.json")
      .then(res => res.json())
      .then(data => {
        L.geoJSON(data, {
          onEachFeature: (feature, layer) => {
            const state = feature.properties.NAME;
            layer.on({
              click: () => {
                alert(`Selected: ${state}`);
              }
            });
            layer.bindTooltip(state);
          },
          style: {
            color: "#3388ff",
            weight: 1,
            fillOpacity: 0.2
          }
        }).addTo(map);
      });
  }, []);

  return (
    <div id="map" className="h-screen w-screen"></div>
  );
};

export default App;
