const mongoose = require('mongoose');
const githubSchema = new mongoose.Schema({
    "username": { type: String, required: true },
    "id": { type: Number, required: true },
    "node_id": { type: String },
    "avatar_url": String,
    "gravatar_id": String,
    "url": { type: String, required: true },
    "html_url": String,
    "followers_url": String,
    "following_url": String,
    "gists_url": String,
    "starred_url": String,
    "subscriptions_url": String,
    "organizations_url": String,
    "repos_url": String,
    "events_url": String,
    "received_events_url": String,
    "type": String,
    "site_admin": Boolean,
    "name": String,
    "company": { type: String, default: null },
    "blog": String,
    "location": { type: String, default: null },
    "email": { type: String, default: null },
    "hireable": { type: String, default: null },
    "bio": { type: String, default: null },
    "twitter_username": { type: String, default: null },
    "public_repos": { type: Number },
    "public_gists": Number,
    "followers": Number,
    "following": Number,
    "created_at": { type: Date },
    "updated_at": { type: Date },
    "Friends": { type: mongoose.Schema.Types.ObjectId, ref: 'Friend' }
}, { versionKey: false })


const githubModel = mongoose.model("GithubUserData", githubSchema)

module.exports = githubModel