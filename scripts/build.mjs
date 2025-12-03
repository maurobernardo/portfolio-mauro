#!/usr/bin/env node

// Script de build que executa o Vite via Node.js (ES Module)
// Isso resolve problemas de permissão no Vercel usando Node diretamente
// Carrega automaticamente o vite.config.ts

import { build } from 'vite';

try {
  // build() carrega automaticamente o vite.config.ts da raiz do projeto
  await build();
  console.log('✓ Build concluído com sucesso!');
  process.exit(0);
} catch (error) {
  console.error('✗ Erro no build:', error);
  process.exit(1);
}

