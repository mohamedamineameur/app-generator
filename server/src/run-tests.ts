import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const testDir = path.join(__dirname,  'specs');

function hasTestOnly(dir: string): boolean {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (hasTestOnly(fullPath)) return true;
    } else if (
      entry.isFile() &&
      (entry.name.endsWith('.test.ts') || entry.name.endsWith('.test.tsx') || entry.name.endsWith('.test.js'))
    ) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      if (content.includes('test.only') || content.includes('it.only') || content.includes('describe.only')) {
        return true;
      }
    }
  }

  return false;
}

function getFilesWithOnly(dir: string): string[] {
  const result: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      result.push(...getFilesWithOnly(fullPath));
    } else if (
      entry.isFile() &&
      (entry.name.endsWith('.test.ts') || entry.name.endsWith('.test.tsx') || entry.name.endsWith('.test.js'))
    ) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      if (content.includes('test.only') || content.includes('it.only') || content.includes('describe.only')) {
        result.push(fullPath);
      }
    }
  }

  return result;
}

const filesWithOnly = getFilesWithOnly(testDir);

if (filesWithOnly.length > 0) {
  console.log('✅ test.only found – Running only files with .only:\n', filesWithOnly.join('\n'));
  const filesArg = filesWithOnly.map(f => `"${f}"`).join(' ');
  execSync(`npx jest ${filesArg} --runInBand --detectOpenHandles --forceExit`, { stdio: 'inherit' });
} else {
  console.log('🔁 No test.only found – Running all tests...');
  execSync('npx jest', { stdio: 'inherit' });
}

