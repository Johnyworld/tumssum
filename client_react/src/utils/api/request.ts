import axios, { AxiosResponse } from 'axios';
import { getErrorMessage } from './errors';
import logging from './logging';
import CustomLocalStorage from '../CustomLocalStorage';

export type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

const storage = new CustomLocalStorage();

/**
 * 전체 API 요청을 총괄하는 API Pipeline 입니다.
 * api.ts 파일에서만 이 함수에 접근할 수 있습니다.
 */
const request = async <T>(method: Method, url: string, payload: any) => {
  logging.req(method, url, payload);
  const userInfo = storage.getUserInfo() || undefined;
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
    console.log(err);
    const data = {
      ...err.response.data,
      message: getErrorMessage(err.response.data?.message),
    };
    logging.err(method, url, err.response.data);
    return data as AxiosResponse<T>;
  }
};

export default request;
