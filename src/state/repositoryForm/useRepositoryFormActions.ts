import { fetchBranches } from "../../api/api";
import { Branch } from "../../types/Branch";
import { Actions, ActionTypes } from "../actions";
import { AppState, RepositoryFormActions } from "../types";

export function useRepositoryFormActions(
  state: AppState,
  dispatch: React.ActionDispatch<[action: Actions]>,
): RepositoryFormActions {
  return {
    setRepoFormCollapsed: (collapsed: boolean) => {
      dispatch({ type: ActionTypes.SET_REPO_FORM_COLLAPSED, collapsed });
    },
    setRepoName: (repoName: string) => {
      dispatch({ type: ActionTypes.SET_REPO, repoName });
    },
    getBranches: async () => {
      dispatch({ type: ActionTypes.FETCH_BRANCHES });
      const { owner, token } = state.ownerData;
      const { repoName } = state.repoData;
      try {
        if (!repoName) {
          throw Error("Repo is not defined");
        }

        const branches = await fetchBranches(owner, token, repoName);
        if (!branches.length) {
          dispatch({
            type: ActionTypes.SET_BRANCHES,
            error:
              "This repo appears to have no branches. Why don't you try another one?",
            branches,
            branch: null,
          });
        } else {
          const primaryBranch = branches.find(
            (b: Branch) => b.name === "master" || b.name === "main",
          );
          dispatch({
            type: ActionTypes.SET_BRANCHES,
            error: null,
            branches,
            branch: primaryBranch ?? null,
          });
        }
      } catch (e) {
        if (e instanceof Error) {
          dispatch({
            type: ActionTypes.SET_BRANCHES,
            error: `Can't fetch branches: ${e.message}.`,
            branches: [],
            branch: null,
          });
        } else {
          throw e;
        }
      }
    },
  };
}
