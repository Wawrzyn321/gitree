import React from "react";
import { Actions, ActionTypes } from "../actions";
import { fetchRepoNames } from "../../api/api";
import { storeOwner, storeToken } from "../storage";
import { AppState, OwnerFormActions } from "../types";

export function useOwnerFormActions(
  state: AppState,
  dispatch: React.ActionDispatch<[action: Actions]>,
): OwnerFormActions {
  return {
    setOwnerFormCollapsed: (collapsed: boolean) => {
      dispatch({ type: ActionTypes.SET_OWNER_FORM_COLLAPSED, collapsed });
    },
    setOwner: (owner: string) => {
      dispatch({ type: ActionTypes.SET_OWNER, owner });
    },
    setToken: (token: string) => {
      dispatch({ type: ActionTypes.SET_TOKEN, token });
    },
    getRepos: async () => {
      dispatch({ type: ActionTypes.FETCH_REPOS });
      const { owner, token } = state.ownerData;
      try {
        const repoNames = await fetchRepoNames(owner, token);
        if (!repoNames.length) {
          dispatch({
            type: ActionTypes.SET_REPOS,
            error:
              "This user appears to have no repos. Why don't you try another one?",
            repoNames: repoNames,
          });
        } else {
          dispatch({
            type: ActionTypes.SET_REPOS,
            error: null,
            repoNames: repoNames,
          });
          storeOwner(owner);
          storeToken(token);
        }
      } catch (e) {
        if (e instanceof Error) {
          dispatch({
            type: ActionTypes.SET_REPOS,
            error: `Can't fetch repos: ${e.message}.`,
            repoNames: [],
          });
        } else {
          throw e;
        }
      }
    },
  };
}
