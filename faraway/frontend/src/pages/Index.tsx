import Button from '../components/Button'
import { ImageCarousel } from '../components/Carousel'

import IMG1 from '../assets/IMG1.jpg'
import IMG2 from '../assets/IMG2.jpg'
import IMG3 from '../assets/IMG3.jpg'
import IMG4 from '../assets/IMG4.jpg'
import IMG5 from '../assets/IMG5.jpg'

import LOGO from '../assets/Group 3.png'
import GOOGLE from '../assets/google.png'

const Index = () => {

  const images = [
    {
      url: IMG1,
      alt: 'IMG1',
    },
    {
      url: IMG2,
      alt: 'IMG2',
    },
    {
      url: IMG3,
      alt: 'IMG3',
    },
    {
      url: IMG4,
      alt: 'IMG4',
    },
    {
      url: IMG5,
      alt: 'IMG5',
    },
  ];

  return (
    <div className="flex-row md:flex w-full min-h-screen">
      <div className="flex flex-col w-[65%] justify-center items-center">
        <div className='flex w-full justify-center items-center'>
          <img 
            src={LOGO} 
            alt='logo' 
            className='w-50 md:60'
            />
        </div>
        <ImageCarousel 
        images={images}
        />
        <div className='w-[50%]'>
          <h3 className='flex text-sm lg:text-xl xl:text-2xl text-center'>Stay Informed, Stay Connected, And Stay In Control Of Your Healthcare Experience. Our Patient Portal Brings Convenience, Clarity, And Care Together In One Place.</h3>
        </div>
      </div>
      <div className='flex p-10 md:flex-col md:w-[35%] bg-[#005F92] justify-center items-center'>
        <div className='flex flex-col gap-5'>
          <h1 className='text-white font-bold text-3xl'>Sign In</h1>
          <Button 
          text={'Sign in with Google'} 
          icon={GOOGLE} 
          onClick={() => window.location.href='https://hppbackend.onrender.com/login/google'}
          className='bg-white cursor-pointer p-3 rounded-2xl' 
          /> 
        </div>
      </div>
    </div>
  )
}

export default Index
