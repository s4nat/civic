import React from 'react'
import styles from '../constants/style'
import { arrowUp } from '../../../public'
import Image from 'next/image'
import Link from 'next/link'

const GetStarted = () => {
  return (
    <Link href='/api/auth/login'>
    <div className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-gradient-to-r from-green-500 to-blue-600 p-[2px] cursor-pointer`}>
      <div className={`${styles.flexCenter} flex-col bg-black hover:bg-gradient-to-r hover:bg-from-green-700 hover:bg-to-blue w-[100%] h-[100%] rounded-full`}>
        <div className={`${styles.flexStart} flex-row`}>
          <p className='font-playfair font-medium text-[18px] leading-[23px] mr-2'>
            <span className='text-gradient'>Get</span>
          </p>
          <Image
            src={arrowUp}
            alt='arrow'
            className='w-[23px] h-[23px] object-contain'
          />
        </div>
        <p className='font-playfair font-medium text-[18px] leading-[23px]'>
          <span className='text-gradient'>Started</span>
        </p>
      </div>
    </div>
    </Link>
  )
}

export default GetStarted