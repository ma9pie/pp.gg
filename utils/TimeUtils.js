const TimeUtils = () => {};

TimeUtils.getBeforeHours = (date) => {
  const now = new Date();
  const beforeDate = new Date(date);
  const minuts = Math.floor((now - beforeDate) / 1000 / 60);
  const hours = Math.floor((now - beforeDate) / 1000 / 60 / 60);
  const days = Math.floor(hours / 24);
  if (hours < 1) {
    return `${minuts}분 전`;
  } else if (hours <= 24) {
    return `${hours}시간 전`;
  } else {
    return `${days}일 전`;
  }
};

export default TimeUtils;
