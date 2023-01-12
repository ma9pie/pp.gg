const FilterUtils = () => {};

FilterUtils.formatPercent = (num) => {
  return (num * 100).toFixed(2) + "%";
};

export default FilterUtils;
