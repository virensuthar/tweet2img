const express = require("express");
const router = express.Router();
const OAuth2 = require("oauth").OAuth2;
const https = require("https");

const apiKey = process.env.API_KEY;
const apiKeySecret = process.env.APIKEY_SECRET;

router.post("/tweets", (req, res) => {
	//getting id of a tweet from frontend
	const { tweetId } = req.body;

	//authorizing twitter api
	var oauth2 = new OAuth2(
		process.env.API_KEY,
		process.env.APIKEY_SECRET,
		"https://api.twitter.com/",
		null,
		"oauth2/token",
		null
	);

	//parameters
	const tweet_fields = "created_at";
	const expansions =
		"author_id,attachments.poll_ids,referenced_tweets.id,attachments.media_keys";
	const media_fields = "preview_image_url";
	const user_fields = "created_at,profile_image_url,verified";

	//fetching tweets data
	oauth2.getOAuthAccessToken(
		"",
		{
			grant_type: "client_credentials"
		},
		function (e, access_token) {
			var options = {
				method: "GET",
				hostname: "api.twitter.com",
				path: `/2/tweets/${tweetId}?tweet.fields=${tweet_fields}&expansions=${expansions}&media.fields=${media_fields}&user.fields=${user_fields}`,
				headers: {
					Authorization: "Bearer " + access_token
				}
			};

			https.get(options, function (result) {
				var buffer = "";
				result.setEncoding("utf8");
				result.on("data", function (data) {
					buffer += data;
				});
				result.on("end", function () {
					var tweets = JSON.parse(buffer);
					res.send(tweets); // the tweets!
				});
			});
		}
	);
});
module.exports = router;
