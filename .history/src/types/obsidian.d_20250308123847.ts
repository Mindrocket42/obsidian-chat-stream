declare module 'obsidian' {
    export interface RequestUrlParam {
        url: string
        method?: string
        contentType?: string
        body?: string | ArrayBuffer
        headers?: Record<string, string>
    }

    export function request(params: RequestUrlParam): Promise<string>
} 