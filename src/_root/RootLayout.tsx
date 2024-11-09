import { useUserContext } from '@/context/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';
import Topbar from '@/components/shared/Topbar';
import LeftSidebar from '@/components/shared/LeftSidebar';
import Bottombar from '@/components/shared/Bottombar';

const RootLayout = () => {
    const { isAuthenticated, isLoading } = useUserContext();

    // Display a loading screen while auth status is being determined
    if (isLoading) return <div>Loading...</div>;

    // Redirect to sign-in page if user is not authenticated
    return isAuthenticated ? (
        <div className="w-full md:flex">
            <Topbar />
            <LeftSidebar />
            <section className="flex flex-1 h-full">
                <Outlet />
            </section>
            <Bottombar />
        </div>
    ) : (
        <Navigate to="/sign-in" />
    );
};

export default RootLayout;
