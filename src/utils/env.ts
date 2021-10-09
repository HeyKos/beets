interface Environment extends NodeJS.ProcessEnv {
    REACT_APP_SUPABASE_URL?: string;
    REACT_APP_SUPABASE_STORAGE_PUBLIC_URL?: string;
    REACT_APP_SUPABASE_ANON_KEY?: string;
}

const env: Environment = process.env;

export { env };
export type { Environment };