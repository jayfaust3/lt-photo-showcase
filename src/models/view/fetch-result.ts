export type FetchResult<TData> = 
    {
        data: TData
        status: 'loaded'
    } |
    {
        status: 'loading'
    } |
    {
        status: 'error'
        error: string
    }