import { userType } from "../../types";
import { createRepository } from "../shared/repositoryFactory";
import { user } from "./model";

export const repository = createRepository(user);
