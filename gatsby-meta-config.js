require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteTitle: `아카이브-로그`,
  author: `한종우`,
  greetings: `꾸준히 고민하고 해결해나가는 엔지니어 한종우입니다.`,
  siteDescription: `소프트웨어 엔지니어 한종우의 기술 블로그입니다.`,
  siteKeywords: `블로그, 기술 블로그, 아카이브-로그, 개발자`,
  defaultOgImage: `/default-og-image.png`,
  siteUrl: `https://thearchivelog.dev`,
  githubUrl: `https://github.com/jongwooo`,
  gaTrackingId: process.env.GA_TRACKING_ID,
  naverToken: process.env.NAVER_TOKEN,
  giscusConfig: {
    repo: `jongwooo/blog`,
    repoId: process.env.GISCUS_REPO_ID,
    category: "Comment",
    categoryId: process.env.GISCUS_CATEGORY_ID,
    mapping: "title",
    reactionsEnabled: "0",
    emitMetadata: "0",
    inputPosition: "top",
    lang: "en",
    loading: "lazy",
  },
};
