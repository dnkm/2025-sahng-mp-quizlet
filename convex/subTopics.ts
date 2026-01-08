import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createSubTopic = mutation({
  args: {
    topicId: v.id("topics"),
    name: v.string(),
    gradeLevels: v.array(v.number()),
    numDecks: v.number(),
  },
  handler: async (ctx, { topicId, name, gradeLevels, numDecks }) => {
    return await ctx.db.insert("subTopics", {
      topicId,
      name,
      gradeLevels,
      numDecks,
    });
  },
});

export const listSubTopics = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db.query("subTopics").collect();
  },
});
