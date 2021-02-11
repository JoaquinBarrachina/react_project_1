import React, { useState, useEffect } from "react";
import "./App.css";
import Loading from "./components/Loding";
import Tours from "./components/Tours";
const url = "https://course-api.com/react-tours-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };
  const fetchTours = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      setTours(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log("error");
    }
  };
  useEffect(() => {
    fetchTours();
  }, []);
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No tours left</h2>
          <button className="btn" onClick={fetchTours}>
            Load again
          </button>
        </div>
      </main>
    );
  }
  return (
    <React.Fragment>
      <main>
        <Tours tours={tours} removeTour={removeTour} />
      </main>
    </React.Fragment>
  );
}

export default App;
