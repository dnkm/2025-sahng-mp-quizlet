import { query } from "./_generated/server";

export const listTopics = query({
  args: {},
  async handler(ctx) {
    return await ctx.db.query("topics").collect();
  },
});

export const listPopularTopics = query({
  args: {},
  async handler(ctx) {
    return await ctx.db
      .query("topics")
      .filter((q) => q.eq(q.field("popular"), true))
      .collect();
  },
});
