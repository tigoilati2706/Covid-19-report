import { useState, useEffect } from "react";

import Layout from "./components/Layout";

import "./App.scss";

const App = () => {
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {}, []);

  return (
    <div className="App">
      <Layout></Layout>
    </div>
  );
};

export default App;
