import React, {useState} from 'react'
import EcommerceContext from './ecommerceContext'

function GlobalState({children}) {
    const [userLogin, setUserLogin] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const loginUser = (user) => {
        setUserLogin(true)
        setUserInfo(user)
    }
    const logoutUser = () => {
        setUserLogin(false)
    }

    return (
        <EcommerceContext.Provider
            value={{
                userLogin,
                loginUser,
                logoutUser,
                userInfo
            }}
            >
                {children}
        </EcommerceContext.Provider>
    )

}

export default GlobalState