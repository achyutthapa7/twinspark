import { controller } from "../modules/conversation/controller";
import { routeType } from "../types";

export const conversationRoutes: routeType.IRoute[] = [
  {
    method: "post",
    path: "conversation/:id/conversation-request", // in frontend it will say send spark
    controller: controller.createRequest,
    authorization: true,
    authCheckType: ["user"],
  },
  {
    method: "post",
    path: "conversation/:id/conversation-accept", // spark back
    controller: controller.acceptRequest,
    authorization: true,
    authCheckType: ["user"],
  },
  {
    method: "post",
    path: "conversation/:id/conversation-reject", // spark reject
    controller: controller.rejectRequest,
    authorization: true,
    authCheckType: ["user"],
  },
];
