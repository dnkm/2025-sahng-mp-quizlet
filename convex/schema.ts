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
  decks: defineTable({
    ownerId: v.id("users"),
    title: v.string(),
    description: v.optional(v.string()),
    topicId: v.optional(v.id("topics")),
    subTopicId: v.optional(v.id("subTopics")),
    gradeLevel: v.optional(v.string()),
    visibility: v.union(
      v.literal("private"),
      v.literal("unlisted"),
      v.literal("public"),
    ),
    cardCount: v.optional(v.number()),
    updatedAt: v.number(),
  })
    .index("by_owner", ["ownerId"])
    .index("by_topic", ["topicId"])
    .index("by_subTopic", ["subTopicId"]),
  cards: defineTable({
    deckId: v.id("decks"),
    ownerId: v.id("users"), // denormalized for security checks
    question: v.string(),
    options: v.array(
      v.object({
        text: v.string(),
        isCorrect: v.boolean(),
      }),
    ),
    explanation: v.optional(v.string()),
    source: v.union(v.literal("manual"), v.literal("ai")),
    updatedAt: v.number(),
  }).index("by_deck", ["deckId"]),
});
