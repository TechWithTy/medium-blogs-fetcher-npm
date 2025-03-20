import axios from "axios";
import * as cheerio from "cheerio";
import Parser from "rss-parser";

const parser = new Parser();

/**
 * Fetch Medium user profile details including avatar, bio, and profile URL.
 * @param {string} username - Medium username
 * @returns {Promise<object>} - User profile details
 */
export async function getMediumUserProfile(username) {
  try {
    const profileUrl = `https://medium.com/@${username}`;
    const { data } = await axios.get(profileUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
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
    return { error: "User not found or request failed" };
  }
}

/**
 * Fetch Medium blogs for a given username.
 * @param {string} username - Medium username
 * @returns {Promise<object>} - List of blog posts
 */
export async function getMediumBlogs(username) {
  const feedUrl = `https://medium.com/feed/@${username}`;
  try {
    const feed = await parser.parseURL(feedUrl);
    return feed.items.map((post) => ({
      title: post.title,
      link: post.link,
      categories: post.categories || ["Uncategorized"],
      description: post.contentSnippet,
      content: post.content,
      published: post.pubDate,
    }));
  } catch (error) {
    return { error: "Failed to fetch Medium blogs" };
  }
}
