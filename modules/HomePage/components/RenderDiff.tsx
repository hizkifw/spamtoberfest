import React from "react";
import { parseDiff, Diff, Hunk } from "react-diff-view";
import tokenize from "./tokenize";
import "./diff.module.css";

const RenderDiff = ({ diffText }) => {
  const files = parseDiff(diffText);

  const renderFile = ({ oldRevision, newRevision, type, hunks }) => {
    const tokens = React.useMemo(() => tokenize(hunks), [hunks]);
    return (
      <Diff
        key={oldRevision + "-" + newRevision}
        viewType="split"
        diffType={type}
        hunks={hunks}
        tokens={tokens}
        nearbySequence="zip"
      >
        {(hunks) =>
          hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)
        }
      </Diff>
    );
  };

  return <div style={{ backgroundColor: "#fff" }}>{files.map(renderFile)}</div>;
};

export default RenderDiff;
