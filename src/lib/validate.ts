import { lucia } from "./auth";

export const validateSession = async (sessionId?: string) => {
    
    if (!sessionId) {
        return { session: null, user: null };
    }
    const { session, user } = await lucia.validateSession(sessionId);

    return { session, user };
}


export const isAllowed = async (sessionId?: string, role?: string) => {
    const { user } = await validateSession(sessionId);
    if (!user) {
        return false;
    }
    if (role && user.role !== role) {
        return false;
    }
    return true;
}