import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')

    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()

        if (usuario === 'gabriella' && senha === '1234') {
            localStorage.setItem('isAuthenticated', 'true')
            navigate('/game')
        } else {
            setErro('Usuário ou senha incorretos.')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] px-4">
            <div className="w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Login
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <div>
                        <label className="block mb-1">
                            Usuário
                        </label>

                        <input
                            type="text"
                            value={usuario}
                            onChange={(event) => setUsuario(event.target.value)}
                            className="w-full px-3 py-2 rounded border text-black"
                            placeholder="Digite seu usuário"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">
                            Senha
                        </label>

                        <input
                            type="password"
                            value={senha}
                            onChange={(event) => setSenha(event.target.value)}
                            className="w-full px-3 py-2 rounded border text-black"
                            placeholder="Digite sua senha"
                        />
                    </div>

                    {erro && (
                        <p className="text-red-500 text-center">
                            {erro}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full px-4 py-3 rounded-[8px] bg-[#991B1B] text-[#FEF2F2]"
                    >
                        Entrar
                    </button>

                </form>

            </div>
        </div>
    )
}

export default Login