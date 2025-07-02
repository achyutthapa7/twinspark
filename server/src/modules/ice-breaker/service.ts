import { iceBreaker } from "./model";
import { repository } from "./repository";

export const service = {
  create: async (answer: string, id: string, conversationId: string) => {
    const conversation = await repository.general.findById(conversationId);
    if (!conversation) throw new Error("Conversation not found");
    if (conversation.status !== "icebreaker") throw new Error("Invalid stage");
    const hasAlreadyAnswered = conversation.answers.find(
      (answer: { answerBy: string; answer: string }) => answer.answerBy === id
    );
    if (hasAlreadyAnswered) throw new Error("Already answer");
    await iceBreaker.create({
      conversationId,
      answer,
      answerdBy: id,
    });
    const totalAnswers = await iceBreaker.countDocuments({
      conversationId,
    });

    if (totalAnswers === 2) {
      conversation.status = "unlocked";
    }

    await conversation.save();
  },
};
 