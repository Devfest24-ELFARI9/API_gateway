import { lucia } from "./auth.js";

export const validateSession = async (sessionId) => {
    if (!sessionId) {
        return { session: null, user: null };
    }
    const { session, user } = await lucia.validateSession(sessionId);

    return { session, user };
}

export const isAllowed = async (sessionId, role) => {
    const { user } = await validateSession(sessionId);
    if (!user) {
        return false;
    }
    if (role && user.role !== role) {
        return false;
    }
    return true;
}

