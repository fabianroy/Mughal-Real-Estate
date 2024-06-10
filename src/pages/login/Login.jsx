import { useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from './../../hooks/useAuth';
import SocialLogin from '../../components/SocialLogin';

const Login = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || '/';

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "Login Success!",
                    text: "Boom! You have successfully logged in.",
                    icon: "success"
                });
                navigate(from, { replace: true });

            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    title: "Login Failed!",
                    text: "Oops! Something went wrong.",
                    icon: "error"
                });
            });
    }

    const [disabled, setDisabled] = useState(true);

    const handleValidateCaptcha = (e) => {
        const value = e.target.value;
        if (validateCaptcha(value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col md:flex-row">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className='my-4'>
                                <label className='label'>
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name='captcha' className='input input-bordered w-full' placeholder='Type the text above' />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" disabled={disabled} className="btn text-white bg-orange-500">Login</button>
                            </div>
                            <p className='mt-4'>New Here? Please <Link className='text-orange-500' to='/register'>create a new account</Link>.</p>
                            <SocialLogin></SocialLogin>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
