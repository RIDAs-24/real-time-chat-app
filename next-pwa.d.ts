declare module "next-pwa" {
  import { NextConfig } from "next";
  
  interface PWAOptions {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    [key: string]: any;
  }

  function withPWAInit(options: PWAOptions): (config: NextConfig) => NextConfig;
  export default withPWAInit;
}
