import { useState } from "react";
import { generateGiftIdeas } from "../services/generateGiftIdeas";

function ProfileCard({
    profile,
    deleteProfile
}) {

    const [giftIdeas, setGiftIdeas] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const calculateDaysLeft = () => {

        const today = new Date();

        const birthday = new Date(profile.birthday);

        const nextBirthday = new Date(
            today.getFullYear(),
            birthday.getMonth(),
            birthday.getDate()
        );

        if (nextBirthday < today) {

            nextBirthday.setFullYear(
                today.getFullYear() + 1
            );
        }

        const difference = 
           nextBirthday - today;

        return Math.ceil(
            difference / 
            (1000 * 60 * 60 * 24)
        );
    };

    const handleGiftIdeas = async () => {

        setIsLoading(true);

        try {

            const ideas = await generateGiftIdeas(
                profile.hobbies
            );

            setGiftIdeas(ideas);

        } catch (error) {

            console.error(error);

            setGiftIdeas(
                "Failed to generate gift ideas."
            );

        }

        setIsLoading(false);
    };

    return(

        <div className="bg-white rounded-2xl shadow-md p-5 mt-6">

            <h3 className="text-xl font-bold">
                {profile.name}
            </h3>

            <p className="mt-2">
                🎂 Birthday: {profile.birthday}
            </p>

            <p>
                ❤️ Hobbies: {profile.hobbies}
            </p>

            <p className="mt-2 text-purple-700 font-semibold">
                ⏳ {calculateDaysLeft()} days until birthday
            </p>

            <button
                onClick={handleGiftIdeas}
                className="bg-orange-500 text-white rounded-xl px-4 py-2 mt-4"
            >
                Get Gift Ideas 🎁
            </button>

            {isLoading && (

                <p className="mt-3 text-purple-700">
                    Generating gift ideas...
                </p>

            )}

            {giftIdeas && (

                <div className="bg-purple-50 rounded-xl p-4 mt-4">

                    <h4 className="font-bold text-purple-700">
                        AI Gift Ideas
                    </h4>

                    <p className="whitespace-pre-line mt-2">
                        {giftIdeas}
                    </p>

                </div>
                
            )}

            <button
                onClick={() => deleteProfile(profile.id)}
                className="bg-red-500 text-white rounded-xl px-4 py-2 mt-3 ml-3"

            >
                Delete ❌
            </button>

        </div>
    );
}

export default ProfileCard;