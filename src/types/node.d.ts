declare namespace NodeJS {
    interface Process {
        env: any
    }

    interface Global {
        process: Process
    }
}

declare let process: NodeJS.Process
declare let global: NodeJS.Global 