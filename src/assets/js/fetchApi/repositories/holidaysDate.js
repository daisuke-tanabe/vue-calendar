// 共通のaxiosインスタンス
import client from '../client/holidays';

// リソースの取得先
const resources = '/date.json';

export default {
  get: () => client.get(resources),
};
