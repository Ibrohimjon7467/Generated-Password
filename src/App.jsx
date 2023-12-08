import { useState } from 'react'
import { toast } from 'react-toastify';
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from './components/Characters'

function App() {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(10)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)

  const handleGeneratePassword = (e) => {

    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      toast.info('You must select atleast one option')
    }
    let characterList = ''

    if (includeLowercase) {
      characterList = characterList + lowerCaseLetters
    }

    if (includeUppercase) {
      characterList = characterList + upperCaseLetters
    }

    if (includeNumbers) {
      characterList = characterList + numbers
    }

    if (includeSymbols) {
      characterList = characterList + specialCharacters
    }

    setPassword(createPassword(characterList))
  }

  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const handleCopyPassword = (e) => {
    if (password === '') {
      toast.error('Nothing to copy')
    } else {
      copyToClipboard()
      toast.success('Copied')
    }
  }

  return (
    <>
      <div className='contain w-[500px]'>
        <h2 className='text-2xl text-[#817D92] font-bold -tracking-normal text-center mb-8 title'>Password Generator</h2>
        <div className='mb-6 flex justify-between h-[80px] bg-[#24232C] px-8 py-[19px]'>
          <h3 className='text-3xl pass'>{password}</h3>
          <button onClick={handleCopyPassword} className='copy__btn'>
            <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.909 0.659016L20.341 3.09098C20.763 3.51294 21 4.08523 21 4.68197V17.25C21 18.4926 19.9926 19.5 18.75 19.5H15V21.75C15 22.9926 13.9926 24 12.75 24H2.25C1.00734 24 0 22.9926 0 21.75V6.75C0 5.50734 1.00734 4.5 2.25 4.5H6V2.25C6 1.00734 7.00734 0 8.25 0H16.3181C16.9147 3.12036e-06 17.4871 0.237058 17.909 0.659016ZM2.53126 21.75H12.4687C12.5434 21.75 12.6149 21.7204 12.6677 21.6677C12.7204 21.6149 12.75 21.5434 12.75 21.4687V19.5H8.25C7.00734 19.5 6 18.4926 6 17.25V6.75H2.53126C2.45665 6.75 2.38512 6.77963 2.33238 6.83238C2.27963 6.88512 2.25 6.95665 2.25 7.03126V21.4687C2.25 21.5434 2.27963 21.6149 2.33238 21.6677C2.38512 21.7204 2.45665 21.75 2.53126 21.75ZM18.4687 17.25H8.53126C8.45665 17.25 8.38512 17.2204 8.33238 17.1677C8.27963 17.1149 8.25 17.0434 8.25 16.9687V2.53126C8.25 2.45665 8.27963 2.38512 8.33238 2.33238C8.38512 2.27963 8.45665 2.25 8.53126 2.25H13.5V6.375C13.5 6.99632 14.0036 7.5 14.625 7.5H18.75V16.9687C18.75 17.0434 18.7204 17.1149 18.6677 17.1677C18.6149 17.2204 18.5434 17.25 18.4687 17.25ZM15.75 5.25H18.75V4.7985C18.75 4.76156 18.7427 4.72499 18.7286 4.69086C18.7145 4.65673 18.6937 4.62572 18.6677 4.59961L16.4004 2.33236C16.3476 2.27963 16.2761 2.25 16.2014 2.25H15.75V5.25Z" fill="#A4FFAF" />
            </svg>
          </button>
        </div>

        <div className='bg-[#24232C] px-8 pt-6 pb-8 select-none'>
          <div className='flex flex-col mb-8'>
            <label className='flex items-center justify-between mb-4' htmlFor='password-strength'>
              <span className='text-lg font-bold length'>Character length</span>
              <span className='text-[32px] font-bold'>{passwordLength}</span>
            </label>
            <input defaultValue={passwordLength} onChange={(e) => setPasswordLength(e.target.value)}
              type='range' id='password-strength' name='password-strength' max='16' min='8'
            />
          </div>

          <div className='flex items-center gap-2'>
            <input className='cursor-pointer' checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)}
              type='checkbox' id='uppercase-letters' name='uppercase-letters'
            />
            <label className='text-lg cursor-pointer select' htmlFor='uppercase-letters'>Include Uppercase Letters</label>
          </div>

          <div className='flex items-center gap-2'>
            <input className='cursor-pointer' checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)}
              type='checkbox' id='lowercase-letters' name='lowercase-letters'
            />
            <label className='text-lg cursor-pointer select' htmlFor='lowercase-letters'>Include Lowercase Letters</label>
          </div>

          <div className='flex items-center gap-2'>
            <input className='cursor-pointer' checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)}
              type='checkbox' id='include-numbers' name='include-numbers'
            />
            <label className='text-lg cursor-pointer select' htmlFor='include-numbers'>Include Numbers</label>
          </div>

          <div className='flex items-center gap-2'>
            <input className='cursor-pointer' checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)}
              type='checkbox' id='include-symbols' name='include-symbols'
            />
            <label className='text-lg cursor-pointer select' htmlFor='include-symbols'>Include Symbols</label>
          </div>
          <button onClick={handleGeneratePassword} className='mt-6 flex items-center justify-center py-4 gap-x-5 bg-white text-black w-full'>
            <span className='text-lg font-bold uppercase btn'>Generate</span>
            <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.10547 12L11.1054 6.00002L5.10547 0L3.84045 1.26501L7.68094 5.10547L0 5.10547V6.8946L7.68094 6.8946L3.84045 10.735L5.10547 12Z" fill="#24232C" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default App