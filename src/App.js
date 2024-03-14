import { useState, useEffect } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import { GlobalSection, CountrySection } from "./components/Sections";
import { fetchData, filterGlobalData, filterCountryData } from "./utils/api";

import "./App.scss";

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const initialLoad = async () => {
      const response = await fetchData();

      if (response.error) {
        setError(true);
        return;
      }

      const { latest_data, all_data } = response;
      setData({ latest_data, all_data });
    };

    initialLoad();
  }, []);

  let content = data ? (
    <>
      <GlobalSection data={filterGlobalData(data.all_data)} />
      <CountrySection data={filterCountryData(data.latest_data)} />
    </>
  ) : (
    <>
      <Loader />
    </>
  );

  if (error) {
    return (
      <div>
        <strong>Server Error:</strong>  
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        <Header />
        <main>{content}</main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
