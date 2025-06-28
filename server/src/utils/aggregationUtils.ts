import mongoose, { PipelineStage } from "mongoose";

function buildSuggestionPipeline(
  myId: string,
  myInterests: string[],
  limit = 5
): PipelineStage[] {
  return [
    {
      $match: {
        user: { $ne: new mongoose.Types.ObjectId(myId) },
      },
    },
    {
      $addFields: {
        commonInterests: { $setIntersection: ["$interests", myInterests] },
        totalUniqueInterests: { $setUnion: ["$interests", myInterests] },
      },
    },
    {
      $addFields: {
        matchPercentage: {
          $cond: [
            { $gt: [{ $size: "$totalUniqueInterests" }, 0] },
            {
              $multiply: [
                {
                  $divide: [
                    { $size: "$commonInterests" },
                    { $size: "$totalUniqueInterests" },
                  ],
                },
                100,
              ],
            },
            0,
          ],
        },
      },
    },

    {
      $match: {
        matchPercentage: { $gte: 50 },
      },
    },
    { $sort: { matchPercentage: -1 } },
    { $limit: limit },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    { $unwind: "$userInfo" },
    {
      $project: {
        _id: 0,
        userId: "$user",
        username: "$userInfo.username",
        email: "$userInfo.email",
        gender: "$userInfo.gender",
        mood: "$userInfo.mood",
        interests: 1,
        commonInterests: 1,
        matchPercentage: 1,
      },
    },
  ];
}
export { buildSuggestionPipeline };
