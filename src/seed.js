import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const meditations = [
    { title: "Yoga Nidra", time: "20 Mins", durationMinutes: 20, colorClass: "img-galaxy-blue", categories: ["Popular", "Sleep", "Beginners"] },
    { title: "Transforming Emotions", time: "20 Mins", durationMinutes: 20, colorClass: "img-moon-curve", categories: ["Anxiety", "Popular"] },
    { title: "Panchakosha", time: "17 Mins", durationMinutes: 17, colorClass: "img-teal-spiral", categories: ["Advanced"] },
    { title: "Back to the Source", time: "7 Mins", durationMinutes: 7, colorClass: "img-burst-purple", categories: ["Beginners"] },
    { title: "Journey Within", time: "20 Mins", durationMinutes: 20, colorClass: "img-green-lotus", categories: ["Advanced", "Anxiety"] },
    { title: "Hari Om", time: "23 Mins", durationMinutes: 23, colorClass: "img-orange-om", categories: ["Popular", "Advanced"] },
    { title: "Sound to Silence", time: "21 Mins", durationMinutes: 21, colorClass: "img-light-purple-flower", categories: ["Sleep", "Beginners"] },
    { title: "De-Stress", time: "7 Mins", durationMinutes: 7, colorClass: "img-blue-landscape", categories: ["Anxiety", "Beginners"] },
    { title: "Blossom in Your Smile", time: "16 Mins", durationMinutes: 16, colorClass: "img-pink-flower", categories: ["Popular", "Beginners"] },
    { title: "Aura", time: "27 Mins", durationMinutes: 27, colorClass: "img-blue-aura", categories: ["Advanced", "Sleep"] },
    { title: "Gratitude", time: "15 Mins", durationMinutes: 15, colorClass: "img-pink-mandala", categories: ["Popular"] },
    { title: "Contentment", time: "20 Mins", durationMinutes: 20, colorClass: "img-sunset-orange", categories: ["Anxiety", "Advanced"] },
];

const chants = [
    { title: "DIVINE ARMOUR", subtitle: "Devi Kavacham", time: "15 Mins", durationMinutes: 15, colorClass: "bg-divine-blue", categories: ["Medium"] },
    { title: "The Most Powerful Chant", subtitle: "Rudram", time: "38 Mins", durationMinutes: 38, colorClass: "bg-rudram-purple", categories: ["Long", "Popular"] },
    { title: "Overall Wellbeing", subtitle: "Om Namah Shivaya", time: "13 Mins", durationMinutes: 13, colorClass: "bg-shiva-blue", categories: ["Medium", "Popular"] },
    { title: "SHARPEN INTELLECT", subtitle: "Om Namo Bhagavate Vasudevaya", time: "6 Mins", durationMinutes: 6, colorClass: "bg-krishna-green", categories: ["Short"] },
    { title: "Surrender & Guidance", subtitle: "Guru Paduka Stotram", time: "7 Mins", durationMinutes: 7, colorClass: "bg-guru-pink", categories: ["Short", "Popular"] },
    { title: "OVERALL WELLBEING", subtitle: "Om Namah Shivaya (Meditative)", time: "25 Mins", durationMinutes: 25, colorClass: "bg-meditative-purple", categories: ["Long"] },
    { title: "Miraculous Power", subtitle: "Hanuman Chalisa", time: "9 Mins", durationMinutes: 9, colorClass: "bg-hanuman-orange", categories: ["Short", "Popular"] },
    { title: "Sri Vishnu Sahasranamam", subtitle: "Positive Vibrations", time: "34 Mins", durationMinutes: 34, colorClass: "bg-vishnu-purple", categories: ["Long"] },
    { title: "Blessings of the Sun", subtitle: "Sri Aditya Hrudayam", time: "6 Mins", durationMinutes: 6, colorClass: "bg-sun-yellow", categories: ["Short"] },
];

export const seedDatabase = async () => {
    try {
        console.log("Checking existing data...");
        const medRefs = await getDocs(collection(db, "meditations"));
        if (!medRefs.empty) {
            console.log("Data already seeded.");
            return;
        }

        console.log("Seeding meditations...");
        for (const item of meditations) {
            await addDoc(collection(db, "meditations"), item);
        }

        console.log("Seeding chants...");
        for (const item of chants) {
            await addDoc(collection(db, "sacred_sounds"), item);
        }

        console.log("Seeding complete!");
    } catch (error) {
        console.error("Error seeding database: ", error);
    }
};
