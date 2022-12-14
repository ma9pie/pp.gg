import * as React from "react";

const SvgComponent = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.4826 19.7396C18.8297 20.0868 19.3925 20.0868 19.7396 19.7396C20.0868 19.3925 20.0868 18.8297 19.7396 18.4826L13.2571 12L19.7396 5.51743C20.0868 5.1703 20.0868 4.60748 19.7396 4.26035C19.3925 3.91322 18.8297 3.91322 18.4826 4.26035L12 10.7429L5.51743 4.26035C5.1703 3.91322 4.60748 3.91322 4.26035 4.26035C3.91322 4.60748 3.91322 5.17029 4.26035 5.51743L10.7429 12L4.26034 18.4826C3.91321 18.8297 3.91321 19.3925 4.26034 19.7396C4.60747 20.0868 5.17029 20.0868 5.51742 19.7396L12 13.2571L18.4826 19.7396Z"
      fill={props.color}
    />
  </svg>
);

export default SvgComponent;

SvgComponent.defaultProps = {
  color: "var(--main)",
  cursor: "pointer",
};
