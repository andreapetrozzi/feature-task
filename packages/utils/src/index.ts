/**
 * Suspends execution for a specified duration.
 *
 * @param ms The number of milliseconds to wait before resuming execution.
 * @returns A promise that resolves after the specified duration.
 * @example
 * async function example() {
 *   console.log("Start waiting");
 *   await sleep(1000);
 *   console.log("End waiting");
 * }
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
