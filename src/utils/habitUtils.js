import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Calculates and updates user streak based on last active timestamp
 * @param {string} userId - Firebase user UID
 * @returns {Promise<object>} - Updated streak data
 */
export const updatePlayerStreak = async (userId) => {
    if (!userId) return null;

    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) return { streak: 0, lastActive: null };

    const data = userDoc.data();
    const lastActiveStr = data.lastActive; // ISO String
    const currentStreak = data.streak || 0;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    if (!lastActiveStr) {
        // First time tracking
        const newData = {
            streak: 1,
            lastActive: now.toISOString(),
            lastStreakUpdate: now.toISOString()
        };
        await setDoc(userRef, newData, { merge: true });
        return { ...newData, isNewMilestone: false };
    }

    const lastActiveDate = new Date(lastActiveStr);
    const lastActiveDay = new Date(lastActiveDate.getFullYear(), lastActiveDate.getMonth(), lastActiveDate.getDate()).getTime();

    const diffDays = (today - lastActiveDay) / (1000 * 60 * 60 * 24);

    let newStreak = currentStreak;
    let isNewMilestone = false;

    if (diffDays === 1) {
        // Consecutive day
        newStreak += 1;
        // Check for 10-day milestone
        if (newStreak % 10 === 0) {
            isNewMilestone = true;
        }
    } else if (diffDays > 1) {
        // Broke the streak
        newStreak = 1;
    } else if (diffDays === 0) {
        // Already active today, don't update streak
        return { streak: currentStreak, lastActive: lastActiveStr, isNewMilestone: false };
    }

    const updateData = {
        streak: newStreak,
        lastActive: now.toISOString()
    };

    await setDoc(userRef, updateData, { merge: true });

    return { ...updateData, isNewMilestone };
};
