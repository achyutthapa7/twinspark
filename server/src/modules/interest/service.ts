import { userRepository } from "../user/repository";
import { interest } from "./model";

const service = {
  create: async (interests: string[], email: string) => {
    const { _id } = await userRepository.general.findByEmail(email);

    return await interest.create({ user: _id, interests });
  },
};

export { service };
