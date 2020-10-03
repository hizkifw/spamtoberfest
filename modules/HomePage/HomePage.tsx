import React from "react";
import Head from "next/head";
import { Container, ProgressBar } from "react-bootstrap";
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
          href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.5.2/cyborg/bootstrap.min.css"
          integrity="sha512-v2h7RYQ8d6LaG0M3OZVeTdtGaNInlFiuOBZVoLja0mY7aLM4FL/mQTGjAjqw9n85rCb3RSwo8DAurMfHHTLTJg=="
          crossOrigin="anonymous"
        />
      </Head>
      <Container>
        <div className="h3">Spamtoberfest</div>
        {!!currentItem ? (
          <RenderDiff diffText={currentItem.diff} />
        ) : (
          <ProgressBar animated now={100} variant="primary" />
        )}
      </Container>
    </>
  );
};

export default HomePage;
