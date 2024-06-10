import { useNavigate } from "react-router-dom";
import usePublicAxios from "../hooks/usePublicAxios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {

    const { signInWithGoogle } = useAuth();
    const axiosPubic = usePublicAxios();

    const navigate = useNavigate();

    const handleWithGoogle = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user.email,
                    name: result.user.displayName,
                    photoURL: result.user.photoURL,
                }
                axiosPubic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                        Swal.fire({
                            title: 'Success',
                            text: 'User login successfully',
                            icon: 'success'
                        });
                    })
            })
    }

    return (
        <div className="w-fit mx-auto">
            <h2 className="text-center mb-2 font-semibold text-lg">Or</h2>
            <button onClick={handleWithGoogle} className="btn">
                <FaGoogle />
                <span>Sign with Google</span>
            </button>
        </div>
    );
};

export default SocialLogin;