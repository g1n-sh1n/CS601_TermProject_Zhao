import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle.tsx";
import { profile } from "../data/profile.ts";
import type { GitHubRepo } from "../types.ts";

// Extra credit: loads my public repos live from the GitHub REST API.
type Status = "loading" | "done" | "error";

function GitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    // AbortController cancels the request if the user leaves the page first
    const controller = new AbortController();

    fetch(`https://api.github.com/users/${profile.github}/repos?sort=updated&per_page=12`, {
      signal: controller.signal
    })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub responded with ${response.status}`);
        return response.json() as Promise<GitHubRepo[]>;
      })
      .then((data) => {
        setRepos(data.filter((repo) => !repo.fork));
        setStatus("done");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStatus("error");
      });

    return () => controller.abort();
  }, []);

  return (
    <section aria-labelledby="repos-title" className="repos">
      <SectionTitle id="repos-title">Live from GitHub</SectionTitle>

      {status === "loading" && <p aria-live="polite">Loading repositories…</p>}

      {status === "error" && (
        <p role="alert">
          Could not load repositories right now. You can still visit{" "}
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">my GitHub profile</a>.
        </p>
      )}

      {status === "done" && (
        <ul className="repo-list">
          {repos.map((repo) => (
            <li key={repo.id} className="repo-item">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
              <p>{repo.description ?? "No description yet."}</p>
              <p className="repo-meta">
                {repo.language ?? "—"} · ★ {repo.stargazers_count} · updated{" "}
                <time dateTime={repo.updated_at}>{new Date(repo.updated_at).toLocaleDateString()}</time>
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default GitHubRepos;
