import React from "react";
import Head from "next/head";
import { Button, Card, Container, ProgressBar } from "react-bootstrap";
import { RandomAPIResponse } from "../../pages/api/random";
import RenderDiff from "./components/RenderDiff";

const HomePage = () => {
  const [currentItem, setCurrentItem] = React.useState<RandomAPIResponse>(null);

  const fetchNewItem = () => {
    setCurrentItem(null);
    fetch("/api/random")
      .then((res) => res.json())
      .then(setCurrentItem);
  };

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
      <Container className="mt-4">
        <div className="h3">Spamtoberfest</div>
        {!!currentItem ? (
          <div>
            <Button variant="primary" onClick={fetchNewItem} className="mb-3">
              Get a new one
            </Button>
            <Card className="mb-4">
              <Card.Header>
                <a href={currentItem.repository.url} className="text-dark">
                  <Card.Text className="mb-0">
                    {currentItem.repository.slug}
                  </Card.Text>
                </a>
                <Card.Title>
                  {currentItem.title}
                  <a href={currentItem.url} className="text-secondary ml-2">
                    #{currentItem.number}
                  </a>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  {!!currentItem.body ? (
                    <pre>{currentItem.body}</pre>
                  ) : (
                    "(no description provided)"
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
            <RenderDiff diffText={currentItem.diff} />
          </div>
        ) : (
          <ProgressBar animated now={100} variant="primary" />
        )}
      </Container>
    </>
  );
};

export default HomePage;
