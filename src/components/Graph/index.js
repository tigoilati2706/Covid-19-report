import { useState } from "react";
import { formatGraphTick, formatDate } from "../../utils/format";
import CustomTooltip from "./CustomTooltip";
import GraphControl from "./GraphControl";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

import "./graphs.scss";

const Graph = ({ title, options, data, latest }) => {
  const [graphData, setGraphData] = useState(options[0].value);

  const handleDataChange = (e) => setGraphData(e.target.value);

  return (
    <div data-graph={title} className="graph-container">
      <div className="latest-info">
        {latest.map((obj, index) => (
          <p key={index}>
            <span>{obj.data}</span> {obj.description}
          </p>
        ))}
      </div>
      <GraphControl options={options} handleDataChange={handleDataChange}>
        <ResponsiveContainer width={"100%"} height={250}>
          <BarChart data={data} margin={{ top: 20, bottom: 30, left: 10 }}>
            <XAxis
              dataKey="date"
              interval="preserveStart"
              tickFormatter={formatDate}
              tick={{ fontSize: 12 }}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              orientation="right"
              tickFormatter={formatGraphTick}
              tick={{ fontSize: 12 }}
              padding={{ top: 15 }}
            />
            <Tooltip
              content={<CustomTooltip />}
              position={{ y: 200 }}
              cursor={{ fill: "rgb(192, 26, 8)" }}
            />
            <Bar
              dataKey={graphData}
              fill="rgba(100, 100, 100, 0.5)"
              minPointSize={2}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </GraphControl>
    </div>
  );
};

export default Graph;
