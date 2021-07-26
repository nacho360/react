import React, {useState} from 'react'
import EcommerceContext from './ecommerceContext'

function GlobalState({children}) {
    const [userLogin, setUserLogin] = useState(false)
    const loginUser = () => {
        setUserLogin(true)
    }
    const logoutUser = () => {
        setUserLogin(false)
    }

    return (
        <EcommerceContext.Provider
            value={{
                userLogin,
                loginUser,
                logoutUser
            }}
            >
                {children}
        </EcommerceContext.Provider>
    )

}

export default GlobalState