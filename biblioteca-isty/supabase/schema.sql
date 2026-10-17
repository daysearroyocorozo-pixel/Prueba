-- Biblioteca ISTY · Tablas en Supabase.
-- Ejecuta este script una sola vez en Supabase → SQL Editor → New query → Run.
-- Cada tabla guarda un registro por fila: id (texto), data (el registro completo en JSON)
-- y pos (orden de creación, para conservar el orden de carreras y libros).

do $$
declare t text;
begin
  foreach t in array array['carreras', 'libros', 'usuarios', 'prestamos', 'accesos', 'consultas'] loop
    execute format('create table if not exists public.%I (
      id text primary key,
      pos bigint not null default 0,
      data jsonb not null,
      updated_at timestamptz not null default now()
    )', t);
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "biblioteca_app" on public.%I', t);
    -- La aplicación maneja sus propios usuarios y contraseñas, así que la clave pública
    -- puede leer y escribir estas tablas (ver «Seguridad» en el README).
    execute format('create policy "biblioteca_app" on public.%I for all to anon, authenticated using (true) with check (true)', t);
    execute format('grant select, insert, update, delete on public.%I to anon, authenticated', t);
  end loop;
end $$;
