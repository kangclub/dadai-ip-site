import { del } from '@vercel/blob';

const AUTH_KEY = "kangclub"; // 和前端保持一致

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: '仅支持POST请求' });
  }

  try {
    const { url, auth } = req.body;

    // 权限校验
    if (auth !== AUTH_KEY) {
      return res.status(403).json({ success: false, message: '无权限操作' });
    }

    if (!url) {
      return res.status(400).json({ success: false, message: '缺少图片地址' });
    }

    // 从Blob存储中删除图片
    await del(url);

    res.status(200).json({ success: true, message: '删除成功' });
  } catch (error) {
    console.error('删除失败:', error);
    res.status(500).json({ success: false, message: '图片删除失败' });
  }
}