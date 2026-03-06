export const dynamic = 'force-dynamic'; // 强制不缓存

export default async function GET(request) {
  const data = {
    message: "接口通了",
    time: new Date().toISOString()
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // 关键：允许跨域
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
