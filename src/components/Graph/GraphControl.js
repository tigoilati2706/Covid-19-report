import "./graphs.scss";

const GraphControl = ({ options, handleDataChange, children }) => {
  return (
    <div className="graph-control">
      <form action="">
        <select onChange={(e) => handleDataChange(e)}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </form>
      {children}
    </div>
  );
};

export default GraphControl;
