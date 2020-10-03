export type PRItem = {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: GithubUser;
  labels: GithubLabel[];
  state: "open" | "closed" | "merged";
  locked: boolean;
  assignee: any;
  assignees: Array<any>;
  milestone: any;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string;
  author_association: string;
  active_lock_reason: string;
  draft: false;
  pull_request: {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
  };
  body: string;
  performed_via_github_app: any;
  score: number;
};

export type GithubLabel = {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: true;
  description: string;
};

export type GithubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: false;
};
