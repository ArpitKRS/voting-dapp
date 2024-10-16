// import {client} from './client'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import {ThirdwebProvider} from '@thirdweb-dev/react'
import {Sepolia} from '@thirdweb-dev/chains'
import App from "./App"
import { VotingContextProvider } from './context';
import './index.css'

const root=ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider clientId={"ebcabeafc4dbd3f23b920443cb14305f"} activeChain={Sepolia} supportedWallets={['injected', 'injected:metamask']}>
        <Router>
            <VotingContextProvider>
                <App/>
            </VotingContextProvider>
        </Router>
    </ThirdwebProvider>
)