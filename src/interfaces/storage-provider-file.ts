import { Bucket } from "interfaces/bucket";

interface StorageProviderFile {
    bucket_id: string;
    buckets: Bucket;
    created_at: string;
    id: string;
    last_accessed_at: string;
    metadata: {};
    name: string;
    owner: string;
    updated_at: string;
}

export type { StorageProviderFile };
