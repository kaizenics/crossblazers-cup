'use client'

import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function UnderConstruction() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 5) % 360)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Head>
        <title>Under Construction</title>
        <meta name="description" content="This page is currently under construction" />
      </Head>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 mx-auto text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="font-montserrat text-4xl font-bold mb-4 text-gray-800">Under Construction</h1>
          <p className="font-montserrat text-xl text-gray-600 mb-8">
            We are working hard to bring you something amazing. Please check back soon!
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/"
              className="font-montserrat bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Go Home
            </a>
          </div>
        </div>
      </div>
    </>
  )
}