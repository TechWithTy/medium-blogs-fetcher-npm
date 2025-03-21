import axios from "axios";
import * as cheerio from "cheerio";
import Parser from "rss-parser";

const parser = new Parser();

/**
 * Fetch Medium user profile details including avatar, bio, and profile URL.
 * @param {string} username - Medium username
 * @param {object} options - (Optional) Custom headers & proxy
 * @returns {Promise<object>} - User profile details
 */
export async function getMediumUserProfile(username, options = {}) {
  try {
    const profileUrl = `https://medium.com/@${username}`;

    const { data } = await axios.get(profileUrl, {
      headers: { "User-Agent": "Mozilla/5.0", ...options.headers },
      proxy: options.proxy || false,
    });

    const $ = cheerio.load(data);
    const avatar =
      $('meta[property="og:image"]').attr("content") ||
      "https://cdn-images-1.medium.com/fit/c/64/64/default-avatar.png";
    const bio =
      $('meta[property="og:description"]').attr("content") ||
      "No bio available.";

    return { username, avatar, bio, profileUrl };
  } catch (error) {
    return {
      error: "User not found or request failed",
      details: error.message,
    };
  }
}

/**
 * Fetch the Medium user's avatar by scraping their profile page.
 * @param {string} username - Medium username
 * @param {object} options - (Optional) Custom headers & proxy
 * @returns {Promise<string>} - Avatar URL or default
 */
export async function getMediumAvatar(username, options = {}) {
  try {
    const profileUrl = `https://medium.com/@${username}`;

    const { data } = await axios.get(profileUrl, {
      headers: { "User-Agent": "Mozilla/5.0", ...options.headers },
      proxy: options.proxy || false,
    });

    const $ = cheerio.load(data);
    return (
      $('meta[property="og:image"]').attr("content") ||
      "https://cdn-images-1.medium.com/fit/c/64/64/1*2Y7paYtPz5-Nj0zTLOzSwg.png"
    );
  } catch (error) {
    console.error(`Error fetching avatar: ${error.message}`);
    return "https://cdn-images-1.medium.com/fit/c/64/64/1*2Y7paYtPz5-Nj0zTLOzSwg.png";
  }
}

/**
 * Fetch Medium blogs for a given username.
 * @param {string} username - Medium username
 * @param {object} options - (Optional) Custom headers & proxy
 * @returns {Promise<object[]>} - List of blog posts
 */
export async function getMediumBlogs(username, options = {}) {
  try {
    const feedUrl = `https://medium.com/feed/@${username}`;

    const response = await axios.get(feedUrl, {
      headers: { "User-Agent": "Mozilla/5.0", ...options.headers },
      proxy: options.proxy || false,
    });

    const feed = await parser.parseString(response.data);
    // console.log(feed.items)
    return feed.items.map((post) => ({
      title: post.title,
      link: post.link,
      categories: post.categories || ["Uncategorized"],
      description: post.contentSnippet,
      content: post.content,
      published: post.pubDate,
    }));
  } catch (error) {
    return { error: "Failed to fetch Medium blogs", details: error.message };
  }
}
/**
 * Fetch top Medium users for a specific blog tag, sorted by followers.
 * @param {string} tag - Medium tag (e.g., "technology", "programming").
 * @param {number} limit - Number of top users to return.
 * @param {object} options - (Optional) Custom headers & proxy.
 * @returns {Promise<object[]>} - Sorted list of top users with profiles.
 */
export async function getTopUsersByTag(tag, limit, options = {}) {
  try {
    const tagUrl = `https://medium.com/tag/${tag}`;

    const { data } = await axios.get(tagUrl, {
      headers: { "User-Agent": "Mozilla/5.0", ...options.headers },
      proxy: options.proxy || false,
    });

    const $ = cheerio.load(data);
    const users = new Set();

    // Scrape author usernames from articles on the tag page
    $('a[href^="/@"]').each((_, element) => {
      let username = $(element).attr("href");

      if (username) {
        // Extract only the username (removes everything after `?`)
        username = username.split("?")[0].replace("/@", "");

        // Ensure username does not contain slashes (which indicate article URLs)
        if (!username.includes("/")) {
          users.add(username);
        }
      }
    });

    console.log(`✅ Found ${users.size} unique users for tag: ${tag}`);

    // Fetch user profiles
    const userProfiles = await Promise.all(
      [...users].map(async (username) => {
        const profile = await getMediumUserProfile(username, options);

        if (profile.error) {
          console.warn(`⚠️ Skipping user ${username} due to fetch error`);
          return null; // Skip failed users
        }

        return profile; // Profile already contains followers count
      })
    );

    // Sort users by followers in descending order
    const sortedUsers = userProfiles
      .filter((user) => user !== null) // Remove failed fetch attempts
      .sort((a, b) => b.followers - a.followers) // Sort by followers count
      .slice(0, limit); // Limit results

    return sortedUsers;
  } catch (error) {
    return [
      {
        error: "Failed to fetch top users for the tag",
        details: error.message,
      },
    ];
  }
}
