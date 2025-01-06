import bg from '../assets/Img/bg.jpg'
import bg_mob from '../assets/Img/bg_mob.jpg'
function WelcomePage() {

  return (
    <>
    <div className='relative'>
    <div className='text-center  justify-center flex  '>
    <h1 className='absolute mt-20 sm:text-3xl 2xl text-orange-800  '>Welcome To Analyze System {}</h1>
    <img src={bg} className="h-auto w-full sm:block hidden " alt="" />
    <img src={bg_mob} className='sm:hidden  w-full h-auto ' alt="" />
    </div>
    </div>
    </>
  )
}

export default WelcomePage