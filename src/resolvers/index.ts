import Resolver from '@forge/resolver';
import { requestJira, route, storage } from '@forge/api';

const resolver = new Resolver();

resolver.define("getIssues", async () => {
  try {
    const res = await requestJira(route`/rest/api/3/search?jql=ORDER BY created DESC`);

    if (!res.ok) {
      console.error("Error fetching issues:", await res.text());
      throw new Error(`Error fetching issues: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Unexpected error in getIssues:", error);
    throw new Error("Failed to fetch issues");
  }
});

resolver.define("getStorage", async ({ payload }) => {
  try {
    const { key } = payload;
    if (!key) {
      throw new Error("Key is required for getStorage.");
    }

    const storedValue = await storage.get(key);
    return storedValue || null;
  } catch (error) {
    console.error("Error in getStorage:", error);
    throw new Error("Failed to retrieve data from storage.");
  }
});


resolver.define("createIssue", async ({ payload }) => {
  const { data } = payload;
  console.log(data);
  const res = await requestJira(route`/rest/api/3/issue`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error("Error creating issue:", await res.text());
    throw new Error(`Error creating issue: ${res.statusText}`);
  }
  return await res.json();
});

resolver.define("updateIssue", async ({ payload }) => {
  const { issueId, data } = payload;
  const res = await requestJira(route`/rest/api/3/issue/${issueId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.status === 204) {
    console.log(`Issue ${issueId} updated successfully (No Content).`);
    return { success: true };
  }

  if (!res.ok) {
    console.error(`Error updating issue ${issueId}:`, await res.text());
    throw new Error(`Error updating issue ${issueId}`);
  }

  return await res.json();
});

resolver.define("deleteIssue", async ({ payload }) => {
  const { issueId } = payload;
  const res = await requestJira(route`/rest/api/3/issue/${issueId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    console.error(`Error deleting issue ${issueId}:`, await res.text());
    throw new Error(`Error deleting issue ${issueId}`);
  }
});

resolver.define("setStorage", async ({ payload }) => {
  try {
    const { key, value } = payload;
    if (!key) {
      throw new Error("Key is required for setStorage.");
    }

    await storage.set(key, value);
    return { success: true };
  } catch (error) {
    console.error("Error in setStorage:", error);
    throw new Error("Failed to store data.");
  }
});

export const handler = resolver.getDefinitions();