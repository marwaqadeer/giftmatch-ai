import { useEffect, useState } from "react";
import ProfileForm from "../components/ProfileForm";
import ProfileCard from "../components/ProfileCard";

function Dashboard() {

    const [profiles, setProfiles] = useState(() => {

           return JSON.parse(
            localStorage.getItem("profiles")
           ) || [];

    });

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {

        localStorage.setItem(
            "profiles",
            JSON.stringify(profiles)
        );

    }, [profiles]);

    const addProfile = (newProfile) => {

        setProfiles((prevProfiles) => [
            ...prevProfiles, 
            newProfile,
        ]);

    };

    const deleteProfile = (id) => {

        const updatedProfiles = profiles.filter(
            (profile) => profile.id !== id
        );

        setProfiles(updatedProfiles);

    };

    const filteredProfiles = profiles.filter(
        (profile) =>
            profile.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    const sortedProfiles = [...filteredProfiles].sort(
        (a, b) => {

            const today = new Date();

            const getNextBirthday = (dateString) => {

                const birthday = 
                   new Date(dateString);

                const nextBirthday =
                   new Date(
                    today.getFullYear(),
                    birthday.getMonth(),
                    birthday.getDate()
                   );

                if (nextBirthday < today) {

                    nextBirthday.setFullYear(
                        today.getFullYear() + 1
                    );
                }

                return nextBirthday;
            };

            return (
                getNextBirthday(a.birthday) -
                getNextBirthday(b.birthday)
            );
        }
    );

    return (

        <div className="min-h-screen bg-pink-50 p-6">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-5xl font-bold text-purple-700 text-center">
                    🎁 GiftMatch AI
                </h1>

                <p className="mt-3 text-gray-600 text-center">
                    Your personal AI gift recommendation assistant
                </p>

                <input
                    type="text"
                    placeholder="Search people..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-4 rounded-2xl border border-purple-200 bg-white mt-6 shadow-sm"
                />

                <div className="mt-8">

                    <ProfileForm addProfile={addProfile} />

                    {profiles.length === 0 ? (

                        <div className="bg-white mt-6 p-8 rounded-2xl shadow-md text-center">

                            <h2 className="text-2xl font-bold text-purple-700">
                                No Profiles Yet
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Add your first friend to get started! 🎁
                            </p>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                            {sortedProfiles.map((profile) => (

                                <ProfileCard
                                    key={profile.id}
                                    profile={profile}
                                    deleteProfile={deleteProfile}
                                /> 

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}

export default Dashboard;