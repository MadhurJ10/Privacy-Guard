import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import CardProvider from './context/CardProvider.jsx';



createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <UserProvider>
            <CardProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </CardProvider>
        </UserProvider>

    </Provider>

)
