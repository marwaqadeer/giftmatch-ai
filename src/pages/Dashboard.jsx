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

    return (

        <div className="min-h-screen bg-pink-50 p-8">

            <h1 className="text-4xl font-bold text-purple-700">
                🎁 GiftMatch AI
            </h1>

            <p className="mt-2 text-gray-600">
                Your personal AI gift recommendation assistant
            </p>

            <input
                type="text"
                placeholder="Search people..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 rounded-xl border bg-white mt-6"
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

                    filteredProfiles.map((profile) => (

                        <ProfileCard
                           key={profile.id}
                           profile={profile}
                           deleteProfile={deleteProfile}
                        />

                    ))
                )}

            </div>
        
        </div>

    );
}

export default Dashboard;