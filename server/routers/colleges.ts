import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { createComparison, getAllColleges, getCollegeByName, getUserComparisons, upsertCollege } from "../db";
import { invokeLLM } from "../_core/llm";

export const collegesRouter = router({
  // Get all colleges
  getAll: publicProcedure.query(async () => {
    return await getAllColleges();
  }),

  // Get college by name
  getByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      return await getCollegeByName(input.name);
    }),

  // Fetch college data from web sources using LLM
  fetchCollegeData: publicProcedure
    .input(z.object({ collegeName: z.string() }))
    .mutation(async ({ input }) => {
      try {
        // Use LLM to fetch and normalize college data
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `You are a college data aggregator. Fetch and normalize information about colleges from web sources. 
              Return ONLY a JSON object with these fields: placements, location, facultyReview, fees, roi, industryValue, brandValue, collegeLife.
              Each field should contain accurate, factual information. If data is unavailable, return "Data not available".`,
            },
            {
              role: "user",
              content: `Fetch comprehensive data for ${input.collegeName} from college websites, Quora, Reddit, and Google reviews. 
              Return structured JSON with placements, location, facultyReview, fees, ROI, industryValue, brandValue, and collegeLife.`,
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "college_data",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  placements: { type: "string" },
                  location: { type: "string" },
                  facultyReview: { type: "string" },
                  fees: { type: "string" },
                  roi: { type: "string" },
                  industryValue: { type: "string" },
                  brandValue: { type: "string" },
                  collegeLife: { type: "string" },
                },
                required: [
                  "placements",
                  "location",
                  "facultyReview",
                  "fees",
                  "roi",
                  "industryValue",
                  "brandValue",
                  "collegeLife",
                ],
                additionalProperties: false,
              },
            },
          },
        });

        const content = response.choices[0]?.message.content;
        if (!content) throw new Error("No response from LLM");

        const collegeData = typeof content === "string" ? JSON.parse(content) : content;

        // Upsert college data into database
        const savedCollege = await upsertCollege({
          name: input.collegeName,
          ...collegeData,
        });

        return savedCollege;
      } catch (error) {
        console.error("Error fetching college data:", error);
        throw new Error("Failed to fetch college data");
      }
    }),

  // Generate comparison summary using LLM
  generateComparison: protectedProcedure
    .input(
      z.object({
        collegeIds: z.array(z.number()),
        collegeNames: z.array(z.string()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        // Fetch college data
        const colleges = await Promise.all(
          input.collegeNames.map((name) => getCollegeByName(name))
        );

        // Generate LLM comparison summary
        const collegeDataStr = colleges
          .map(
            (c) =>
              `${c?.name}: Placements: ${c?.placements}, Location: ${c?.location}, Faculty: ${c?.facultyReview}, Fees: ${c?.fees}, ROI: ${c?.roi}`
          )
          .join("\n");

        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `You are an expert college advisor. Analyze and compare colleges based on their data. 
              Provide a comprehensive, insightful comparison that helps students make informed decisions. 
              Focus on strengths, weaknesses, and unique advantages of each college.`,
            },
            {
              role: "user",
              content: `Compare these colleges and provide a detailed analysis:\n${collegeDataStr}`,
            },
          ],
        });

        const summary =
          typeof response.choices[0]?.message.content === "string"
            ? response.choices[0]?.message.content
            : JSON.stringify(response.choices[0]?.message.content);

        // Save comparison to database
        const comparison = await createComparison({
          userId: ctx.user.id,
          collegeIds: JSON.stringify(input.collegeIds),
          summary,
        });

        return {
          summary,
        };
      } catch (error) {
        console.error("Error generating comparison:", error);
        throw new Error("Failed to generate comparison");
      }
    }),

  // Get user's comparison history
  getUserHistory: protectedProcedure.query(async ({ ctx }) => {
    return await getUserComparisons(ctx.user.id);
  }),
});
