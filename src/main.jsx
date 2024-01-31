import React,{useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import ShowList from "./components/ShowList.jsx";
import ShowSummary from "./components/ShowSummary.jsx";

const App= () => {
  const [selectedShow, setSelectedShow] = useState({show:null});

  const handleShowSelect = (show) => {
    setSelectedShow(show);
  };
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<ShowList handleShowSelect={handleShowSelect} />}
          />
          <Route
            path="/show/:id"
            element={<ShowSummary/>}
          />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);