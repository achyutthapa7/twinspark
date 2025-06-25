import { controller } from "../modules/user/controller";
import { routeType } from "../types";

export const userRoutes: routeType.IRoute[] = [
  {
    method: "post",
    path: "users/sign-up",
    controller: controller.signUp,
    authorization: false,
  },
];
