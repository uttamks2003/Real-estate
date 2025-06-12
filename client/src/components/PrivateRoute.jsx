import {useSelector} from 'react-redux'
import {Outlet, Navigate} from 'react-router-dom'

export function PrivateRoute1() {
    const {currentUser} = useSelector((state) =>state.user)
    return currentUser ? <Outlet/> : <Navigate to='/sign-in'/>
}
export function PrivateRoute2() {
    const {currentUser} = useSelector((state) =>state.user)
    return currentUser ? <Navigate to='/profile' /> : <Outlet/>
}
