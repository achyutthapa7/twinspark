// import { userType } from "../../types";
// import { conversation } from "../conversation/model";
// import { interest } from "../interest/model";
// import { createRepository } from "../shared/repositoryFactory";

// const requestRepository = {
//   general: createRepository(user),

//   myInterests: async (id: string) => {
//     const interests = await interest.findOne({ user: id });
//     return (
//       interests || {
//         user: id,
//         interests: [],
//       }
//     );
//   },

//   conversation: createRepository(conversation),
// };

// export { userRepository };
