import Graph from "../../Graph";
import GlobalSummary from "./GlobalSummary";
import { formatNumber } from "../../../utils/format";

import "./globalsection.scss";

const GlobalSection = ({ data }) => {
  if (!data) return <div></div>;

  const timeline = data.data;
  const latest = timeline[timeline.length - 1];

  const latest_cases = [
    {
      description: "total cases",
      data: formatNumber(latest.total_cases),
    },
    {
      description: "new cases",
      data: formatNumber(latest.new_cases),
    },
  ];

  const latest_deaths = [
    {
      description: "total deaths",
      data: formatNumber(latest.total_deaths),
    },
    {
      description: "new deaths",
      data: formatNumber(latest.new_deaths),
    },
  ];

  const latest_vaccinations = [
    {
      description: "people received at least 1 vaccine dose",
      data: formatNumber(latest.people_vaccinated),
    },
    {
      description: "people fully vaccinated",
      data: formatNumber(latest.people_fully_vaccinated),
    },
  ];

  return (
    <section id="global">
      <h2>Global Statistics</h2>
      <GlobalSummary data={latest} />
      <Graph
        title="Cases"
        options={[
          { label: "Cumulative", value: "total_cases" },
          { label: "Daily", value: "new_cases" },
        ]}
        data={timeline}
        latest={latest_cases}
      />
      <Graph
        title="Deaths"
        options={[
          { label: "Cumulative", value: "total_deaths" },
          { label: "Daily", value: "new_deaths" },
        ]}
        data={timeline}
        latest={latest_deaths}
      />
      <Graph
        title="Vaccinations"
        options={[
          { label: "Vaccines administered", value: "total_vaccinations" },
          { label: "People vaccinated", value: "people_vaccinated" },
          {
            label: "People fully vaccinated",
            value: "people_fully_vaccinated",
          },
        ]}
        data={timeline.filter((item) => item.total_vaccinations >= 0)}
        latest={latest_vaccinations}
      />
    </section>
  );
};

export default GlobalSection;
