const bodyParser = require('body-parser');
const express = require('express')
const fetch = require('node-fetch');
const router = express.Router()
const githubDatabase = require('../model/githubUserData')
const friendDatabase = require("../model/Friend")
router.use(bodyParser.json())

router.get('/user/alldata/', async (req, res) => {
    try {

        const data = await githubDatabase.find(req.query).populate('Friends').sort([[req.query.sortby]])

        res.status(200).json(data)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})
router.get('/user/friend/:username', async (req, res) => {
    try {

        const data = await friendDatabase.find(req.params)

        res.status(200).json(data)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

router.post('/user/add/:username', async (req, res) => {
    try {
        const result = await githubDatabase.find(req.params)
        if (result.length) {
            res.status(400).json({ message: "data is already available" })
        } else {

            const response = await fetch(`https://api.github.com/users/${req.params.username}`);
            const body = await response.json();

            const followers = await fetch(`https://api.github.com/users/${req.params.username}/followers`)
            const followersdata = await followers.json()
            const following = await fetch(`https://api.github.com/users/${req.params.username}/following`)
            const followingdata = await following.json()
            let map = {}
            let mutual = new Array()
            for (let i of followersdata) {
                map[i.login] = i
            }
            for (let i of followingdata) {
                if (map[i.login]) {
                    mutual.push(i)
                }
            }

            const frndData = await friendDatabase.create({
                "username": body.login,
                "friends": mutual
            })



            const data = await githubDatabase.create({
                "username": body.login,
                "id": body.id,
                "node_id": body.node_id,
                "avatar_url": body.avatar_url,
                "gravatar_id": body.gravatar_id,
                "url": body.url,
                "html_url": body.html_url,
                "followers_url": body.followers_url,
                "following_url": body.following_url,
                "gists_url": body.gists_url,
                "starred_url": body.starred_url,
                "subscriptions_url": body.subscriptions_url,
                "organizations_url": body.organizations_url,
                "repos_url": body.repos_url,
                "events_url": body.events_url,
                "received_events_url": body.received_events_url,
                "type": body.type,
                "site_admin": body.site_admin,
                "name": body.name,
                "company": body.company,
                "blog": body.blog,
                "location": body.location,
                "email": body.email,
                "hireable": body.hireable,
                "bio": body.bio,
                "twitter_username": body.twitter_username,
                "public_repos": body.public_repos,
                "public_gists": body.public_gists,
                "followers": body.followers,
                "following": body.following,
                "created_at": body.created_at,
                "updated_at": body.updated_at,
                "Friends": frndData._id
            })
            res.status(200).json({ message: "Success" })
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

router.patch('/user/update/:username', async (req, res) => {
    try {
        const data = await githubDatabase.updateOne(req.params, req.body)

        res.status(200).json({ message: "updated successfully" })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

router.delete('/user/delete/:username', async (req, res) => {
    try {
        const data = await githubDatabase.deleteOne(req.params)
        const frnddata = await friendDatabase.deleteOne(req.params)
        res.status(200).json({ message: "deleted successfully" })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

module.exports = router;