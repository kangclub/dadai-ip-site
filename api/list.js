import { list } from '@vercel/blob';

export default async function handler(req, res) {
  // 必须加这一句，防止 Vercel 缓存
  res.setHeader('Cache-Control', 'no-store');
  
  try {
    const { blobs } = await list();
    // 直接返回原始数据，不做复杂处理
    return Response.json({ success: true, blobs });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
