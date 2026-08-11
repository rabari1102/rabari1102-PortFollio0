import { Routes, Route } from 'react-router-dom'
import Portfolio from './pages/Portfolio'
import Critique from './pages/Critique'

export default function App() {
    return (
        <Routes>
            <Route path="/critique" element={<Critique />} />
            <Route path="*" element={<Portfolio />} />
        </Routes>
    )
}
