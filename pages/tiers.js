import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import Loading from "@/components/common/Loading";
import CommonLayout from "@/layouts/CommonLayout";
import SsrAxiosUtils from "@/utils/SsrAxiosUtils";
import useQuery from "@/hooks/useQuery";

function Tiers(props) {
  const emblemSize = 200;
  const emblemQueryKey = "/api/v1/emblem";

  useQuery({
    queryKey: emblemQueryKey,
    queryFn: () => {
      return props.emblem;
    },
  });

  return (
    <Wrapper>
      {props.emblem.length === 0 ? (
        <LoadingWrapper>
          <Loading></Loading>
        </LoadingWrapper>
      ) : (
        <Grid>
          {props.emblem.map((item, key) => (
            <ImageBox key={key}>
              <Image
                src={item.imgUrl}
                width={emblemSize}
                height={emblemSize}
                alt="emblem"
              ></Image>
              <Text>{item.name}</Text>
              <SubText>승률 {item.rate}% 이상</SubText>
            </ImageBox>
          ))}
        </Grid>
      )}
    </Wrapper>
  );
}

export default Tiers;

Tiers.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};

export async function getServerSideProps(context) {
  try {
    const props = {};
    await SsrAxiosUtils.get("/api/v1/emblem").then((res) => {
      props.emblem = res.data;
    });
    return { props: props };
  } catch (error) {
    return { props: { error: JSON.stringify(error) } };
  }
}

const Wrapper = styled.div``;
const Grid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 250px);
  padding: 0px 100px;
`;
const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 40px;
`;
const Text = styled.div`
  font: var(--headline18);
`;
const SubText = styled.div`
  font: var(--body14);
  color: var(--sub);
`;
const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 108px);
`;
