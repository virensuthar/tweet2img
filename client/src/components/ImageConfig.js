import React, { useContext, useState } from "react";
import { ConfigContext } from "../contexts/ConfigContext";
import { ImageContext } from "../contexts/ImageContext";
import BackgroundImg from "./BackgroundImg";

function ImageConfig() {
	const { tweetThemeToggle } = useContext(ConfigContext);
	const [imgSetting, setImgSetting] = useContext(ImageContext);

	const [bgOpacity, setBgOpacity] = useState("");
	const [borderRadius, setBorderRadius] = useState("");

	const getBgOpacity = (e) => {
		setBgOpacity(e.target.value);
		setImgSetting({ bgOpacity: bgOpacity });
	};

	const getBorderRadius = (e) => {
		setBorderRadius(e.target.value);
		setImgSetting({ borderRadius: borderRadius });
	};

	return (
		<div className="config_bar my-4 border border-1 rounded-lg p-4">
			<div className="text-secondary text-center mt-2">
				<h2>Tweet2img</h2>
				<p className="mt-3">
					Create beautiful posts from your tweets easily.
				</p>
			</div>
			<div className="border rounded mt-4 shadow-sm">
				<p className="p-2 mb-0">Tweet Background</p>
				<hr className="m-0" />
				<div className="p-3">
					<button
						className="btn btn-sm btn-primary"
						onClick={tweetThemeToggle}
					>
						Toggle theme
					</button>
				</div>
			</div>
			<div className="border rounded mt-3 shadow-sm">
				<details className=" outline-none">
					<summary className="m-2">Background Image</summary>
					<hr className="mt-2 mb-0" />
					<div>
						<BackgroundImg />
					</div>
				</details>
			</div>
			<div className="border rounded mt-3 shadow-sm">
				<div className="p-3">
					<label htmlFor="opacity" className="form-label d-block">
						Opacity
					</label>
					<input
						type="range"
						className="form-range w-100"
						min="0"
						max="1"
						step="0.1"
						id="opacity"
						value={bgOpacity}
						onChange={getBgOpacity}
					/>
				</div>
				<hr className="m-0" />
				<div className="p-3">
					<label htmlFor="radius" className="form-label d-block">
						Border Radius
					</label>
					<input
						type="range"
						className="form-range w-100"
						min="0"
						max="15"
						step="1"
						id="radius"
						value={borderRadius}
						onChange={getBorderRadius}
					/>
				</div>
			</div>
		</div>
	);
}

export default ImageConfig;
