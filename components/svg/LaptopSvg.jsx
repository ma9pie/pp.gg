import * as React from "react";

const SvgComponent = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M4.00195 8C4.00195 7.02892 4.00408 6.40121 4.06626 5.9387C4.12457 5.50496 4.21872 5.36902 4.29485 5.29289C4.37097 5.21677 4.50692 5.12262 4.94066 5.06431C5.40316 5.00212 6.03087 5 7.00195 5H17.002C17.973 5 18.6007 5.00212 19.0632 5.06431C19.497 5.12262 19.6329 5.21677 19.7091 5.29289C19.7852 5.36902 19.8793 5.50496 19.9376 5.9387C19.9998 6.40121 20.002 7.02892 20.002 8V16H4.00195V8Z"
      stroke={props.color}
      strokeWidth="2"
    />
    <path
      d="M3.66862 16C2.74815 16 2.00195 16.7462 2.00195 17.6667C2.00195 18.9553 3.04662 20 4.33529 20H19.6686C20.9573 20 22.002 18.9553 22.002 17.6667C22.002 16.7462 21.2558 16 20.3353 16H3.66862Z"
      stroke={props.color}
      strokeWidth="2"
    />
  </svg>
);

export default SvgComponent;

SvgComponent.defaultProps = {
  color: "var(--icon1)",
  cursor: "pointer",
};
