const regExp = {
  nameCheckRegExp: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\s]+$/,
  idCheckRegExp: /^[A-Za-z0-9]{6,20}$/,
  passwordCheckRegExp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/,
};
export default regExp;
