import { Branch } from "../../types/Branch";
import { Action, ActionTypes } from "../actions";

type SetRepoFormCollapsedAction = Action<
  ActionTypes.SET_REPO_FORM_COLLAPSED,
  {
    collapsed: boolean;
  }
>;

type SetRepoAction = Action<
  ActionTypes.SET_REPO,
  {
    repoName: string;
  }
>;

type FetchBranchesAction = Action<ActionTypes.FETCH_BRANCHES>;

type SetBranchesAction = Action<
  ActionTypes.SET_BRANCHES,
  {
    error: string | null;
    branches: Branch[];
    branch: Branch | null;
  }
>;

export type RepositoryFormActions =
  | SetRepoFormCollapsedAction
  | SetRepoAction
  | FetchBranchesAction
  | SetBranchesAction;
