import React, { createContext, useState } from "react";

export const ImageContext = createContext();

const ImageContextProvider = (props) => {
	const [imgSetting, setImgSetting] = useState({
		bgOpacity: "1",
		borderRadius: "5"
	});

	const [bgImg, setBgImg] = useState({
		file: "",
		link: "",
		color: "",
		search: ""
	});

	return (
		<ImageContext.Provider
			value={[imgSetting, setImgSetting, bgImg, setBgImg]}
		>
			{props.children}
		</ImageContext.Provider>
	);
};

export default ImageContextProvider;
