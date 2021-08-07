import React from "react";
import Navbar from "./components/Navbar";
import TweetInput from "./components/TweetInput";
import Footer from "./components/Footer";
import ImageConfig from "./components/ImageConfig";
import ConfigContextProvider from "./contexts/ConfigContext";
import ImageContextProvider from "./contexts/ImageContext";

function App() {
	return (
		<div>
			<Navbar />
			<div className="grid-compo container-fluid">
				<ConfigContextProvider>
					<ImageContextProvider>
						<TweetInput />
						<ImageConfig />
					</ImageContextProvider>
				</ConfigContextProvider>
			</div>
			<Footer />
		</div>
	);
}

export default App;
