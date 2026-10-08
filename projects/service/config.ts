export const SERVICE_NAMES = ['george', 'john', 'paul', 'ringo'] as const;
export type ServiceName = (typeof SERVICE_NAMES)[number];

const name = process.env.SERVICE_NAME;

if (!name || !(SERVICE_NAMES as readonly string[]).includes(name)) {
  throw new Error(
    `Set SERVICE_NAME to one of: ${SERVICE_NAMES.join(', ')} (got "${name ?? ''}")`,
  );
}

export const SERVICE_NAME = name as ServiceName;
export const PORT = Number(process.env.PORT ?? 4000);
export const NATS_SERVER_URL = process.env.NATS_SERVER_URL ?? '0.0.0.0:4222';
