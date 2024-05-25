import React from 'react'

const Button = ({ styles }: { styles: string }) => {
    return (
        <button type='button' className={`py-4 px-6 bg-blue-gradient font-playfair font-medium text-[18px] text-primary outline-none ${styles} rounded-[10px]`}>
            Book Demo
        </button>
    )
}

export default Button