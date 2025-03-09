declare namespace NodeJS {
    interface Process {
        env: any
    }

    interface Global {
        process: Process
    }
}

declare var process: NodeJS.Process
declare var global: NodeJS.Global 