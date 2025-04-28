import React from "react";
import { Branch } from "../../types/Branch";
import { GitreeContext } from "../../state";
import { FormPanel } from "./FormPanel";

export function BranchForm() {
  const { state, setBranch, setBranchFormCollapsed, buildTree } =
    React.useContext(GitreeContext);
  const { branches, branch, loading, collapsed, error } = state.branchData;
  const { files, truncated } = state.treeData;
  const form = (
    <>
      <section>
        <label>
          Choose branch:
          <select
            disabled={!branches}
            value={branch ? branch.name : ".none"}
            onChange={(e) =>
              setBranch(
                branches!.find((b: Branch) => b.name === e.target.value)!,
              )
            }
          >
            <option value=".none" disabled hidden>
              Select branch
            </option>
            {branches &&
              branches.map((b: Branch) => (
                <option key={b.commitSha} value={b.name}>
                  {b.name}
                </option>
              ))}
          </select>
        </label>
        <button type="button" disabled={!branch} onClick={buildTree}>
          Build tree
        </button>
      </section>
      {truncated && (
        <p>
          It looks like GitHub API response is truncated. Provide your API token
          to fetch all the data.
        </p>
      )}
    </>
  );

  return (
    <FormPanel
      collapsed={collapsed}
      setCollapsed={setBranchFormCollapsed}
      loading={loading}
      error={error}
      isOk={files && files.length}
      title="Branch"
    >
      {form}
    </FormPanel>
  );
}
