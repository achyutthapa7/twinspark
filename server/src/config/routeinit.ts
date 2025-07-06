import { Express, Request, Response, NextFunction } from "express";
import checkAuthentication from "../middlewares/checkAuthentication";
import { userRoutes } from "../routes/user.route";

import { routeType } from "../types";
import { interestRoute } from "../routes/interest.route";
import { conversationRoutes } from "../routes/conversation.route";
import { iceBreakerRoutes } from "../routes/icebreak.route";
import { messageRoutes } from "../routes/message.route";

const allRoutes: routeType.IRoute[] = [
  ...userRoutes,
  ...interestRoute,
  ...conversationRoutes,
  ...iceBreakerRoutes,
  ...messageRoutes,
];
const routeInit = (app: Express) => {
  allRoutes.forEach((route) => {
    const { method, path, controller, authorization, authCheckType } = route;
    const fullPath = `/api/${path}`;

    const middlewares: Array<
      (req: Request, res: Response, next: NextFunction) => void
    > = [];

    if (authorization && authCheckType?.length) {
      middlewares.push(checkAuthentication(authCheckType as any));
    }
    middlewares.push(controller);

    (app as any)[method](fullPath, ...middlewares);
  });
};

export default routeInit;
