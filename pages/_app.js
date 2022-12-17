import '../styles/globals.css'
import React, { useEffect } from 'react'
const materialIconsCssUrl = 'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    fetchIconsCssFiles()
  },[])

  const fetchIconsCssFiles = () => {
    const head = document.getElementsByTagName('head')[0]
    const link = document.createElement('link')

    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = materialIconsCssUrl
    head.appendChild(link)
  }

  return <Component {...pageProps} />
}

export default MyApp
