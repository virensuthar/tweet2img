import React, { createContext, Component } from "react";

export const ConfigContext = createContext();

class ConfigContextProvider extends Component {
	state = {
		isLightTheme: true,
		light: { fill: "#1DA1F2", text: "#0F1419", bg: "#ffffff" },
		dark: { fill: "#D9D9D9", text: "#D9D9D9", bg: "#000000" }
	};

	tweetThemeToggle = () => {
		this.setState({ isLightTheme: !this.state.isLightTheme });
	};

	render() {
		return (
			<ConfigContext.Provider
				value={{
					...this.state,
					tweetThemeToggle: this.tweetThemeToggle
				}}
			>
				{this.props.children}
			</ConfigContext.Provider>
		);
	}
}

export default ConfigContextProvider;
