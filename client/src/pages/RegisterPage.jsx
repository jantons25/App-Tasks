import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function RegisterPage(){
  const {register, handleSubmit, formState: {errors}} = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  useEffect(()=> {
    if(isAuthenticated) {
      navigate('/tasks');
    }
  },[isAuthenticated]);
  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  })
  return(
    <div className="flex h-[calc(100vh - 100px)] items-center justify-center">
      <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
        {
          registerErrors.map((error,i) => (
            <div className='bg-red-500 p-2 text-white' key={i}>
              {error}
            </div>
          ))
        }
        <form 
          onSubmit={onSubmit}>
          <h1 className='text-3xl font-bold my-2'>Register</h1>
          <input 
            type="text" 
            {...register('username', { required: true })} 
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='Username'
            />
          {
            errors.username && (
              <p className='text-red-500'>username is required</p>
          )}
          <input 
            type="email" 
            {...register('email', { required: true })} 
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='Email'
            />
          {
            errors.email && (
              <p className='text-red-500'>email is required</p>
          )}
          <input 
            type="password" 
            {...register('password', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='Password'
            />
          {
            errors.password && (
              <p className='text-red-500'>password is required</p>
          )}
          <button
            className='bg-sky-500 text-white px-4 py-2 rounded-md my-2' 
            type='submit'>
            Register
          </button>
        </form>
        <p className='flex gap-x-2 justify-between'>
          Already hace an account? <Link className='text-sky-500' to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;