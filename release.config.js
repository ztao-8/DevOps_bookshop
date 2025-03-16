module.exports = {
    branches: ["main"],
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/changelog",
        [
            "@semantic-release/npm",
            {
                "npmPublish": false,
                "pkgRoot": "frontend" // ✅ 先发布 frontend
            }
        ],
        [
            "@semantic-release/npm",
            {
                "npmPublish": false,
                "pkgRoot": "backend" // ✅ 再发布 backend
            }
        ],
        "@semantic-release/github"
    ]
};
