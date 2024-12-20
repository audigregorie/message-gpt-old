import { Button } from '@mui/material';
import FormInput from '../components/shared/FormInput';
import { IoIosLogIn } from 'react-icons/io';
import { useAuth } from '../utils/auth/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Logo from './shared/Logo';

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      toast.loading('Signing In', { id: 'login' });
      await auth?.login(email, password);
      toast.success('Signed In Successfully', { id: 'login' });
    } catch (error) {
      console.log(error);
      toast.error('Signing In Failed', { id: 'login' });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate('/chat');
    }
  }, [auth?.user, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-24">
      <div>
        <Logo hideText={false} />
      </div>

      <div className="mb-44">
        <form onSubmit={handleSubmit} className=" p-16 rounded-xl border-none shadow-[10px_10px_20px_#000] ">
          <div className="flex flex-col justify-center">
            <h4 className="text-center p-2 font-semibold">Login to your account</h4>
            <FormInput type="email" name="email" label="Email" />
            <FormInput type="password" name="password" label="Password" />
            <Button type="submit" className="!my-6 !py-3 !rounded-xl !bg-[#00fffc] hover:!bg-white hover:text-black" endIcon={<IoIosLogIn />}>
              LOGIN
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
