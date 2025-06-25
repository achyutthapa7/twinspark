import { controller } from "../modules/user/controller";
import { routeType } from "../types";

export const userRoutes: routeType.IRoute[] = [
  {
    method: "get",
    path: "users/get-user",
    controller: controller.signUp,
    authorization: true,
    authCheckType: ["user"],
  },
];
