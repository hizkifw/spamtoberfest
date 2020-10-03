import { NextApiRequest, NextApiResponse } from "next";
import { PRItem } from "../../modules/HomePage/github.interface";

export type RandomAPIResponse = {
  created_at: string;
  updated_at: string;
  url: string;
  id: number;
  title: string;
  body: string;
  comments: number;
  diff: string;
  user: {
    login: string;
    url: string;
    avatar_url: string;
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const searchResult = await fetch(
    "https://api.github.com/search/issues?q=label:spam&sort=updated",
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    }
  ).then((res) => res.json());
  const items: PRItem[] = searchResult.items;
  const pullRequests = items.filter((item) => !!item.pull_request);

  const item: PRItem =
    pullRequests[Math.floor(Math.random() * pullRequests.length)];

  const diff = await fetch(item.pull_request.diff_url).then((res) =>
    res.text()
  );

  const response: RandomAPIResponse = {
    created_at: item.created_at,
    updated_at: item.updated_at,
    url: item.html_url,
    id: item.id,
    title: item.title,
    body: item.body,
    comments: item.comments,
    diff,
    user: {
      login: item.user.login,
      url: item.user.html_url,
      avatar_url: item.user.avatar_url,
    },
  };

  res.status(200).json(response);
};
