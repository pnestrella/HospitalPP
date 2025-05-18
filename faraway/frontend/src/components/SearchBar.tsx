import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons' // ✅ correct icon import
import { SearchBarProps } from '@/types'

const SearchBar: React.FC<SearchBarProps> = ({
    title,
    description,
    data // search data
}) => {
  return (
    <div className='flex justify-between items-center py-10 px-20 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] '>
        <div>
            <h1 className='font-semibold md:text-4xl lg:text-5xl text-[#005F92]'>{title}</h1>
            <p className='text-[#9E9E9E] md:text-xl lg:text-2xl'>{description}</p>
        </div>
        <div className="flex max-w-xl w-full items-center gap-2 bg-[#F0F0F0] px-3 py-2 rounded-3xl">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#181818]" />
            <input 
            className="w-full outline-none placeholder:text-[#AEAEAE] bg-[#F0F0F0]"
            placeholder={`Search ${data?.length ? data.length : ''}...`}
            />
      </div>
    </div>
  )
}

export default SearchBar
