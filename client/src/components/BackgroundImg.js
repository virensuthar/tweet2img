import React, { useContext, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import axios from "axios";
import { ImageContext } from "../contexts/ImageContext";

const BackgroundImg = () => {
	const [bgImg, setBgImg] = useContext(ImageContext);

	const [bgUrl, setBgUrl] = useState("");
	const [bgColor, setBgColor] = useState("");

	const clientId = process.env.REACT_APP_UNSPLASH_KEY;

	const [photo, setPhoto] = useState("");
	const [result, setResult] = useState([]);

	const handleChange = (e) => {
		setPhoto(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const url =
			"https://api.unsplash.com/search/photos?page=1&query=" +
			photo +
			"&client_id=" +
			clientId;

		axios.get(url).then((response) => {
			setResult(response.data.results);
		});
	};

	const getFilePath = (e) => {
		var file = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setBgImg({
				file: reader.result
			});
		};
		reader.onerror = function (error) {
			console.log("Error: ", error);
		};
	};

	return (
		<div>
			<Tabs className="tabs">
				<TabList className="tablist d-flex justify-content-between p-3 mb-0">
					<Tab className="tab">Upload files</Tab>
					<Tab className="tab">URL</Tab>
					<Tab className="tab">Color</Tab>
					<Tab className="tab">Search</Tab>
				</TabList>
				<hr className="m-0" />
				<TabPanel className="tabpanel">
					<input
						type="file"
						accept="image/*"
						className="form-control-sm m-3"
						onChange={getFilePath}
					/>
				</TabPanel>
				<TabPanel className="tabpanel px-3">
					<div className="input-group my-3 d-flex flex-cloumn">
						<input
							type="text"
							className="form-control w-75"
							placeholder="Image URL"
							value={bgUrl}
							onChange={(e) => setBgUrl(e.target.value)}
						/>
						<button
							className="btn btn-primary w-100 mt-3 mx-auto"
							onClick={() => setBgImg({ link: bgUrl })}
						>
							Submit
						</button>
					</div>
				</TabPanel>
				<TabPanel className="tabpanel">
					<div className="m-3">
						<label htmlFor="color" className="mb-0">
							Select color
						</label>
						<input
							type="color"
							className="ml-2"
							id="color"
							value={bgColor}
							onChange={(e) => {
								setBgColor(e.target.value);
								setBgImg({ color: bgColor });
							}}
						/>
					</div>
				</TabPanel>
				<TabPanel className="tabpanel ">
					<form className="d-flex m-3">
						<input
							className="form-control"
							type="search"
							placeholder="i.e. Dog"
							aria-label="Search"
							onChange={handleChange}
						/>
						<button
							className="btn btn-outline-primary ml-2"
							type="submit"
							onClick={handleSubmit}
						>
							Search
						</button>
					</form>
					<hr className="m-0" />
					<div className="search_section">
						{result.map((photo) => (
							<img
								key={photo.id}
								src={photo.urls.thumb}
								alt="unsplash images"
								className="search_img"
								onClick={() => setBgImg({ search: photo.urls.raw })}
							/>
						))}
					</div>
				</TabPanel>
			</Tabs>
		</div>
	);
};

export default BackgroundImg;
