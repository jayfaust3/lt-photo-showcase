export type FetchResult<TData> = 
    {
        data?: TData
        status: 'loading' | 'loaded' | 'error'
        error?: string
    }