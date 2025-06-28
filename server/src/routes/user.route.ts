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
];
