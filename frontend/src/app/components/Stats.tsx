import React from 'react'
import { stats } from '../constants'
import styles from '../constants/style'

const Stats = () => {
  return (
    <section className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}>
      {stats.map((stat) => (
        <div key={stat.id} className={`flex-1 flex justify-start items-center flex-row m-3 rounded-md bg-[#fff4f4]`}>
          <h4 className='font-playfair font-bold xs:text-[40px] text-[35px] xs:leading-[53px] leading-[43px] text-[#7C0000] mx-10 my-10'>{stat.value}</h4>
          <p className='font-playfair font-semibold xs:text-[20px] text-[18px] xs:leading-[26px] leading-[21px] text-gradient uppercase ml-3'>{stat.title}</p>
        </div>
      ))}
    </section>
  )
}

export default Stats