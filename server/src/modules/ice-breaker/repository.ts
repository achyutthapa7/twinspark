import { conversation } from "../conversation/model";
import { createRepository } from "../shared/repositoryFactory";

export const repository = {
  general: createRepository(conversation),
};
