import { put } from '@vercel/blob';

const AUTH_KEY = "kangclub"; // 和前端保持一致

export const config = {
  api: {
    bodyParser: false, // 关闭默认body解析，支持文件上传
  },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: '仅支持POST请求' });
  }

  try {
    // 解析表单数据
    const form = await req.formData();
    const file = form.get('file');
    const name = form.get('name');
    const auth = form.get('auth');

    // 权限校验
    if (auth !== AUTH_KEY) {
      return res.status(403).json({ success: false, message: '无权限操作' });
    }

    // 参数校验
    if (!file || !name) {
      return res.status(400).json({ success: false, message: '缺少图片文件或名称' });
    }

    // 仅允许PNG图片
    if (file.type !== 'image/png') {
      return res.status(400).json({ success: false, message: '仅支持上传PNG格式图片' });
    }

    // 上传到Vercel Blob
    const blob = await put(`dadai-ip/${name}.png`, file, {
      access: 'public', // 公开访问，用于前端展示
      addRandomSuffix: false, // 不添加随机后缀，用自定义名称
    });

    res.status(200).json({ success: true, url: blob.url });
  } catch (error) {
    console.error('上传失败:', error);
    res.status(500).json({ success: false, message: '图片上传失败' });
  }
}