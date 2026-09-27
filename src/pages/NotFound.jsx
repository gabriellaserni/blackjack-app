import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
            <div className="text-center">

                <h1 className="text-6xl font-bold mb-4">
                    404
                </h1>

                <p className="mb-6">
                    Página não encontrada.
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 rounded-lg bg-blue-600 text-white"
                >
                    Voltar para o início
                </button>

            </div>
        </div>
    )
}

export default NotFound