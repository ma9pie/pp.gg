import Head from "next/head";
import React from "react";

function HeadComponent(props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
    </Head>
  );
}

export default HeadComponent;

HeadComponent.defaultProps = {
  title: "PP.GG",
  description: "탁구 전적 사이트 입니다.",
};
