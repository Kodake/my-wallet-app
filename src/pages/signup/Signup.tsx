import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

// Styles
import styles from './Signup.module.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { signUp, error, isPending } = useSignup();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    signUp(email, password, displayName);
  }

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      <label>
        <span>Display Name:</span>
        <input
          type='text'
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>

      {!isPending && <button className='btn'>Signup</button>}
      {isPending && <button className='btn' disabled>loading</button>}
      {error && <p>{error}</p>}
    </form>
  )
}

export default Signup;