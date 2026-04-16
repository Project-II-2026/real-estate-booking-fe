import {useAuth} from "../hooks/useAuth.ts";

const Home = () => {
    const {user} = useAuth()
    return (
        <div>
            <p>Logged in user: {user?.username}</p>
            <p>Email: {user?.email}</p>
            <p>User id: {user?.id}</p>
        </div>
    );
};

export default Home;