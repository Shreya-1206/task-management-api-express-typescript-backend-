import express from 'express';
import expressLoader from "./express"

export default async ({ expressApp }: { expressApp: express.Application }) => {
  console.log('📦 Loaders initialized');
  
  //Express loaded // - Express loader (middleware + routes)
  await expressLoader({ app: expressApp });
  
  
  // For now, nothing else
  // Later we will add:
  // - DB loader
  
};
