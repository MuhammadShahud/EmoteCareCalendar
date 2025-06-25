import { useEffect, useState } from 'react'

const ThemeToggle = () => {
    const [dark, setDark] = useState(() =>
      window.matchMedia('(prefers-color-scheme: dark)').matches
    )
  
    useEffect(() => {
      document.documentElement.classList.toggle('dark', dark)
    }, [dark])
  
    return (
      <button
      className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition"
      onClick={() => setDark(!dark)}
    >
      {dark ? '☀️ Light' : '🌙 Dark'}
    </button>
    )
  }
export default ThemeToggle