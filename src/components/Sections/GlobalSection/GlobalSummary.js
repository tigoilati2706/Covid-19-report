import { formatNumber, formatDate } from "../../../utils/format";

import "./globalsection.scss";

const GlobalSummary = ({ data }) => {
  return (
    <div className="global-summary">
      <p>
        Information as of: <span>{formatDate(data.date)}</span>
      </p>
      <div className="summary__inner">
        <div className="summary__card">
          <p>
            <span>{formatNumber(data.total_cases)}</span>
            confirmed cases
          </p>
        </div>
        <div className="summary__card">
          <p>
            <span>{formatNumber(data.total_deaths)}</span> confirmed deaths
          </p>
        </div>
        <div className="summary__card">
          <p>
            <span>{formatNumber(data.total_vaccinations)}</span>
            vaccine doses administered globally
          </p>
        </div>
        <div className="summary__card">
          <p>
            <span>{formatNumber(data.new_vaccinations)}</span>
            vaccine doses administered today
          </p>
        </div>
        <div className="summary__card">
          <p>
            <span>{`${data.people_fully_vaccinated_per_hundred}%`}</span>
            of the population fully vaccinated
          </p>
        </div>
        <div className="summary__card">
          <p>
            <span>{`${data.people_vaccinated_per_hundred}%`}</span>
            of the population received at least 1 vaccine dose
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalSummary;
