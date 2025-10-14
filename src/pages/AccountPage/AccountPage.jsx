// account page will have account details that are edittable from this page and
// wallet with ability to add funds
// re-useable components: 

import { useAuth } from "../state/AuthContext.jsx";

const AccountPage = () => {
    const { user } = useAuth();
    // need to limit access to userId = logged in user
    return (<h1>User Account Page</h1>)
}

export default AccountPage