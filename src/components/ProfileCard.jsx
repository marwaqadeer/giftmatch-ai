function ProfileCard({ profile }) {

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

            <button className="bg-orange-500 text-white rounded-xl px-4 py-2 mt-4">
                Get Gift Ideas 🎁
            </button>

        </div>
    );
}

export default ProfileCard;