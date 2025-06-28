import { controller } from "../modules/interest/controller";
import { routeType } from "../types";

export const interestRoute: routeType.IRoute[] = [
  {
    path: "users/interest/create",
    method: "post",
    authorization: false,
    controller: controller.createInterest,
  },
];
