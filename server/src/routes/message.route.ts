import { controller } from "../modules/message/controller";
import { routeType } from "../types";

export const messageRoutes: routeType.IRoute[] = [
  {
    path: "messages/:conversationId/create",
    method: "post",
    authorization: true,
    authCheckType: ["user"],
    controller: controller.create,
  },
  {
    path: "messages/:messageId/:conversationId/remove",
    method: "delete",
    authorization: true,
    authCheckType: ["user"],
    controller: controller.remove,
  },
];
