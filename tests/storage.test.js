import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { VPR7_Storage, VPR8_Storage } from '../js/storage/localStorage.js';

describe('VPR7_Storage', () => {
  const STORAGE_KEY = 'vpr7-progress';
  
  beforeAll(() => {
    localStorage.clear();
  });
  
  afterAll(() => {
    localStorage.clear();
  });
  
  it('should save progress correctly', () => {
    const testData = {
      task: 'vpr7-1',
      score: 5,
      attempts: 3,
      timestamp: Date.now()
    };
    
    const result = VPR7_Storage.save(STORAGE_KEY, testData);
    expect(result).toBe(true);
    
    const saved = VPR7_Storage.load(STORAGE_KEY);
    expect(saved).toEqual(testData);
  });
  
  it('should get progress', () => {
    VPR7_Storage.save(STORAGE_KEY, { task: 'vpr7-1', score: 5 });
    VPR7_Storage.save(STORAGE_KEY, { task: 'vpr7-2', score: 4 });
    
    const progress = VPR7_Storage.getProgress();
    expect(progress).toHaveLength(2);
  });
  
  it('should get empty progress for non-existent key', () => {
    const progress = VPR7_Storage.getProgress('nonexistent');
    expect(progress).toEqual({});
  });
});

describe('VPR8_Storage', () => {
  const STORAGE_KEY = 'vpr8-progress';
  
  beforeAll(() => {
    localStorage.clear();
  });
  
  afterAll(() => {
    localStorage.clear();
  });
  
  it('should save progress correctly', () => {
    const testData = {
      task: 'vpr8-1',
      score: 3,
      attempts: 2,
      timestamp: Date.now()
    };
    
    const result = VPR8_Storage.save(STORAGE_KEY, testData);
    expect(result).toBe(true);
    
    const saved = VPR8_Storage.load(STORAGE_KEY);
    expect(saved).toEqual(testData);
  });
  
  it('should save score with correct/incorrect', () => {
    const result = VPR8_Storage.saveScore('vpr8-1', 5, true);
    expect(result).toBe(true);
    
    const progress = VPR8_Storage.getProgress();
    const task = progress['vpr8-1'];
    expect(task.score).toBe(5);
    expect(task.correct).toBe(true);
  });
  
  it('should get empty progress for non-existent key', () => {
    const progress = VPR8_Storage.getProgress('nonexistent');
    expect(progress).toEqual({});
  });
});