
import { Routes, Route } from "react-router-dom";

function Home() {
  return <h1 className="text-4xl">BookMyVenue 🚀</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;