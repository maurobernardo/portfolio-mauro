#!/usr/bin/env node

// Script de build que executa o Vite via Node.js
// Isso resolve problemas de permissão no Vercel

const { build } = require('vite');
const react = require('@vitejs/plugin-react');

(async () => {
  try {
    await build({
      plugins: [react()],
    });
    console.log('✓ Build concluído com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Erro no build:', error);
    process.exit(1);
  }
})();

