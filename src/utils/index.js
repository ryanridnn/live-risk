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

export const useDebounced = () => {
	let timeout = null;

	return (callback, time) => {
		clearTimeout(timeout);
		timeout = setTimeout(callback, time);
	};
};

export const generateRandomNumber = (min = 0, max = 100) => {
	return Math.random() * (max - min) + min;
};
