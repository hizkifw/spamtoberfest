import React from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import { RandomAPIResponse } from "../../pages/api/random";
import RenderDiff from "./components/RenderDiff";

const HomePage = () => {
  const [currentItem, setCurrentItem] = React.useState<RandomAPIResponse>(null);

  const fetchNewItem = () =>
    fetch("/api/random")
      .then((res) => res.json())
      .then(setCurrentItem);

  React.useEffect(() => {
    fetchNewItem();
  }, []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.5.2/slate/bootstrap.min.css"
          integrity="sha512-YjfrOR3ZCJt6xtVn6J6O/CkcCkR1pSZgva/yScp7pq9cc25tWZRtVdKHMoz1T5au89zWfRO+lwMBk+n+bCzsjQ=="
          crossOrigin="anonymous"
        />
      </Head>
      <Container>
        {!!currentItem && <RenderDiff diffText={currentItem.diff} />}
      </Container>
    </>
  );
};

export default HomePage;
