import { user } from "./model";

export const repository = {
  findByEmail: async (email: string) => await user.findOne({ email }),
  findById: async (id: string) => await user.findById(id),
  create: async <T>(payload: T) => await user.create(payload),
  update: async <T>(id: string, payload: Partial<T>) =>
    await user.findByIdAndUpdate(id, { $set: payload }, { new: true }),
  delete: async (id: string) => user.findByIdAndDelete(id),
};
