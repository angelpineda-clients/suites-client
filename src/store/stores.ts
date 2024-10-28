/* Libraries */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
/* interfaces */

interface user {
	uuid: string;
	username: string;
	email: string;
}

interface IUserStore {
	user: user;
}

export const useUserStore = create<IUserStore>()(
	devtools((set) => ({
		user: {
			uuid: "",
			username: "",
			email: "",
		},
	}))
);
