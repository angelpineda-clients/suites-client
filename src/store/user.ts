/* Libraries */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
/* interfaces */

interface user {
	id: string;
	name: string;
	email: string;
}

interface IUserStore {
	user: user;
	setUser: (data: user) => void;
}

export const useUserStore = create<IUserStore>()(
	devtools((set) => ({
		user: {
			id: "",
			name: "",
			email: "",
		},
		setUser: (data: user) => {
			const { id, email, name } = data;

			set({ user: { id, email, name } });
		},
	}))
);
