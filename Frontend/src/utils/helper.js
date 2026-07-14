import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api.js";
import { login } from "../store/slice/authSlice.js";

export const checkAuth = async ({ context }) => {
    const { queryClient, store } = context;

    try {
        const user = await queryClient.ensureQueryData({
            queryKey: ["currentUser"],
            queryFn: getCurrentUser,
            retry: false,
        });

        if (!user) {
            throw redirect({ to: "/auth" });
        }

        store.dispatch(login(user));

        return true;
    } catch (err) {
        throw redirect({ to: "/auth" });
    }
};