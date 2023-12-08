import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ToastContainer position='top-center' limit={3} autoClose={1500} />
    <App />
  </>
)