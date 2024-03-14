import moment from "moment";

export const formatNumber = (num_string) => {
  if (num_string === undefined || num_string === null) return `-`;

  return num_string.toLocaleString();
};

export const formatGraphTick = (tick) => {
  return tick >= 10 ** 7 ? `${tick / 10 ** 6}M` : formatNumber(tick);
};

export const formatDate = (date) => {
  return moment(date).format("MMM D, YYYY");
};

export const formatName = (name) => {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");
};
