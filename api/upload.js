import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const form = await req.formData();
    const file = form.get('file');
    
    if (!file) {
      return Response.json({ error: 'No file' }, { status: 400 });
    }

    // 直接上传，不做权限校验，先跑通逻辑
    const blob = await put(file.name, file, { access: 'public' });
    return Response.json({ success: true, url: blob.url });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
