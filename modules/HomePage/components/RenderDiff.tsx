import React from "react";
import { parseDiff, Diff, Hunk } from "react-diff-view";
import tokenize from "./tokenize";
import "./diff.module.css";
import { Card } from "react-bootstrap";

const RenderDiff = ({ diffText }) => {
  const files = parseDiff(diffText, {
    nearbySequence: "zip",
  });

  const renderFile = ({ oldRevision, newRevision, type, hunks, newPath }) => {
    const tokens = React.useMemo(() => tokenize(hunks), [hunks]);
    return (
      <Card className="mb-2">
        <Card.Header>
          <Card.Text>{newPath}</Card.Text>
        </Card.Header>
        <Card.Body className="p-0">
          <Diff
            key={oldRevision + "-" + newRevision}
            viewType="split"
            diffType={type}
            hunks={hunks}
            tokens={tokens}
          >
            {(hunks) =>
              hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)
            }
          </Diff>
        </Card.Body>
      </Card>
    );
  };

  return <div>{files.map(renderFile)}</div>;
};

export default RenderDiff;
