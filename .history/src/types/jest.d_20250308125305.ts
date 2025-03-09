declare namespace jest {
    function fn(): any
    const mock: any
}

declare function describe(name: string, fn: () => void): void
declare function it(name: string, fn: () => void): void
declare function expect(value: any): any
declare function beforeEach(fn: () => void): void
declare function afterEach(fn: () => void): void
declare function beforeAll(fn: () => void): void
declare function afterAll(fn: () => void): void 