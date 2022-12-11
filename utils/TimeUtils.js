const TimeUtils = () => {};

TimeUtils.getBeforeHours = (date) => {
  const now = new Date();
  const beforeDate = new Date(date);
  const hours = Math.floor((now - beforeDate) / 1000 / 60 / 60);
  const days = Math.floor(hours / 24);

  if (hours <= 24) {
    return `${hours}시간 전`;
  } else {
    return `${days}일 전`;
  }

  return hours;
};

export default TimeUtils;
