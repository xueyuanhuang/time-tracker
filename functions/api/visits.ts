type VisitEnv = {
  VISIT_COUNTER?: KVNamespace;
};

type VisitData = {
  count: number;
};

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}

type PagesFunctionContext = {
  env: VisitEnv;
};

const VISIT_KEY = "site-visits";

function json(data: VisitData, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

async function readCount(kv: KVNamespace) {
  const raw = await kv.get(VISIT_KEY);
  const count = raw ? Number.parseInt(raw, 10) : 0;
  return Number.isFinite(count) ? count : 0;
}

export async function onRequestGet({ env }: PagesFunctionContext) {
  if (!env.VISIT_COUNTER) {
    return json({ count: 0 }, 503);
  }

  return json({ count: await readCount(env.VISIT_COUNTER) });
}

export async function onRequestPost({ env }: PagesFunctionContext) {
  if (!env.VISIT_COUNTER) {
    return json({ count: 0 }, 503);
  }

  const nextCount = (await readCount(env.VISIT_COUNTER)) + 1;
  await env.VISIT_COUNTER.put(VISIT_KEY, String(nextCount));

  return json({ count: nextCount });
}
