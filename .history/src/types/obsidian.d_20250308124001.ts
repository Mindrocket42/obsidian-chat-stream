declare module 'obsidian' {
    export interface RequestUrlParam {
        url: string
        method?: string
        contentType?: string
        body?: string | ArrayBuffer
        headers?: Record<string, string>
    }

    export function request(params: RequestUrlParam): Promise<string>

    export class Plugin {
        app: App
        manifest: PluginManifest
        constructor(app: App, manifest: PluginManifest)
        loadData(): Promise<any>
        saveData(data: any): Promise<void>
        addSettingTab(settingTab: PluginSettingTab): void
        addCommand(command: any): void
    }

    export interface App {
        workspace: any
        vault: any
    }

    export interface PluginManifest {
        id: string
        name: string
        version: string
        minAppVersion: string
        description: string
        author: string
        authorUrl?: string
        isDesktopOnly?: boolean
    }

    export class ItemView {
        containerEl: HTMLElement
    }

    export class Notice {
        constructor(message: string, timeout?: number)
    }

    export class PluginSettingTab {
        app: App
        containerEl: HTMLElement
        constructor(app: App, plugin: Plugin)
        display(): void
    }

    export class Setting {
        constructor(containerEl: HTMLElement)
        setName(name: string): this
        setDesc(desc: string): this
        addText(callback: (component: any) => any): this
        addTextArea(callback: (component: any) => any): this
        addDropdown(callback: (component: any) => any): this
        addToggle(callback: (component: any) => any): this
    }

    export class TFile {
        path: string
        name: string
        extension: string
    }

    export function resolveSubpath(file: TFile, subpath: string): any
} 