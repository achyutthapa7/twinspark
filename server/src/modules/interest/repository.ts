import { createRepository } from "../shared/repositoryFactory";
import { interest } from "./model";

const interestRepository = {
  general: createRepository(interest),
  
};
export {interestRepository}