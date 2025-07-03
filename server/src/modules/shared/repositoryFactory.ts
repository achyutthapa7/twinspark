import { Model, Document } from "mongoose";

export const createRepository = <T extends Document>(model: Model<T>) => ({
  findById: async (id: string, populate: string) =>
    model.findById(id).populate(populate),
  findByEmail: async (email: string) => model.findOne({ email }),
  create: async (payload: Partial<T>) => model.create(payload),
  update: async (id: string, payload: Partial<T>) =>
    model.findByIdAndUpdate(id, { $set: payload }, { new: true }),
  delete: async (id: string) => model.findByIdAndDelete(id),
});
