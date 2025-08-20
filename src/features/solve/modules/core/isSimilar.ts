import OpenAI from "openai";

export class IsSimilar {
  private static client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  constructor(public str1: string, public str2: string) {}

  private static cosineSimilarity(vec1: number[], vec2: number[]) {
    const dot = vec1.reduce((sum, v, i) => sum + v * vec2[i], 0);
    const mag1 = Math.sqrt(vec1.reduce((sum, v) => sum + v * v, 0));
    const mag2 = Math.sqrt(vec2.reduce((sum, v) => sum + v * v, 0));
    return dot / (mag1 * mag2);
  }

  async isSimilar(): Promise<boolean> {
    try {
      if (this.str1 && this.str2) {
        const res = await IsSimilar.client.embeddings.create({
          model: "text-embedding-3-small",
          input: [this.str1 as string, this.str2],
        });

        const [vec1, vec2] = res.data.map((d) => d.embedding);

        const isSimilar = IsSimilar.cosineSimilarity(vec1, vec2);
        return isSimilar > 0.7 ? true : false;
      } else {
        return true;
      }
    } catch (error) {
      console.error("something went wrong: ", error);
      return true;
    }
  }
}
