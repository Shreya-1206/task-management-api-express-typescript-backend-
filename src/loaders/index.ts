import express from 'express';

export default async ({ expressApp }: { expressApp: express.Application }) => {
  console.log('📦 Loaders initialized');

  // For now, nothing else
  // Later we will add:
  // - DB loader
  // - Express loader (middleware + routes)
};
