import React, { useContext } from "react";
import verified from "../assets/verified.svg";
import { ConfigContext } from "../contexts/ConfigContext";
import { ImageContext } from "../contexts/ImageContext";
import html2canvas from "html2canvas";

function TweetImage({ tweets }) {
	const { isLightTheme, light, dark } = useContext(ConfigContext);
	const theme = isLightTheme ? light : dark;

	const [imgSetting, setImgSetting] = useContext(ImageContext);

	const downloadPng = () => {
		const coverImage = document.getElementById("tweetpost-download");

		html2canvas(coverImage, {
			useCORS: true
		}).then(function (canvas) {
			const a = document.createElement("a");
			a.href = canvas.toDataURL("image/png");
			a.download = "tweet-image.png";
			a.click();
		});
	};

	const changeBackgroundProp = () => {
		if (theme.bg === "#ffffff") {
			return `rgba(255, 255,255, ${imgSetting.bgOpacity})`;
		} else {
			return `rgba(0, 0, 0, ${imgSetting.bgOpacity})`;
		}
	};

	const changeBackgroundImage = () => {
		if (imgSetting.file) {
			return `url(${imgSetting.file})`;
		} else if (imgSetting.link) {
			return `url(${imgSetting.link})`;
		} else if (imgSetting.color) {
			return `${imgSetting.color}`;
		} else if (imgSetting.search) {
			return `url(${imgSetting.search})`;
		} else {
			return `url("https://images.unsplash.com/photo-1616968733012-903f9d46faf8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80")`;
		}
	};

	return (
		<div className="tweet_image">
			<div
				className="main_post"
				style={{
					background: `${changeBackgroundImage()} no-repeat center/cover`
				}}
				id="tweetpost-download"
			>
				{tweets.map((tweet) => (
					<div
						className="tweet_post"
						key={tweet.data.id}
						style={{
							color: theme.text,
							borderRadius: `${imgSetting.borderRadius}px`,
							background: changeBackgroundProp()
						}}
					>
						<div className="profile">
							<img
								src={tweet.includes.users[0].profile_image_url}
								alt="Pofile pic"
							/>
							<div>
								<p className="name mb-0">
									{tweet.includes.users[0].name}
									<span>
										{tweet.includes.users[0].verified ? (
											<img
												className="verified"
												src={verified}
												alt="verified symbol"
												style={{ fill: theme.fill }}
											/>
										) : (
											""
										)}
									</span>
								</p>
								<p className="username mb-0 mt-1">
									@{tweet.includes.users[0].username}
								</p>
							</div>
						</div>
						<p className="tweet_text mb-0">{tweet.data.text}</p>
					</div>
				))}
			</div>
			<button className="btn btn-primary btn-md my-4" onClick={downloadPng}>
				Download
			</button>
		</div>
	);
}

export default TweetImage;
