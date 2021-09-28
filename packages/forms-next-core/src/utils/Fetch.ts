declare var fetch: any;

export const request = (url: string, data: any = null, options: RequestOptions = {}) => {
    const opts = {...defaultRequestOptions, ...options};
    return fetch(url, {
        ...opts,
        body: data
    }).then((response: Response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
};

export type RequestOptions = {
    contentType?: string,
    method?: 'POST' | 'GET',
    headers?: any,
    mode?: string
};


const defaultRequestOptions: RequestOptions = {
    method: 'GET'
};
