import '@testing-library/jest-dom';
import { server } from './tests/setup/mocks/server';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
