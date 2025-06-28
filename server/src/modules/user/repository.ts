import { userType } from "../../types";
import { interest } from "../interest/model";
import { createRepository } from "../shared/repositoryFactory";
import { user } from "./model";

const userRepository = {
  general: createRepository(user),
  incrementTokenVersion: async (id: string) => {
    return await user.findByIdAndUpdate(
      id,
      { $inc: { tokenVersion: 1 } },
      { new: true }
    );
  },

  myInterests: async (id: string) => {
    const interests = await interest.findOne({ user: id });

    return (
      interests || {
        user: id,
        interests: [],
      }
    );
  },
};

export { userRepository };
