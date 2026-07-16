import { useState } from "react";

function ProfileForm({ addProfile }) {

    const [name,setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [budget, setBudget] = useState("50");

    const handleSubmit = (e) => {

        e.preventDefault();

        const newProfile = {
            id: Date.now(),
            name,
            birthday,
            hobbies,
            budget,
        };

        addProfile(newProfile);

        setName("");
        setBirthday("");
        setHobbies("");
        setBudget("50");
    };

    return(

        <form 
           onSubmit={handleSubmit}
           className="bg-white rounded-2xl shadow-md p-6 mt-6"
        >

            <h2 className="text-xl font-bold text-purple-700">
                Create Profile
            </h2>

            <input 
               value={name}
               onChange={(e) => setName(e.target.value)}
               className="border rounded-lg p-3 w-full mt-4"
               placeholder="Person Name"
            />

            <input
               type="date"
               value={birthday}
               onChange={(e) => setBirthday(e.target.value)}
               className="border rounded-lg p-3 w-full mt-3"
            />

            <textarea
               value={hobbies}
               onChange={(e) => setHobbies(e.target.value)}
               className="border rounded-lg p-3 w-full mt-3"
               placeholder="Hobbies and interests"
               rows="4"
            />

            <select
               value={budget}
               onChange={(e) => setBudget(e.target.value)}
               className="border rounded-lg p-3 w-full mt-3"
            >

                <option value="25">
                    Under $25
                </option>

                <option value="50">
                    Under $50
                </option>

                <option value="100">
                    Under $100
                </option>

            </select>

            <button
               type="submit"
               className="bg-purple-600 text-white px-5 py-3 rounded-xl mt-4"
            >
                Save Profile 🎁
            </button>

        </form>
    );
}

export default ProfileForm;