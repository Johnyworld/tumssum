import axios, { AxiosResponse } from 'axios';
import { store } from '~/store';
import { getErrorMessage } from './errors';
import logging from './logging';

export type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

/**
 * 전체 API 요청을 총괄하는 API Pipeline 입니다.
 * api.ts 파일에서만 이 함수에 접근할 수 있습니다.
 */
const request = async <T>(method: Method, url: string, payload: any) => {
  logging.req(method, url, payload);
  const userInfo = store.getState().user.userInfo || undefined;
  try {
    const res: AxiosResponse<T> = await axios({
      method,
      url,
      headers: userInfo && {
        Authorization: `Bearer ${userInfo.access}`,
      },
      [method === 'GET' ? 'params' : 'data']: { ...payload, user_id: userInfo?.id },
    });
    logging.res(method, url, res);
    return res;
  } catch (err: any) {
    const data = {
      ...err.response.data,
      message: getErrorMessage(err.response.data?.message),
    };
    logging.err(method, url, data);
    return data as AxiosResponse<T>;
  }
};

export default request;
