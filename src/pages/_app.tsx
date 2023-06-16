import { config } from "@/config/config";
// import "./global.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import BackofficeProvider from "@/contexts/BackOfficeContext";
import OrderProvider from "@/contexts/OrderContext";

type CustomeAppProps = AppProps & { session: Session };

export default function App({
  Component,
  pageProps,
  session,
}: CustomeAppProps) {
  return (
    <SessionProvider session={session}>
      <BackofficeProvider>
        <OrderProvider>
          <Component {...pageProps} />
        </OrderProvider>
      </BackofficeProvider>
    </SessionProvider>
  );
}
