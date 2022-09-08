import ora from "ora";

export async function loading(message, fn, ...args) {
  const spinner = ora(message);
  spinner.start();
  try {
    let result = await fn(...args);
    spinner.succeed();
    return result;
  } catch (error) {
    spinner.fail('request fail, refetching');
    await sleep(1000);
    return loading(message, fn, ...args);
  }
}

export function sleep(n) {
  return new Promise((resolve, reject) => {
    resolve();
  }, n)
}