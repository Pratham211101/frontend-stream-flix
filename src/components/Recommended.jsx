import React from 'react'
import thumbnail1 from '../assets/thumbnail1.png'
import thumbnail2 from '../assets/thumbnail2.png'
import thumbnail3 from '../assets/thumbnail3.png'
import thumbnail4 from '../assets/thumbnail4.png'

const Recommended = () => {
    return (
      <div className=" mt-16 space-y-4">
        <div className="flex gap-3 items-start">
          <img src={thumbnail1} className="w-72 h-40 object-cover rounded-lg shadow-md" />
          <div className="flex flex-col">
            <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
              Best channel to help you
            </h4>
            <p className="text-xs text-gray-600">Channel 1</p>
            <p className="text-xs text-gray-600">199K views</p>
          </div>
        </div>
      </div>
    );
};
  

export default Recommended