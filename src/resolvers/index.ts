import Resolver from '@forge/resolver';
import { storage } from '@forge/api';

const resolver = new Resolver();

resolver.define('getQuestions', async () => {
  try {
    let questions = await storage.get('questions');

    if (!Array.isArray(questions)) {
      console.warn("Unexpected data format in storage, resetting to empty array.");
      questions = [];
    }

    return questions;
  } catch (error) {
    console.error("Error retrieving stored questions:", error);
    return [];
  }
});

resolver.define('saveQuestions', async ({ payload }) => {
  try {

    const topics = Array.isArray(payload.payload) ? payload.payload : payload;

    if (!Array.isArray(topics)) {
      console.error("Invalid payload type:", typeof topics);
      throw new Error("Invalid payload: Expected an array.");
    }

    await storage.set('questions', topics);
    return { success: true };
  } catch (error) {
    console.error("Error saving questions:", error);
    return { error: "Failed to save questions" };
  }
});


export const handler = resolver.getDefinitions();
