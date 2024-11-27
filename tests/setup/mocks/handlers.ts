import { rest } from 'msw';

export const handlers = [
  rest.post('/api/submission', (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ message: 'Submission successful' }))
  ),
];
