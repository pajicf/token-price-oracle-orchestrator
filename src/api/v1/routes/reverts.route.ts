import RevertsRouteDefinitions, { ERevertsRoute } from "../definitions/reverts.route";
import store from "../../../redux/store";
import { RevertEntity, revertEntityFromReduxState } from "../../../entities/revert.entity";
import { APIResponse } from "../../../utils/response.util";

class RevertsRoute {
  public static getRevertList: RevertsRouteDefinitions.RouteMethod<ERevertsRoute.GetRevertList> = async (request, response, next) => {
    try {
      const rootState = store.getState();
      const txHashes = Object.keys(rootState.prices.reverts);

      const revertList: RevertEntity[] = [];
      txHashes.forEach(txHash => {
        revertList.push(revertEntityFromReduxState(txHash, rootState));
      });

      return response.status(200).json(APIResponse.success(revertList));
    } catch (error) {
      next(error);
    }
  };
}

export default RevertsRoute;