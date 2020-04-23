import axios from 'axios';

// urlの設定
const BASE_URL = 'https://holidays-jp.github.io/api/v1/';

// インスタンスの作成
const instance = axios.create({ baseURL: BASE_URL });

// 共通レスポンス処理
instance.interceptors.response.use(
  response => {
    if (response.status === 200) return response;
    return Promise.reject(new Error(`Response status ${response.status}`));
  },
  error => {
    throw error;
  },
);

export default instance;
