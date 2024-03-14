export const fetchData = async () => {
  try {
    const latest_data = await fetchLatestData();
    const all_data = await fetchAllData();

    return { latest_data, all_data };
  } catch {
    console.error("Error: Unable to fetch covid data");
    return { error: true };
  }
};

export const filterGlobalData = (data) => {
  if (data == null) return;

  return data.OWID_WRL;
};

export const filterCountryData = (data) => {
  if (data == null) return;

  const results = [];
  for (let obj in data) {
    if (obj.match(/\b\w*owid\w*\b/gi)) continue;
    results.push(data[obj]);
  }
  return results;
};

/* Helper Functions */

const fetchLatestData = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json"
  );

  if (!response.ok) return null;

  return response.json();
};

const fetchAllData = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid.json"
  );

  if (!response.ok) return null;

  return response.json();
};
