import { PanelBadgeType } from "../../view/PanelBadge";

type getBadgeTypeArgs = {
  error: string | null;
  isOk: boolean;
  loading: boolean;
};

export function getBadgeType({
  error,
  isOk,
  loading,
}: getBadgeTypeArgs): PanelBadgeType {
  if (error) {
    return "Error";
  } else if (loading) {
    return "Loading";
  } else if (isOk) {
    return "OK";
  } else {
    return "None";
  }
}
