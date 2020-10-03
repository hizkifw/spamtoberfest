import { NextApiRequest, NextApiResponse } from "next";
import { PRItem } from "../../modules/HomePage/github.interface";

export type RandomAPIResponse = {
  created_at: string;
  updated_at: string;
  url: string;
  id: number;
  number: number;
  state: string;
  repository: {
    slug: string;
    url: string;
  };
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
  const query = "is:pr label:spam docs";
  /**
   * There's about 756 PRs matching the search as of this commit.
   * At 10 per page, that's around 75 pages.
   * @TODO improve
   */
  const page = Math.floor(Math.random() * 75);
  const searchResult = await fetch(
    `https://api.github.com/search/issues?q=${encodeURIComponent(
      query
    )}&sort=updated&per_page=10&page=${page}`,
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

  const repoSlug = item.repository_url.split("/").slice(-2).join("/");

  const response: RandomAPIResponse = {
    created_at: item.created_at,
    updated_at: item.updated_at,
    url: item.html_url,
    id: item.id,
    number: item.number,
    state: item.state,
    repository: {
      slug: repoSlug,
      url: "https://github.com/" + repoSlug,
    },
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
