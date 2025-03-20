import { getMediumUserProfile, getMediumBlogs } from "./index.js";

(async () => {
    const profile = await getMediumUserProfile("codingoni");
    console.log("🔹 Medium Profile:", profile);

    const blogs = await getMediumBlogs("codingoni");
    console.log("🔹 Medium Blogs:", blogs);
})();
