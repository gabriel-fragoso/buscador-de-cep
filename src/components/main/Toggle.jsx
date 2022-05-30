import { useState } from "react"
import { FiSearch } from 'react-icons/fi'
import { toast, ToastContainer } from 'react-toastify';
import api from '../../services/api'

import 'react-toastify/dist/ReactToastify.min.css'

export default function Toggle() {

  const [darkMode, setDarkMode] = useState(false)

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {

    if (input === '') {
      toast.error('Preencha algum cep', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
      toast.success(`Seu cep foi encontrado: ${input}`)
    }
    catch {
      toast.error(`Erro ao encontrar CEP: ${input}`)
      setInput('')
    }

  }

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <div className="container">
        <span className="mode" style={{ color: darkMode ? 'gray' : 'yellow' }}>☀︎</span>
        <div className="switch-checkbox">
          <label className="switch">
            <input className="check-btn" type="checkbox"
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <span className="mode" style={{ color: darkMode ? '#c96dfd' : 'gray' }}>☽</span>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover

        />

      </div>

      <div className={darkMode ? 'dark' : 'light'}>
        <div className="containerCep">

          <h1 className="title">Buscador de CEP</h1>

          <div className="containerInput">
            <input type="text"
              placeholder="Digite seu Cep..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button className="btnSearch" onClick={handleSearch}>
              <FiSearch
                size={25}
                color="FFF"
              />

            </button>
          </div>
          {Object.keys(cep).length > 0 && (
            <main className="main-cep">
              <h2>CEP: {cep.cep}</h2>
              <span>{cep.logradouro}</span>
              <span>Complemento: {cep.complemento}</span>
              <span>{cep.bairro}</span>
              <span>{cep.localidade} - {cep.uf}</span>
            </main>
          )}
        </div>
      </div>
    </div>
  )
}