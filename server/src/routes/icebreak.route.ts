import { controller } from "../modules/ice-breaker/controller";
import { routeType } from "../types";

export const iceBreakerRoutes: routeType.IRoute[] = [
  {
    method: "post",
    path: "icebreaker/:conversationId/break-ice", // in frontend it will say send spark
    controller: controller.create,
    authorization: true,
    authCheckType: ["user"],
  },
];
