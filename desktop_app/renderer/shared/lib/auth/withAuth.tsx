import { useEffect, ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P> => {
  const AuthComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const accessToken = Cookies.get('accessToken') || sessionStorage.getItem('accessToken');
      const refreshToken = Cookies.get('refreshToken') || sessionStorage.getItem('refreshToken');

      if (!accessToken || !refreshToken) {
        router.push('/web/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;