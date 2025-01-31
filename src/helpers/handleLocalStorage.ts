const storage = window.localStorage;

export const handleLocalStorage = {
	setItem: (name: string, value: any) => {
		storage.setItem(name, JSON.stringify(value));
	},
	getItem: (name: string) => {
		const value = storage.getItem(name);

		if (value) {
			return JSON.parse(value);
		} else {
			return null;
		}
	},
	removeItem: (name: string) => {
		storage.removeItem(name);
	},
};
