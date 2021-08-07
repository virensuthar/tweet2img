import React, { useState } from "react";
import TweetImage from "./TweetImage";

const TweetInput = () => {
	const [url, setUrl] = useState("");
	const [tweetData, setTweetData] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const tweetUrl = new URL(url);
		var pathIds = tweetUrl.pathname.split("/");
		const tweetId = pathIds[3];

		fetch("/api/tweets", {
			method: "POST",
			body: JSON.stringify({ tweetId }),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		})
			.then((res) => res.json())
			.then((data) => {
				setTweetData([data]);
			})
			.catch((err) => console.log(err));

		setUrl("");
	};

	return (
		<div className="tweet_input">
			<form onSubmit={handleSubmit} className="my-5">
				<div className="input-group tweet-link-input">
					<input
						type="text"
						id="tweeturl"
						required
						value={url}
						className="form-control"
						placeholder="Paste a link of your tweet here"
						onChange={(e) => setUrl(e.target.value)}
					/>
					<button className="btn btn-outline-primary ml-2" type="submit">
						Create
					</button>
				</div>
			</form>
			<TweetImage tweets={tweetData} />
		</div>
	);
};

export default TweetInput;
