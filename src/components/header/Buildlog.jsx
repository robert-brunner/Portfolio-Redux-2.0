import React, { useEffect, useState } from "react";
import "./BuildLog.css";

const GITHUB_USERNAME = "robert-brunner";

const BuildLog = ({ visible }) => {
  const [repoCount, setRepoCount] = useState(null);
  const [stacks, setStacks] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`)
      .then((res) => res.json())
      .then((repos) => {
        if (!Array.isArray(repos)) return;
        setRepoCount(repos.length);

        // Derive "stacks" from primary languages
        const langs = repos
          .map((r) => r.language)
          .filter(Boolean);
        const unique = [...new Set(langs)];
        setStacks(unique.length);
      })
      .catch(() => {
        // silently fail — component still renders without counts
      });
  }, []);



  return (
     <a className={`buildlog ${visible ? "buildlog--visible" : ""}`}>
      <div className="buildlog__main">
        <span className="buildlog__dot" aria-hidden="true" />
        <span className="buildlog__title">BUILD LOG</span>
        <span className="buildlog__cursor" aria-hidden="true" />
        {repoCount !== null && (
          <span className="buildlog__badge">[ {repoCount} ]</span>
        )}
      </div>
      {repoCount !== null && stacks !== null && (
        <div className="buildlog__sub">
          {repoCount} deployments &bull; {stacks} stacks
        </div>
      )}
    </a>
  );
};

export default BuildLog;