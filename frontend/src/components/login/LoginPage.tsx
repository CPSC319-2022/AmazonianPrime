import './LoginPage.scss';
import { useLazyLoginQuery } from '../../redux/api/user';
import BuyerRegistration from './BuyerRegistration';
import { setUser } from '../../redux/reducers/userSlice';
import { useAppDispatch } from '../../redux/store';
import { useEffect } from 'react';

declare var google: any;

function LoginPage() {
  function handleGoogleSignIn(response: any) {
    triggerGetQuery(response.credential);
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: '564219752620-5lcsrf60frhamrotf69bceiktsiamjmh.apps.googleusercontent.com',
      callback: handleGoogleSignIn,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv')!, {
      theme: 'outline',
      size: 'large',
      type: 'standard',
      text: 'continue_with',
      width: '300',
    });
  }, []);

  const dispatch = useAppDispatch();
  const [triggerGetQuery, result, lastPromiseInfo] = useLazyLoginQuery();
  if (result.data) {
    dispatch(setUser(result.data));
  }

  return (
    <div className="login-page">
      <div className="login-page__contents">
        <div className="login-page__messages">
          <div className="login-page__welcome-message">
            <span>
              Welcome to
              <br /> Amazonian Prime
            </span>
          </div>
          <div className="login-page__mission-statement">
            <span>
              Our goal is to increase
              <br />
              <p>interaction</p> and
              <br />
              <p>collaboration</p> through
              <br />
              buying and selling items
              <br />
              within the Amazonian
              <br />
              community
            </span>
          </div>
        </div>
        <div className="login-page__login-prompts">
          <span>Sign in or Register</span>
          <div id="signInDiv" className="login-page__sign-in"></div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
