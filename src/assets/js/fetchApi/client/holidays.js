import axios from 'axios';

// urlの設定
const BASE_URL = 'https://holidays-jp.github.io/api/v1/';

// インスタンスの作成
const instance = axios.create({ baseURL: BASE_URL });

// 共通レスポンス処理
instance.interceptors.response.use(
  response => response,
  error => {
    // エラーのレスポンスがあるなら書く、今回はアラート出すのみ
    alert(`${error}\n時間をおいて試してください`);
  },
);

export default instance;
