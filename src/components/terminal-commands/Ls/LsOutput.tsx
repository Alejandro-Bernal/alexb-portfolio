import "./Ls.css";
import {
    formatProjectsListing,
    formatRootListing,
    formatSkillsListing,
} from "./lsFormat";

type LsOutputProps = {
    path: "root" | "projects" | "skills";
};

export function LsOutput({ path }: LsOutputProps) {
    const listing =
        path === "root"
            ? formatRootListing()
            : path === "projects"
              ? formatProjectsListing()
              : formatSkillsListing();

    return (
        <div className="ls-output" aria-label={`directory listing for ${path}`}>
            <pre className="ls-listing">{listing}</pre>
        </div>
    );
}