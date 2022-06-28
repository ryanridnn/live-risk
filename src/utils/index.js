export const convertData = (message) => {
	return JSON.parse(message.data);
};

export const copy = (text) => {
	navigator.clipboard.writeText(text);
};

export const validateSubmit = (e, callback) => {
	if (
		e.code === "Enter" &&
		e.target.value !== "" &&
		!!Number(e.target.value)
	) {
		callback();
	}
};
