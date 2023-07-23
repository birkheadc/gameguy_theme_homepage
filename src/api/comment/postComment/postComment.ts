import { ApiResult, IApiResult } from "../../../types/apiResult";
import { Comment } from "../../../types/comment";

export default async function postComment(commentsServerUrl: string, comment: Comment): Promise<IApiResult> {
  const url = commentsServerUrl + '/api/comments';
  const formData = buildFormDataForComment(comment);

  const controller = new AbortController();
  const timeout = setTimeout(() => {controller.abort()}, 8000);
  try {
    const response = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      body: formData
    });
    if (response.status !== 200) return new ApiResult(response.status);
    return new ApiResult(200);
  } catch {
    return new ApiResult(409);
  } finally {
    clearTimeout(timeout);
  }
}

function buildFormDataForComment(comment: Comment): FormData {
  const formData = new FormData();

  formData.append('site', comment.site);
  formData.append('name', comment.name);
  formData.append('body', comment.body);

  return formData;
}