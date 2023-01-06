import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import Loading from "@/components/common/Loading";
import CommonLayout from "@/layouts/CommonLayout";
import AxiosUtils from "@/utils/AxiosUtils";
import useQuery from "@/hooks/useQuery";

function Tiers() {
  const emblemSize = 200;
  const emblemQueryKey = "/api/v1/emblem";

  const emblem = useQuery({
    placeholderData: [],
    queryKey: emblemQueryKey,
    queryFn: () => AxiosUtils.get(emblemQueryKey).then((res) => res.data),
  }).data;

  return (
    <Wrapper>
      {emblem.length === 0 ? (
        <LoadingWrapper>
          <Loading></Loading>
        </LoadingWrapper>
      ) : (
        <Grid>
          {emblem.map((item, key) => (
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
