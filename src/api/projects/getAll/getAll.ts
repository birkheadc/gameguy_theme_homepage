import { ApiResult, IApiResult } from "../../../types/apiResult";
import { IProject } from "../../../types/project/project";

export default async function getAll(): Promise<IApiResult<IProject[]>> {
  const url = process.env.PROJECTS_URL + '/api/projects';

  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000);
  return new Promise((resolve, reject) => {
    fetch(url, {
      signal: controller.signal,
      method: 'GET'
    }).then(response => {
      const status = response.status;
      response.json().then(data => {
        resolve(new ApiResult<IProject[]>(status, data));
      }).catch(reason => {
        console.log(`Error: ${reason}`);
        return new ApiResult<IProject[]>(503, null);
      }).finally(() => {
        clearTimeout(timeout);
      });
    })
  });
}