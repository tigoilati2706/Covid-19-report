import { formatNumber, formatDate, formatName } from "../../utils/format";

import "./graphs.scss";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const name = payload[0].name;

    return (
      <div className="custom-tooltip">
        <p className="label">{formatDate(label)}</p>
        <p className="value">
          {`${formatName(name)}: `} <span>{`${formatNumber(value)}`}</span>
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
