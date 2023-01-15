import styled from "@emotion/styled";
import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import CommonLayout from "@/layouts/CommonLayout";

const SwaggerUI = dynamic(import("swagger-ui-react"), { ssr: false });

function ApiDocs({ spec }) {
  return (
    <Wrapper>
      <SwaggerUI spec={spec}></SwaggerUI>
    </Wrapper>
  );
}

export const getStaticProps = async () => {
  const spec = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "PP.GG API Docs",
        version: "1.0",
      },
    },
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDocs;

ApiDocs.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};

const Wrapper = styled.div`
  .info {
    margin: 0px;
    padding: 24px 0px;
  }
  & * {
    font-family: none;
    background-color: unset;
    color: unset;
  }
`;
