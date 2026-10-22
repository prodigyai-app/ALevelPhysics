import { createHandler } from './service.js';
Deno.serve(createHandler({env:(name: string)=>Deno.env.get(name)}));
