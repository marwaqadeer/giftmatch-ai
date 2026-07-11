function ProfileCard({
    profile,
    deleteProfile
}) {

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

            <button className="bg-orange-500 text-white rounded-xl px-4 py-2 mt-4">
                Get Gift Ideas 🎁
            </button>

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