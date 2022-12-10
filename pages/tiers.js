import styled from "@emotion/styled";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import CommonLayout from "@/layouts/CommonLayout";
import Axios from "@/api/index";
import useQuery from "@/hooks/useQuery";

const emblemSize = 200;
function Tiers() {
  const [emblemList, setEmblemList] = useState([]);

  const queryKey = "/api/v1/emblem";
  const query = useQuery({
    queryKey: queryKey,
    queryFn: () =>
      Axios.get(queryKey, {
        params: {},
      }).then((res) => res.data),
  });

  useEffect(() => {
    if (query.data) {
      setEmblemList(query.data);
    }
  }, [query.data]);

  // useEffect(() => {
  //   Axios.get("/api/v1/emblem", {
  //     params: {},
  //   }).then((res) => {
  //     setEmblemList(res.data);
  //   });
  // }, []);

  return (
    <Wrapper>
      {emblemList.length === 0 ? (
        <Loading margin="450px auto"></Loading>
      ) : (
        <Grid>
          {emblemList.map((item, key) => (
            <ImageBox key={key}>
              <Image
                src={item.img}
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
  justify-content: space-between;
  grid-template-columns: repeat(3, 200px);
  padding: 0px 100px;
`;
const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 100px;
`;
const Text = styled.div`
  font: var(--headline18);
`;
const SubText = styled.div`
  font: var(--body14);
  color: var(--sub);
`;
