import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import AxiosUtils from "@/utils/AxiosUtils";
import GoogleAnalyticsUtils from "@/utils/GoogleAnalyticsUtils";
import "@/styles/app.scss";

function App({ Component, pageProps }) {
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => page);

  const [queryClient] = useState(() => new QueryClient());

  // 구글 애널리틱스 조회수 측정
  useEffect(() => {
    const handleRouteChange = (url) => {
      GoogleAnalyticsUtils.changeRouteGtag(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydrateState}>
        <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
      </Hydrate>
      <ReactQueryDevtoolsWrapper>
        {typeof window !== "undefined" &&
          window.location.hostname === "localhost" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
      </ReactQueryDevtoolsWrapper>
    </QueryClientProvider>
  );
}

export default App;

export async function getServerSideProps(context) {
  try {
    let props = {};
    await AxiosUtils.get("/api/v1/allUser", {
      params: {},
    }).then(async (res) => {
      await Promise.all(
        res.data.map((user) =>
          AxiosUtils.get("/api/v1/tier", {
            params: { id: user.id },
          }).then((res) => {
            user.tier = res.data.tier;
          })
        )
      );
      props.userList = res.data;
    });
    await AxiosUtils.get("/api/v1/history", {
      params: {},
    }).then((res) => {
      props.history = res.data;
    });
    await AxiosUtils.get("/api/v1/emblem", {
      params: {},
    }).then((res) => {
      props.emblem = res.data;
    });
    return { props: props };
  } catch (error) {
    return { props: { error: JSON.stringify(error) } };
  }
}

const ReactQueryDevtoolsWrapper = styled.div`
  background-color: black !important;
  color: white !important;
  & * {
    background-color: inherit;
    color: inherit;
  }
`;

// import { memberState } from "@/recoil/atom";
// import { useRecoilState } from "recoil";
// const [member, setMember] = useRecoilState(memberState);
