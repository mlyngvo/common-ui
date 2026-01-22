export async function sleep(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)); }

export async function mockFetch<T>(data: T, sleepDuration?: number): Promise<T> {
    await sleep(sleepDuration ?? 1500);
    return data;
}