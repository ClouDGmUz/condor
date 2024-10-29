interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export class RateLimit {
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs = 60000, maxRequests = 5) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  async check(ip: string): Promise<{
    success: boolean;
    limit: number;
    remaining: number;
    reset: Date;
  }> {
    const now = Date.now();
    const resetTime = now + this.windowMs;

    // Clean up expired entries
    this.cleanup();

    if (!store[ip]) {
      store[ip] = {
        count: 1,
        resetTime,
      };
      return {
        success: true,
        limit: this.maxRequests,
        remaining: this.maxRequests - 1,
        reset: new Date(resetTime),
      };
    }

    const record = store[ip];

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = resetTime;
      return {
        success: true,
        limit: this.maxRequests,
        remaining: this.maxRequests - 1,
        reset: new Date(resetTime),
      };
    }

    record.count += 1;
    const remaining = Math.max(0, this.maxRequests - record.count);
    const success = record.count <= this.maxRequests;

    return {
      success,
      limit: this.maxRequests,
      remaining,
      reset: new Date(record.resetTime),
    };
  }

  private cleanup() {
    const now = Date.now();
    for (const ip in store) {
      if (store[ip].resetTime < now) {
        delete store[ip];
      }
    }
  }
} 