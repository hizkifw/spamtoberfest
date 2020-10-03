/**
 * https://codesandbox.io/s/react-diff-view-mark-edits-demo-8ndcl?file=/src/tokenize.js:0-1979
 */

import { tokenize, markEdits, pickRanges } from "react-diff-view";
import { flatMap } from "lodash";

const TOKEN_TYPE_SPACE = "space";

const findLeadingRange = (change) => {
  const [spaces] = /^\s*/.exec(change.content);
  return spaces
    ? {
        type: TOKEN_TYPE_SPACE,
        lineNumber: change.lineNumber,
        start: 0,
        length: spaces.length,
        properties: { value: spaces },
      }
    : null;
};

const findTrailingRange = (change) => {
  const [spaces] = /\s*$/.exec(change.content);
  return spaces
    ? {
        type: TOKEN_TYPE_SPACE,
        lineNumber: change.lineNumber,
        start: change.content.length - spaces.length,
        length: spaces.length,
        properties: { value: spaces },
      }
    : null;
};

const pickLeadingAndTrailingSpaces = (hunks) => {
  const changes = flatMap(hunks, (hunk) => hunk.changes);
  const [oldRanges, newRanges] = changes.reduce(
    ([oldRanges, newRanges], change) => {
      const leadingRange = findLeadingRange(change);
      const trailingRange = findTrailingRange(change);
      const pushRange = (ranges) => {
        leadingRange && ranges.push(leadingRange);
        trailingRange && ranges.push(trailingRange);
      };

      if (!change.isInsert) {
        pushRange(oldRanges);
      }
      if (!change.isDelete) {
        pushRange(newRanges);
      }

      return [oldRanges, newRanges];
    },
    [[], []]
  );
  return pickRanges(oldRanges, newRanges);
};

export default (hunks) => {
  if (!hunks) {
    return undefined;
  }

  const options = {
    highlight: false,
    enhancers: [
      markEdits(hunks, { type: "block" }),
      pickLeadingAndTrailingSpaces(hunks),
    ],
  };

  try {
    return tokenize(hunks, options);
  } catch (ex) {
    return undefined;
  }
};
