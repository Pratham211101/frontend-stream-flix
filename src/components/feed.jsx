import React from 'react'
import thumbnail1 from '../assets/thumbnail1.png'
import thumbnail2 from '../assets/thumbnail2.png'
import thumbnail3 from '../assets/thumbnail3.png'
import thumbnail4 from '../assets/thumbnail4.png'
import thumbnail5 from '../assets/thumbnail5.png'
import thumbnail6 from '../assets/thumbnail6.png'
import thumbnail7 from '../assets/thumbnail7.png'
import thumbnail8 from '../assets/thumbnail8.png'
import { Link } from 'react-router-dom'

const feed = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">

      <Link to={`video/20/4521`}>
        <div className='cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105'>
          <img src={thumbnail1} className='shadow-2xl rounded-sm'/>
          <h2 className='text-lg font-semibold line-clamp-2'>video1</h2>
          <h3 className="text-sm text-gray-600 dark:text-gray-400">channel1</h3>
          <p className="text-sm text-gray-500">15k views &bull; 2 days ago</p>
        </div>  
      </Link>

      <div className='cursor-pointer'>
        <img src={thumbnail2} className='shadow-2xl'/>
        <h2 className='text-lg font-semibold line-clamp-2'>video2</h2>
        <h3 className="text-sm text-gray-600 dark:text-gray-400">channel2</h3>
        <p className="text-sm text-gray-500">15k views &bull; 2 days ago</p>
      </div>

      <div className='cursor-pointer'>
        <img src={thumbnail3} className='shadow-2xl'/>
        <h2 className='text-lg font-semibold line-clamp-2'>video3</h2>
        <h3 className="text-sm text-gray-600 dark:text-gray-400">channel3</h3>
        <p className="text-sm text-gray-500">15k views &bull; 2 days ago</p>
      </div>

      <div className='cursor-pointer'>
        <img src={thumbnail4} className='shadow-2xl'/>
        <h2 className='text-lg font-semibold line-clamp-2'>video4</h2>
        <h3 className="text-sm text-gray-600 dark:text-gray-400">channel4</h3>
        <p className="text-sm text-gray-500">15k views &bull; 2 days ago</p>
      </div>

      <div className='cursor-pointer'>
        <img src={thumbnail5} className='shadow-2xl'/>
        <h2 className='text-lg font-semibold line-clamp-2'>video5</h2>
        <h3 className="text-sm text-gray-600 dark:text-gray-400">channel5</h3>
        <p className="text-sm text-gray-500">15k views &bull; 2 days ago</p>
      </div>

      <div className='cursor-pointer'>
        <img src={thumbnail6} className='shadow-2xl'/>
        <h2 className='text-lg font-semibold line-clamp-2'>video6</h2>
        <h3 className="text-sm text-gray-600 dark:text-gray-400">channel6</h3>
        <p className="text-sm text-gray-500">15k views &bull; 2 days ago</p>
      </div>

      <div className='cursor-pointer'>
        <img src={thumbnail7} className='shadow-2xl'/>
        <h2 className='text-lg font-semibold line-clamp-2'>video7</h2>
        <h3 className="text-sm text-gray-600 dark:text-gray-400">channel7</h3>
        <p className="text-sm text-gray-500">15k views &bull; 2 days ago</p>
      </div>

      <div className='cursor-pointer'>
        <img src={thumbnail8} className='shadow-2xl'/>
        <h2 className='text-lg font-semibold line-clamp-2'>video8</h2>
        <h3 className="text-sm text-gray-600 dark:text-gray-400">channel8</h3>
        <p className="text-sm text-gray-500">15k views &bull; 2 days ago</p>
      </div>
      
      <div className='cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105'>
        <img src={thumbnail1} className='shadow-2xl rounded-sm'/>
        <h2 className='text-lg font-semibold line-clamp-2'>video1</h2>
        <h3 className="text-sm text-gray-600 dark:text-gray-400">channel1</h3>
        <p className="text-sm text-gray-500">15k views &bull; 2 days ago</p>
      </div>

      <div className='cursor-pointer'>
        <img src={thumbnail2} className='shadow-2xl'/>
        <h2 className='text-lg font-semibold line-clamp-2'>video2</h2>
        <h3 className="text-sm text-gray-600 dark:text-gray-400">channel2</h3>
        <p className="text-sm text-gray-500">15k views &bull; 2 days ago</p>
      </div>

      <div className='cursor-pointer'>
        <img src={thumbnail3} className='shadow-2xl'/>
        <h2 className='text-lg font-semibold line-clamp-2'>video3</h2>
        <h3 className="text-sm text-gray-600 dark:text-gray-400">channel3</h3>
        <p className="text-sm text-gray-500">15k views &bull; 2 days ago</p>
      </div>

      <div className='cursor-pointer'>
        <img src={thumbnail4} className='shadow-2xl'/>
        <h2 className='text-lg font-semibold line-clamp-2'>video4</h2>
        <h3 className="text-sm text-gray-600 dark:text-gray-400">channel4</h3>
        <p className="text-sm text-gray-500">15k views &bull; 2 days ago</p>
      </div>

      <div className='cursor-pointer'>
        <img src={thumbnail5} className='shadow-2xl'/>
        <h2 className='text-lg font-semibold line-clamp-2'>video5</h2>
        <h3 className="text-sm text-gray-600 dark:text-gray-400">channel5</h3>
        <p className="text-sm text-gray-500">15k views &bull; 2 days ago</p>
      </div>

      <div className='cursor-pointer'>
        <img src={thumbnail6} className='shadow-2xl'/>
        <h2 className='text-lg font-semibold line-clamp-2'>video6</h2>
        <h3 className="text-sm text-gray-600 dark:text-gray-400">channel6</h3>
        <p className="text-sm text-gray-500">15k views &bull; 2 days ago</p>
      </div>

      <div className='cursor-pointer'>
        <img src={thumbnail7} className='shadow-2xl'/>
        <h2 className='text-lg font-semibold line-clamp-2'>video7</h2>
        <h3 className="text-sm text-gray-600 dark:text-gray-400">channel7</h3>
        <p className="text-sm text-gray-500">15k views &bull; 2 days ago</p>
      </div>

      <div className='cursor-pointer'>
        <img src={thumbnail8} className='shadow-2xl'/>
        <h2 className='text-lg font-semibold line-clamp-2'>video8</h2>
        <h3 className="text-sm text-gray-600 dark:text-gray-400">channel8</h3>
        <p className="text-sm text-gray-500">15k views &bull; 2 days ago</p>
      </div>
    </div>
  )
}

export default feed