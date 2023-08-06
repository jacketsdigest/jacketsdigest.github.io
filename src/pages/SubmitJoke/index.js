import { useState } from "react";
import axios from "axios";

import "./index.css";

import { useRecoilState } from "recoil";

import { userData, userToken } from "../../utils/store";

const SubmitJoke = () => {
	const [category, setCategory] = useState(false);
	const [text, setText] = useState("");
	const [publishName, setPublishName] = useState(false);
	const [user, setUser] = useRecoilState(userData);
	const [token, setToken] = useRecoilState(userToken);

	const categories = ["THWg", "Department", "Miscellaneous"];

	const submitJoke = async () => {
		const curToken = localStorage.getItem("Authorization");

		const res = await axios.post(
			"/jokes/createJoke",
			{
				category,
				text,
				publishName,
			},
			{
				headers: {
					Authorization: curToken,
				},
			}
		);

		if (res.status === 200) {
			alert("Successfully submitted joke.");
			setCategory("");
			setText("");
			setPublishName(false);
		}
	};

	return (
		<div className="container">
			<h1>Submit a Joke</h1>
			<div className="joke-form">
				<select
					className="joke-category"
					placeholder="Enter your joke here"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				>
					<option value="" hidden selected>
						Category
					</option>
					{categories.map((category) => {
						return <option value={category}>{category}</option>;
					})}
				</select>
				<textarea
					className="joke-input"
					placeholder="Enter your joke here"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<div className="checkbox-container">
					<input
						type="checkbox"
						id="publishName"
						checked={publishName}
						onChange={(e) => setPublishName(e.target.checked)}
					/>
					<label htmlFor="publishName">
						Publish my name alongside this joke.
					</label>
				</div>
				<button className="submit-joke-button btn-navy" onClick={submitJoke}>
					Submit
				</button>
			</div>
		</div>
	);
};

export default SubmitJoke;
