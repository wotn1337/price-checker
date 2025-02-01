declare namespace NodeJS {
  interface ProcessEnv {
    BOT_TOKEN: string;
    TIMING: string;
    DATABASE_CLIENT: string;
    DATABASE_HOST: string;
    DATABASE_PORT: string;
    DATABASE_NAME: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_SSL: string;
    PARSER_TIMING: string;
  }
}
