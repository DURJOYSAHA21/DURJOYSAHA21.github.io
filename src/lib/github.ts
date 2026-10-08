import { GITHUB_USER } from "./site";

const API = "https://api.github.com";
const TTL_MS = 30 * 60 * 1000;

export type Repo = {
  name: string;
  stargazers_count: number;
  html_url: string;
  pushed_at: string;
};

/**
 * The site is fully static, so every visitor hits the API themselves and the
 * unauthenticated cap is 60 requests/hour per IP. One call per visit, cached in
 * session storage, keeps a few refreshes from exhausting it.
 */
export async function getRepos(): Promise<Repo[] | null> {
  if (typeof window === "undefined") return null;

  const url = `${API}/users/${GITHUB_USER}/repos?per_page=100&sort=updated`;
  const key = `gh:${url}`;

  try {
    const hit = sessionStorage.getItem(key);
    if (hit) {
      const parsed = JSON.parse(hit) as { at: number; data: Repo[] };
      if (Date.now() - parsed.at < TTL_MS) return parsed.data;
    }
  } catch {
    /* stale or blocked storage: fall through to a live fetch */
  }

  const request = () =>
    fetch(url, { headers: { Accept: "application/vnd.github+json" } }).then((res) =>
      res.ok ? (res.json() as Promise<Repo[]>) : null
    );

  try {
    let data = await request();
    // one retry so a dropped request does not leave the cards blank until reload
    if (data === null) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      data = await request();
    }
    if (data === null) return null;

    try {
      sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), data }));
    } catch {
      /* quota: not worth failing the widget over */
    }
    return data;
  } catch {
    return null;
  }
}
