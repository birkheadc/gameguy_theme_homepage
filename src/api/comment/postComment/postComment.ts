import { ApiResult, IApiResult } from "../../../types/apiResult";
import { Comment } from "../../../types/comment";

export default async function postComment(commentsServerUrl: string, comment: Comment): Promise<IApiResult> {
  const url = commentsServerUrl;

  const controller = new AbortController();
  const timeout = setTimeout(() => {controller.abort()}, 8000);
  try {
    const response = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) return new ApiResult(response.status);
    return new ApiResult(200);
  } catch {
    return new ApiResult(409);
  } finally {
    clearTimeout(timeout);
  }
}