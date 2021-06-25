import axios from 'axios';
import { h } from 'preact';
import { Link, route } from 'preact-router';
import useInput from '~hooks/useInput';


const Register = () => {

  const [ name, changeName ] = useInput('');
  const [ email, changeEmail ] = useInput('');

  const handleSubmit = (e: h.JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('/api/register/', { name, email }).then(res => {
      alert('회원 가입 완료!')
      route(`/login?email=${email}`);
    })
  }

  return (
    <form onSubmit={handleSubmit}>
			<Link style={{ padding: '4px 0', display: 'inline-block', marginRight: '4px' }} href='/'>Home</Link>
      <p>이름</p>
      <input required value={name} onChange={changeName} />
      <p>이메일</p>
      <input required value={email} onChange={changeEmail} type='email' />
      <button type='submit' children='Submit' />
    </form>
  )
}

export default Register;
