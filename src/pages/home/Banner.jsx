import banner from '../../assets/banner.svg';
const Banner = () => {
    return (
        <div className='w-fit mx-auto'>
            <img src={banner} alt="banner" className="w-full h-full object-cover bg-center md:rounded-xl mb-10 md:mb-20" />
        </div>
    );
};

export default Banner;