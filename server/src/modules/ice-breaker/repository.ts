import { conversation } from "../conversation/model";
import { createRepository } from "../shared/repositoryFactory";
import { iceBreaker } from "./model";

export const repository = {
  general: createRepository(conversation),
  iceBreaker: createRepository(iceBreaker),
};
