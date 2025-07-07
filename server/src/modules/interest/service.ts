import { userRepository } from "../user/repository";
import { interest } from "./model";

const service = {
  create: async (interests: string[], email: string) => {
    const { _id } = await userRepository.general.findByEmail(email);

    const existing = await interest.findOne({ user: _id });

    if (existing) {
      return { message: "Interest already exists", data: existing };
    }

    const created = await interest.create({ user: _id, interests });
    return { message: "Interest created", data: created };
  },
};

export { service };
