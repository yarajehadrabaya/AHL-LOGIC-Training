import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'final'), // حدد مسار المجلد
  build: {
    outDir: path.resolve(__dirname, 'dist'), // يمكنك تغيير مسار الخرج إذا رغبت
  }
});
