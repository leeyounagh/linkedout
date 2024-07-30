import { useEffect, ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const withoutAuth = <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P> => {
    const AuthComponent = (props: P) => {
      const router = useRouter();
  
      useEffect(() => {
        const token = Cookies.get('token') || sessionStorage.getItem('token');
        if (token) {
          router.push('/web/main');
        }
      }, [router]);
  
      return <WrappedComponent {...props} />;
    };
  
    return AuthComponent;
  };
  export { withoutAuth };  