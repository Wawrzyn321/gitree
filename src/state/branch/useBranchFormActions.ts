import { fetchFiles } from "../../api/api";
import { buildTree } from "../../domain/fileTree";
import { Branch } from "../../types/Branch";
import { Actions, ActionTypes } from "../actions";
import { AppState, BranchFormActions } from "../types";

export function useBranchFormActions(
  state: AppState,
  dispatch: React.ActionDispatch<[action: Actions]>,
): BranchFormActions {
  return {
    setBranchFormCollapsed: (collapsed: boolean) => {
      dispatch({ type: ActionTypes.SET_BRANCH_FORM_COLLAPSED, collapsed });
    },
    setBranch: (branch: Branch) => {
      dispatch({ type: ActionTypes.SET_BRANCH, branch });
    },
    buildTree: async () => {
      dispatch({ type: ActionTypes.FETCH_FILES });
      const { owner, token } = state.ownerData;
      const { repoName } = state.repoData;
      const { branch } = state.branchData;
      try {
        if (!repoName) {
          throw Error("Repo is not defined");
        }

        const { files, truncated } = await fetchFiles(
          owner,
          token,
          repoName,
          branch!.commitSha,
        );

        dispatch({
          type: ActionTypes.BUILD_TREE,
          error: null,
          files,
          tree: buildTree(`${repoName}@${branch!.name}`, files),
          truncated,
        });
      } catch (e) {
        if (e instanceof Error) {
          dispatch({
            type: ActionTypes.BUILD_TREE,
            error: `Can't fetch files: ${e.message}.`,
            files: [],
            tree: null,
            truncated: false,
          });
        } else {
          throw e;
        }
      }
    },
  };
}
