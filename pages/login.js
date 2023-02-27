import React from 'react';
import { getProviders, signIn } from 'next-auth/react';
const Login = ({ providers }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black">
      {/* <img src="#" alt="" /> */}
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="p-5 text-white bg-green-500 rounded-lg"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
