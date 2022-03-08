import { LRAuthProvider } from "loginradius-react";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Loginradius Next</title>
      </Head>
      <LRAuthProvider
        appName={process.env.NEXT_PUBLIC_LR_APP_NAME}
        apiKey={process.env.NEXT_PUBLIC_API_KEY}
        redirectUri={"http://localhost:3000/"}
      >
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </LRAuthProvider>
    </>
  );
}

export default MyApp;
