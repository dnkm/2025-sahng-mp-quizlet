import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  topics: defineTable({
    name: v.string(),
    emoji: v.string(),
    popular: v.optional(v.boolean()),
  }),
  subTopics: defineTable({
    topicId: v.id("topics"),
    name: v.string(),
    gradeLevels: v.array(v.number()),
    numDecks: v.number(),
  }),
});
