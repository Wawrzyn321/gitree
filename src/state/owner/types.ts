import { Action, ActionTypes } from "../actions";

type SetOwnerFormCollapsedAction = Action<
  ActionTypes.SET_OWNER_FORM_COLLAPSED,
  {
    collapsed: boolean;
  }
>;

type SetOwnerAction = Action<
  ActionTypes.SET_OWNER,
  {
    owner: string;
  }
>;

type SetTokenAction = Action<
  ActionTypes.SET_TOKEN,
  {
    token: string;
  }
>;

type FetchReposAction = Action<ActionTypes.FETCH_REPOS>;

type SetReposAction = Action<
  ActionTypes.SET_REPOS,
  {
    error: string | null;
    repoNames: string[] | null;
  }
>;

export type OwnerFormActions =
  | SetOwnerFormCollapsedAction
  | SetOwnerAction
  | SetTokenAction
  | FetchReposAction
  | SetReposAction;
