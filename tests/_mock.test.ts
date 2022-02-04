import _axios from 'axios';
import { ChildProcess } from 'child_process';
import { mock } from '../utils/mock';

let _process: ChildProcess = null;
const PORT = 12999;
const axios = _axios.create({ baseURL: `http://localhost:${PORT}` });

describe('Integration Tests', () => {
   test('Diffrent response', async () => {
      _process = await mock([{ response: 'POC2 payload' }]);
      const res = await axios('/');
      expect(res.data).toBe('POC2 payload');
   });

   test('Diffrent port', async () => {
      _process = await mock([null], { port: 14968 });
      const res = await _axios('http://localhost:14968');
      expect(res.data).toBe('mock response from mockApp.js');
   });

   test('Diffrent url', async () => {
      _process = await mock([{ url: '/poc/dif_url' }]);
      const res = await axios('/poc/dif_url');
      expect(res.data).toBe('mock response from mockApp.js');
   });

   test('Diffrent method', async () => {
      _process = await mock([{ method: 'post' }]);
      const res = await axios.post('/');
      expect(res.data).toBe('mock response from mockApp.js');
   });

   afterEach(() => _process?.kill());
});
