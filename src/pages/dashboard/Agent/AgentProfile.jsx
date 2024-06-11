import useAuth from "../../../hooks/useAuth";

const AgentProfile = () => {

    const { user } = useAuth();

    return (
        <div>

            <div className="w-full h-full mx-auto bg-orange-30 items-center justify-between gap-10 shadow-xl p-10 lg:p-20">
                <div>
                    <p className="text-xl">Hi, <span className="font-semibold">{user.displayName}</span>. Welcome to your agent profile.</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center mt-10 w-fit mx-auto lg:mx-0">
                    <div className="w-fit">
                        <img className="w-40 h-40 rounded-xl" src={user.photoURL} alt="" />
                    </div>
                    <div className="text-center lg:text-left">
                        <p className="font-semibold text-2xl mb-2">{user.displayName}</p>
                        <p className="font-semibold text-lg">{user.email}</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AgentProfile;