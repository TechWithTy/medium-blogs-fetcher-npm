import {
  getMediumUserProfile,
  getMediumBlogs,
  getMediumAvatar,
  getTopUsersByTag,
} from "./index.js";

(async () => {
  const tag = "technology"; // Change to any Medium tag you want to test
  const limit = 5; // Set the limit to the desired number of top users

  //   console.log("🔹 Fetching Medium profile & blogs without options...");

  //   // Fetch without options (default request)
    // const profileDefault = await getMediumUserProfile("startswithabang");
    // console.log("🔹 Default Profile:", profileDefault);

    const blogsDefault = await getMediumBlogs("codingoni");
    // console.log("🔹 Default Blogs:", blogsDefault);

  //   console.log("\n🔹 Fetching with custom headers & proxy...");
  const usersWithoutOptions = await getTopUsersByTag(tag, limit);
  console.log("🔹 Top Users (Limited):", usersWithoutOptions);

//   // Options with custom headers & proxy
  const options = {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Authorization: "Bearer YOUR_TOKEN_HERE", // Optional API key or token
    },
    proxy: {
      host: "123.45.67.89",
      port: 8080,
    }, // Example proxy settings (remove if not needed)
  };

  // const profileWithOptions = await getMediumUserProfile("codingoni", options);
  // console.log("🔹 Profile with Options:", profileWithOptions);

  // const blogsWithOptions = await getMediumBlogs("codingoni", options);
  // console.log("🔹 Blogs with Options:", blogsWithOptions);

  // const avatarWithOptions = await getMediumAvatar("codingoni", options);
  // console.log("🔹 Avatar with Options:", avatarWithOptions);
})();
