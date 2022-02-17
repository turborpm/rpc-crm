import React from "react";
import { Provider } from "next-auth/providers";
import { GetServerSideProps } from "next";
import { getProviders, getSession, signIn } from "next-auth/react";

const SignInPage: React.FC<{ providers: Provider[] }> = ({ providers }) => {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
};

export default SignInPage;

export const getStaticProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });
  if (session && res && session.accessToken) {
    res.writeHead(302, { Location: "/" });
    res.end();
    return { props: { providers: [] } };
  }
  return {
    props: { providers: await getProviders() },
  };
};
