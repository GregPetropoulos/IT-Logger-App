import React from 'react'

const useDeviceInfo = () => {
    const width = typeof window !== 'undefined' && window.innerWidth
    const height = typeof window !== 'undefined' && window.innerHeight
    const isMobile = width <= 993
    const isDesktopOrLaptop = width >= 993
    return { isMobile, height, width, isDesktopOrLaptop }
}

export default useDeviceInfo