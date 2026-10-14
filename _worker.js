export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const uuid = env.UUID || "d342d11e-d424-4583-b36e-524ab1f0afa4"; // உங்கள் UUID
    
    if (url.pathname === `/${uuid}`) {
      const vlessConfig = `vless://${uuid}@${url.host}:443?encryption=none&security=tls&sni=${url.host}&type=ws&path=%2F%3Fed%3D2048#Free-Reverse-VPN`;
      return new Response(vlessConfig, { status: 200 });
    }
    
    if (request.headers.get('Upgrade') === 'websocket') {
      return await handleWebSocket(request, env);
    }
    
    return new Response('Server is Running Successfully', { status: 200 });
  }
};

async function handleWebSocket(request, env) {
  const pair = new WebSocketPair();
  const [client, server] = Object.values(pair);
  server.accept();
  return new Response(null, { status: 101, webSocket: client });
}
