import { controller } from "../modules/message/controller";
import { routeType } from "../types";

export const messageRoutes: routeType.IRoute[] = [
  {
    path: "message/:conversationId/create",
    method: "post",
    authorization: true,
    authCheckType: ["user"],
    controller: controller.create,
  },
  {
    path: "message/:messageId/:conversationId/remove",
    method: "post",
    authorization: true,
    authCheckType: ["user"],
    controller: controller.remove,
  },
];
