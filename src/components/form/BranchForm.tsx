import React from "react";
import { Branch } from "../../types/GithubFile";
import { GitreeContext } from "../../state";
import { FormPanel } from "./FormPanel";

export function BranchForm() {
  const { state, setBranch, buildTree } = React.useContext(GitreeContext);
  const { branches, branch, loading, collapsed, error } = state.branchData;
  const { files } = state.treeData;
  const form = (
    <section>
      <label>
        Choose branch:
        <select
          disabled={!branches}
          value={branch ? branch.name : ".none"}
          onChange={(e) =>
            setBranch(branches!.find((b: Branch) => b.name === e.target.value)!)
          }
        >
          <option value=".none" disabled hidden>
            Select branch
          </option>
          {branches &&
            branches.map((b: Branch) => (
              <option key={b.name} value={b.name}>
                {b.name}
              </option>
            ))}
        </select>
      </label>
      <button type="button" disabled={!branch} onClick={buildTree}>
        Build tree
      </button>
    </section>
  );

  return (
    <FormPanel
      collapsed={collapsed}
      loading={loading}
      error={error}
      isOk={files && files.length}
      title="Branch"
    >
      {form}
    </FormPanel>
  );
}
