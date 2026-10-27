import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">
                    Blackjack
                </h1>

                <p className="mb-6">
                    Bem-vindo ao jogo de Blackjack!
                </p>

                <button
                    onClick={() => navigate('/login')}
                    className="px-6 py-3 rounded-[8px] bg-[#991B1B] text-[#FEF2F2] hover:bg-[#F87171] transition-colors"
                >
                    Entrar
                </button>
            </div>
        </div>
    )
}

export default Home