import Resolver from '@forge/resolver';
import api, { storage } from '@forge/api';

const resolver = new Resolver();

resolver.define('getQuestions', async () => {
  try {
    console.log("Fetching stored questions...");
    const questions = await storage.get('questions') || [];
    console.log("Stored questions:", questions);
    return questions;
  } catch (error) {
    console.error("Error retrieving stored questions:", error);
    throw new Error("Failed to fetch stored questions");
  }
});

resolver.define('saveQuestions', async ({ payload }) => {
  try {
    console.log("Saving questions:", payload);
    await storage.set('questions', payload);
    return { success: true };
  } catch (error) {
    console.error("Error saving questions:", error);
    throw new Error("Failed to save questions");
  }
});

export const handler = resolver.getDefinitions();
