import { describe, it, expect, beforeAll } from 'vitest';
import { vpr7Tasks } from '../js/vpr7-tasks.json';
import { vpr8Tasks } from '../js/vpr8-tasks.json';

describe('vpr7-tasks.json', () => {
  beforeAll(() => {
    // Обеспечиваем глобальный доступ к модулям
    window.vpr7Tasks = vpr7Tasks;
    window.vpr8Tasks = vpr8Tasks;
  });

  it('should load vpr7 tasks', () => {
    expect(vpr7Tasks).toBeDefined();
    expect(Array.isArray(vpr7Tasks)).toBe(true);
    expect(vpr7Tasks.length).toBeGreaterThan(0);
  });

  it('should have correct structure for each task', () => {
    vpr7Tasks.forEach(task => {
      expect(task.id).toBeDefined();
      expect(task.title).toBeDefined();
      expect(task.category).toBe('vpr7');
      expect(task.description).toBeDefined();
      expect(task.answers).toBeDefined();
      expect(task.correctIndex).toBeDefined();
    });
  });

  it('should have valid answers', () => {
    vpr7Tasks.forEach((task, index) => {
      expect(task.answers).toHaveLength(3); // 3 варианта ответа
      expect(typeof task.correctIndex).toBe('number');
      expect(task.correctIndex).toBeGreaterThanOrEqual(0);
      expect(task.correctIndex).toBeLessThan(task.answers.length);
    });
  });
});

describe('vpr8-tasks.json', () => {
  it('should load vpr8 tasks', () => {
    expect(vpr8Tasks).toBeDefined();
    expect(Array.isArray(vpr8Tasks)).toBe(true);
    expect(vpr8Tasks.length).toBeGreaterThan(0);
  });

  it('should have correct structure for each task', () => {
    vpr8Tasks.forEach(task => {
      expect(task.id).toBeDefined();
      expect(task.title).toBeDefined();
      expect(task.category).toBe('vpr8');
      expect(task.description).toBeDefined();
      expect(task.answers).toBeDefined();
      expect(task.correctIndex).toBeDefined();
    });
  });

  it('should have valid answers', () => {
    vpr8Tasks.forEach((task, index) => {
      expect(task.answers).toHaveLength(3);
      expect(typeof task.correctIndex).toBe('number');
      expect(task.correctIndex).toBeGreaterThanOrEqual(0);
      expect(task.correctIndex).toBeLessThan(task.answers.length);
    });
  });
});