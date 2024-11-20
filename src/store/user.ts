/* Libraries */
import { IUser } from "@/interfaces/models/IUser";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
/* interfaces */

interface IUserStore {
	user: IUser;
	setUser: (data: IUser) => void;
}

export const useUserStore = create<IUserStore>()(
	devtools((set) => ({
		user: {
			id: "",
			name: "",
			email: "",
		},
		setUser: (data: IUser) => {
			const { id, email, name } = data;

			set({ user: { id, email, name } });
		},
	}))
);
