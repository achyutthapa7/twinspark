import { controller } from "../modules/user/controller";
import { routeType } from "../types";

export const userRoutes: routeType.IRoute[] = [
  {
    method: "post",
    path: "users/sign-up",
    controller: controller.signUp,
    authorization: false,
  },
  {
    method: "post",
    path: "users/verification",
    controller: controller.verification,
    authorization: false,
  },
  {
    method: "post",
    path: "users/login",
    controller: controller.login,
    authorization: false,
  },
  {
    method: "post",
    path: "users/refresh-token",
    controller: controller.refreshToken,
    authorization: false,
  },
  {
    method: "post",
    path: "users/logout",
    controller: controller.logout,
    authorization: true,
    authCheckType: ["user"],
  },
  {
    method: "get",
    path: "users/get-suggestions",
    controller: controller.getSuggesstions,
    authorization: true,
    authCheckType: ["user"],
  },
  {
    method: "post",
    path: "users/:receiverId/friend-request",
    controller: controller.sendRequest,
    authorization: true,
    authCheckType: ["user"],
  },
  {
    method: "post",
    path: "users/:senderId/:conversationId/friend-accept",
    controller: controller.acceptRequest,
    authorization: true,
    authCheckType: ["user"],
  },
  {
    method: "post",
    path: "users/:senderId/friend-reject",
    controller: controller.rejectRequest,
    authorization: true,
    authCheckType: ["user"],
  },
];
