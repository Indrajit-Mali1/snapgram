import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = () => {
  // const isAuthenticated = false;
    const { isAuthenticated, isLoading } = useUserContext();

  // Optionally, add a loading screen if auth state is being determined
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className='flex flex-1 justify-center items-center flex-col py-10'>
            <Outlet />
          </section>
          <img src="/assets/images/side-img.png" 
            alt='logo'
            className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
          />
        </>
      )}
    </>
  )
}

export default AuthLayout
