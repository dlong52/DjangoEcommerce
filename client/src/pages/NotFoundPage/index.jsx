import React from 'react'

const NotFoundPage = () => {
  return (
    <div className="h-screen w-screen bg-white flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-md">
          <div className="text-5xl font-dark font-bold">404</div>
          <p
            className="text-2xl md:text-3xl font-light leading-normal"
          >Sorry we couldn't find this page. </p>
          <p className="mb-8">But dont worry, you can find plenty of other things on our homepage.</p>

          <a href='/' className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">Back to homepage</a>
        </div>
        <div className="max-w-lg">
          <img src="https://th.bing.com/th/id/R.a9a71e5e02399bfeadd186b99fe19f40?rik=AmxTPbHWPguXtg&pid=ImgRaw&r=0" alt="" />
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
