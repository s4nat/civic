import React from 'react'
import styles from '../constants/style'
import { arrowUp } from '../../../public'
import Image from 'next/image'
import Link from 'next/link'

const BookDemo = () => {
  return (
    <Link href='https://www.wtfisqf.com/' target="_blank">
      <div className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-[#7C0000] p-[2px] cursor-pointer`}>
        <div className={`${styles.flexCenter} flex-col bg-[#7c0000]/50 w-[100%] h-[100%] rounded-full`}>
          <div className={`${styles.flexStart} flex-row`}>
            <p className='font-playfair font-medium text-[18px] leading-[23px] mr-2'>
              <span className='text-[#D9D9D9]'>wtfisqf.com</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BookDemo;