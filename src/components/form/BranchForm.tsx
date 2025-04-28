import React from "react";
import { Branch } from "../../types/Branch";
import { FormPanel } from "./FormPanel";
import { useActions, useGitreeState } from "../../state/hooks";
import { TruncationWarning } from "./TruncationWarning";

export function BranchForm() {
  const { treeData, branchData } = useGitreeState();
  const { setBranch, setBranchFormCollapsed, buildTree } = useActions("branch");
  const { branches, branch, loading, collapsed, error } = branchData;

  return (
    <FormPanel
      collapsed={collapsed}
      setCollapsed={setBranchFormCollapsed}
      loading={loading}
      error={error}
      isOk={treeData.files?.length > 0}
      title="Branch"
    >
      <section>
        <label>
          Choose branch:
          <select
            disabled={!branches}
            value={branch ? branch.name : ".none"}
            onChange={(e) => {
              const branchName = e.target.value;
              const branch = (branches ?? []).find(
                (b: Branch) => b.name === branchName,
              );
              if (!branch) {
                throw Error(`Branch ${branchName} not found`);
              }
              setBranch(branch);
            }}
          >
            <option value=".none" disabled hidden>
              Select branch
            </option>
            {(branches ?? []).map((b: Branch) => (
              <option key={b.commitSha + b.name} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
        <button type="button" disabled={!branch} onClick={buildTree}>
          Build tree
        </button>
      </section>
      <TruncationWarning />
    </FormPanel>
  );
}
