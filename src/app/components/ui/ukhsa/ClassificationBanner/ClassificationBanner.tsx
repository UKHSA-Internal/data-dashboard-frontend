import React, { FC } from 'react'

interface ClassificationBannerProps {
  content: string
}
const ClassificationBanner: FC<ClassificationBannerProps> = ({ content }) => {
  return (
    <div className="bg-[#1D70B8]">
      <p className="mt-[4px] pl-2 font-sans text-[27px] font-bold uppercase text-white"> {content}</p>
    </div>
  )
}
export default ClassificationBanner
