import { HiSortAscending, HiSortDescending } from "react-icons/hi";

import "./filter.scss";

const Filter = ({ ascending, sortValue, toggleAscending, handleChange }) => {
  return (
    <div className="filter-container">
      <div className="sort-icon">
        {ascending ? (
          <HiSortAscending
            className="hi-sort"
            size={20}
            onClick={() => toggleAscending()}
          />
        ) : (
          <HiSortDescending
            className="hi-sort"
            size={20}
            onClick={() => toggleAscending()}
          />
        )}
      </div>

      <select
        className="filter-select"
        value={sortValue}
        onChange={(e) => handleChange(e.target.value)}
        title="Select a filter option to sort the data"
        aria-label="Sort the data by"
      >
        <option value="location">Alphabetical</option>
        <option value="total_cases">Cases</option>
        <option value="population">Population</option>
        <option value="total_deaths">Deaths</option>
        <option value="people_vaccinated">People Vaccinated</option>
        <option value="people_fully_vaccinated">People Fully Vaccinated</option>
        <option value="people_fully_vaccinated_per_hundred">
          % Fully Vaccinated
        </option>
      </select>
    </div>
  );
};
export default Filter;
