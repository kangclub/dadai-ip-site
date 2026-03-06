import { list } from '@vercel/blob';

export default async function handler(req, res) {
  // 允许跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    // 列出Blob存储中的所有图片
    const { blobs } = await list({
      prefix: 'dadai-ip/', // 统一前缀，方便管理
    });

    // 格式化数据
    const images = blobs.map(blob => ({
      name: blob.pathname.replace('dadai-ip/', '').replace('.png', ''),
      url: blob.url,
      uploadTime: blob.uploadedAt
    })).sort((a, b) => new Date(b.uploadTime) - new Date(a.uploadTime));

    res.status(200).json({ success: true, images });
  } catch (error) {
    console.error('获取列表失败:', error);
    res.status(500).json({ success: false, message: '获取图片列表失败' });
  }
}