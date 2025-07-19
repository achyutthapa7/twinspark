import { controller } from "../modules/requests/controller";

export const requestRoutes = [
  {
    method: "post",
    path: "users/:receiverId/friend-request",
    controller: controller.sendRequest,
    authorization: true,
    authCheckType: ["user"],
  },
  //   {
  //     method: "post",
  //     path: "users/:senderId/:conversationId/friend-accept",
  //     controller: controller.acceptRequest,
  //     authorization: true,
  //     authCheckType: ["user"],
  //   },
  //   {
  //     method: "post",
  //     path: "users/:senderId/friend-reject",
  //     controller: controller.rejectRequest,
  //     authorization: true,
  //     authCheckType: ["user"],
  //   },
];
