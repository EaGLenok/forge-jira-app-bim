import Resolver from '@forge/resolver';
import api from '@forge/api';

const resolver = new Resolver();

resolver.define('fetchExternalData', async () => {
  try {
    console.log("Making request to external API...");

    const response = await api.fetch('https://httpbin.org/get');

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      throw new Error(`Error fetching external data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    return data;
  } catch (error) {
    console.error("Error fetching external data:", error);
    throw new Error("Failed to fetch external data");
  }
});

export const handler = resolver.getDefinitions();
