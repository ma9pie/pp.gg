import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";

function ProfileImage(props) {
  return (
    <Wrapper {...props}>
      {props.src && (
        <Image
          src={props.src}
          width={props.width}
          height={props.height}
          alt="profileImg"
        ></Image>
      )}
    </Wrapper>
  );
}

export default ProfileImage;

ProfileImage.defaultProps = {
  width: "48px",
  height: "48px",
  border: "0px",
  borderRadius: "50%",
  src: null,
};

const Wrapper = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  overflow: hidden;
`;
