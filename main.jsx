
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function App() {
  const [fileName, setFileName] = React.useState('')
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState('')

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setFileName(file.name)
    try {
      const text = await file.text()
      const parsed = parseSave(text)
      setData(parsed)
      setError('')
    } catch {
      setError('Invalid or unsupported save file.')
    }
  }

  const parseSave = (text) => {
    const shards = (text.match(/shard/gi) || []).length
    const fragments = (text.match(/fragment/gi) || []).length
    return { shards, fragments, size: text.length }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center'>
        <h1 className='text-xl font-bold mb-2'>Silksong Save Analyzer</h1>
        <p className='text-gray-500 text-sm mb-4'>Upload your user1.dat save file</p>
        <input type='file' accept='.dat,.sav' onChange={handleFileUpload} className='block w-full mb-4' />
        {fileName && <p className='text-gray-600 mb-2'>Loaded: {fileName}</p>}
        {error && <p className='text-red-500'>{error}</p>}
        {data && (
          <div className='bg-gray-50 p-4 rounded-xl'>
            <p><b>Shards:</b> {data.shards}</p>
            <p><b>Fragments:</b> {data.fragments}</p>
            <p><b>File Size:</b> {data.size.toLocaleString()} bytes</p>
          </div>
        )}
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
