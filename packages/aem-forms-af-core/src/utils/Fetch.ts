/*
 *
 *  Copyright 2022 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *   of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software distributed under
 *   the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

/**
 * Defines utilities to make external web request
 */

declare let fetch: any;

export const request = (url: string, data: any = null, options: RequestOptions = {}) => {
    const opts = {...defaultRequestOptions, ...options};
    return fetch(url, {
        ...opts,
        body: data
    }).then((response: Response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        if (response?.headers.get('Content-Type')?.includes('application/json')) {
            return response.json();
        } else {
            return response.text();
        }
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
