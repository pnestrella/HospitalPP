import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

interface Image {
  url: string
  alt: string
}

interface ImageCarouselProps {
  images: Image[]
  autoPlayInterval?: number
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoPlayInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, autoPlayInterval)
    return () => clearInterval(interval)
  }, [currentIndex, autoPlayInterval])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  const getPrevIndex = () =>
    currentIndex === 0 ? images.length - 1 : currentIndex - 1

  const getNextIndex = () =>
    currentIndex === images.length - 1 ? 0 : currentIndex + 1

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8">
      {/* Image slides */}
      <div className="overflow-hidden relative">
        <div className="flex items-center justify-center">
          {/* Previous Image */}
          <div className="absolute left-0 z-10 transform -translate-x-1/2 scale-75 opacity-60 transition-all duration-500 ease-in-out rounded-2xl overflow-hidden shadow-lg">
            <img
              src={images[getPrevIndex()].url}
              alt={images[getPrevIndex()].alt}
              className="h-48 lg:h-100 md:h-64 w-auto object-cover"
            />
          </div>

          {/* Current Image */}
          <div className="relative z-20 transition-all duration-500 ease-in-out rounded-2xl overflow-hidden shadow-xl">
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              className="h-50 lg:h-90 md:h-60 w-auto object-cover"
            />
          </div>

          {/* Next Image */}
          <div className="absolute right-0 z-10 transform translate-x-1/2 scale-75 opacity-60 transition-all duration-500 ease-in-out rounded-2xl overflow-hidden shadow-lg">
            <img
              src={images[getNextIndex()].url}
              alt={images[getNextIndex()].alt}
              className="h-48 lg:h-100 md:h-64 w-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Bottom controls: Arrows + Dots */}
      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          onClick={handlePrev}
          className="bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon size={24} />
        </button>

        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-blue-500 w-4' : 'bg-gray-300 w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
          aria-label="Next slide"
        >
          <ChevronRightIcon size={24} />
        </button>
      </div>
    </div>
  )
}
