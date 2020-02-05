import React, {ReactElement} from 'react';

// style
import './style.scss';

export default function NoMatch(props: any): ReactElement {
  // variables
  const login = localStorage.getItem('login');
  const {history} = props;

  // use effects
  React.useEffect(() => {
    const redirect = login === 'false' || login === null ? '/' : '/dashboard';
    const time = setTimeout(() => {
      history.push(redirect);
    }, 6000);
    return () => {
      clearTimeout(time);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div id="nomatch">
      <div>
        <h1>Page not Found!</h1>
        <p>
          Redirecting to{' '}
          {login === 'false' || login === null ? 'Home' : 'Dashboard'} in 5
          seconds...
        </p>
      </div>
    </div>
  );
}
