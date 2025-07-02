import { routeType } from "../types";

export const conversationRoutes: routeType.IRoute[] = [
  {
    method: "post",
    path: "users/:id/conversation-request", // in frontend it will say send spark
    controller: () => {},
    authorization: true,
    authCheckType: ["user"],
  },
  {
    method: "post",
    path: "users/:id/conversation-accept", // spark back
    controller: () => {},
    authorization: true,
    authCheckType: ["user"],
  },
  {
    method: "post",
    path: "users/:id/conversation-reject", // spark reject
    controller: () => {},
    authorization: true,
    authCheckType: ["user"],
  },
];
