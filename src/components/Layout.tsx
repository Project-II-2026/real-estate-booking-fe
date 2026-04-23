import { Outlet } from "react-router";
import { Header } from "./Header.tsx";
import { Footer } from "./Footer.tsx";

const Layout = () => {
 

    return (
        <div data-bs-theme="dark" className="d-flex flex-column min-vh-100 bg-body text-body">
            <Header />
            <main className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
                <Outlet />
            </main>
            <Footer/>
            
        </div>
    );
};

export default Layout;