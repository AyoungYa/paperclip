import { describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import pg from 'pg';
import { drizzle } from '@paperclipai/db/node';
import { agents } from '@paperclipai/db';

describe('agent DB check', () => {
  it('should query agents table', async () => {
    const pool = new pg.Pool({ host: '127.0.0.1', port: 54329, user: 'paperclip', password: 'paperclip', database: 'paperclip' });
    const db = drizzle(pool);
    const agentId = '8b43e33d-ba27-426c-b3ce-d1f35682ad70';
    const rows = await db.select({ id: agents.id, name: agents.name, adapterType: agents.adapterType, status: agents.status, companyId: agents.companyId }).from(agents).where(eq(agents.id, agentId)).limit(1);
    console.log('Agent:', JSON.stringify(rows));
    await pool.end();
    expect(rows.length).toBeGreaterThan(0);
  });
});
