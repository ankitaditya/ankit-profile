import { type User, type InsertUser, type BlogPost, type InsertBlogPost, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  searchBlogPosts(query: string): Promise<BlogPost[]>;
  
  // Contacts
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private blogPosts: Map<string, BlogPost>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.contacts = new Map();
    
    // Initialize with sample blog posts
    this.initializeBlogPosts();
  }

  private initializeBlogPosts() {
    const samplePosts: Omit<BlogPost, 'id'>[] = [
      {
        title: "Building Production-Ready LLM APIs",
        content: `# Building Production-Ready LLM APIs

Building production-ready Large Language Model (LLM) APIs requires careful consideration of performance, scalability, and cost optimization. In this post, I'll share insights from deploying LLM services for 20+ enterprise clients.

## Architecture Considerations

When designing LLM APIs, the key is to balance latency, throughput, and cost. Here are the essential components:

### 1. Model Serving Infrastructure
- **Container orchestration**: Use ECS or EKS for auto-scaling
- **Load balancing**: Distribute requests across multiple model instances
- **Caching**: Implement intelligent caching for repeated queries

### 2. API Gateway Design
- **Rate limiting**: Protect against abuse and manage costs
- **Authentication**: Implement proper API key management
- **Monitoring**: Track usage, latency, and error rates

### 3. Cost Optimization Strategies
- **Dynamic scaling**: Scale down during low usage periods
- **Model quantization**: Use smaller models for simpler tasks
- **Batch processing**: Group similar requests together

## Implementation Example

Here's a simplified FastAPI implementation:

\`\`\`python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import asyncio

app = FastAPI()

class LLMRequest(BaseModel):
    prompt: str
    max_tokens: int = 100

@app.post("/generate")
async def generate_text(request: LLMRequest):
    try:
        # Your LLM inference logic here
        result = await model.generate(request.prompt, request.max_tokens)
        return {"text": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
\`\`\`

## Monitoring and Observability

Implement comprehensive monitoring:
- **Latency tracking**: P95/P99 response times
- **Error rates**: Track and alert on failures
- **Cost monitoring**: Track inference costs per request
- **Usage analytics**: Understand client patterns

## Conclusion

Building production LLM APIs requires attention to infrastructure, cost optimization, and monitoring. The investment in proper architecture pays off through improved reliability and reduced operational costs.`,
        excerpt: "Learn how to architect, deploy, and scale large language model APIs for production environments with proper error handling and monitoring.",
        tags: ["AI", "LLM", "API", "Production"],
        category: "AI Engineering",
        publishedAt: new Date("2024-12-15"),
        readingTime: "5 min read"
      },
      {
        title: "Serverless Cost Optimization Strategies",
        content: `# Serverless Cost Optimization Strategies

Serverless computing offers great scalability but can lead to unexpected costs if not optimized properly. Here are proven strategies to reduce AWS Lambda costs by up to 40%.

## Understanding Serverless Costs

The main cost factors in serverless:
- **Invocation costs**: Per request charges
- **Duration costs**: Based on execution time and memory
- **Data transfer**: Bandwidth costs
- **Supporting services**: API Gateway, CloudWatch, etc.

## Optimization Techniques

### 1. Right-size Memory Allocation
- Monitor actual memory usage
- Use AWS Lambda Power Tuning tool
- Balance memory vs execution time

### 2. Optimize Cold Starts
- Keep functions warm with scheduled invocations
- Minimize package size
- Use provisioned concurrency for critical functions

### 3. Efficient Code Patterns
- Reuse connections and clients
- Implement proper error handling
- Use async/await for I/O operations

## Real-world Results

By implementing these strategies across multiple client projects:
- 40% reduction in Lambda costs
- 30% improvement in response times
- 50% fewer cold start issues

The key is continuous monitoring and iterative optimization based on actual usage patterns.`,
        excerpt: "Practical techniques to reduce AWS Lambda costs by 40% while maintaining performance and reliability in your serverless applications.",
        tags: ["Serverless", "AWS", "Cost Optimization", "Lambda"],
        category: "Serverless",
        publishedAt: new Date("2024-11-28"),
        readingTime: "8 min read"
      },
      {
        title: "Infrastructure as Code with Terraform",
        content: `# Infrastructure as Code with Terraform

Managing cloud infrastructure manually is error-prone and doesn't scale. Terraform provides a declarative approach to infrastructure management that ensures consistency and reliability.

## Why Infrastructure as Code?

Benefits of IaC:
- **Consistency**: Same infrastructure across environments
- **Version control**: Track changes over time
- **Automation**: Reduce manual errors
- **Documentation**: Code serves as documentation

## Terraform Best Practices

### 1. Module Organization
Structure your Terraform code into reusable modules:

\`\`\`hcl
modules/
  ├── vpc/
  ├── ecs/
  ├── rds/
  └── monitoring/
\`\`\`

### 2. State Management
- Use remote state storage (S3 + DynamoDB)
- Enable state locking
- Separate state files by environment

### 3. Variable Management
- Use terraform.tfvars files
- Implement proper validation
- Document all variables

## Example Module

Here's a simple ECS module:

\`\`\`hcl
resource "aws_ecs_cluster" "main" {
  name = var.cluster_name
  
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_ecs_service" "app" {
  name            = var.service_name
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.desired_count
}
\`\`\`

## Conclusion

Terraform enables reliable, scalable infrastructure management. Start with simple modules and gradually build complexity as your needs grow.`,
        excerpt: "Best practices for managing cloud infrastructure using Terraform, including module organization and state management.",
        tags: ["DevOps", "Terraform", "Infrastructure", "AWS"],
        category: "DevOps",
        publishedAt: new Date("2024-11-10"),
        readingTime: "6 min read"
      },
      {
        title: "Implementing OAuth2 with Keycloak",
        content: `# Implementing OAuth2 with Keycloak

Keycloak provides enterprise-grade identity and access management. This guide covers implementing OAuth2 authentication in your applications.

## What is Keycloak?

Keycloak is an open-source identity provider that supports:
- OAuth2 and OpenID Connect
- SAML 2.0
- User federation
- Social login
- Multi-factor authentication

## Setup and Configuration

### 1. Docker Deployment
\`\`\`bash
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:latest start-dev
\`\`\`

### 2. Realm Configuration
- Create a new realm for your application
- Configure clients for frontend and backend
- Set up proper redirect URIs

### 3. Integration Example

Node.js with Passport:

\`\`\`javascript
const passport = require('passport');
const KeycloakStrategy = require('@exlinc/keycloak-passport');

passport.use('keycloak', new KeycloakStrategy({
  host: 'http://localhost:8080',
  realm: 'your-realm',
  clientID: 'your-client',
  clientSecret: 'your-secret'
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));
\`\`\`

## Security Considerations

- Use HTTPS in production
- Implement proper token validation
- Set appropriate token expiration times
- Monitor authentication events

Keycloak provides a robust foundation for secure authentication across your application ecosystem.`,
        excerpt: "Complete guide to implementing secure authentication and authorization in your applications using Keycloak SSO.",
        tags: ["Security", "OAuth2", "Keycloak", "Authentication"],
        category: "Security",
        publishedAt: new Date("2024-10-22"),
        readingTime: "12 min read"
      },
      {
        title: "Optimizing React Performance",
        content: `# Optimizing React Performance

React applications can become slow as they grow. Here are advanced techniques for maintaining optimal performance in large React applications.

## Performance Bottlenecks

Common issues:
- Unnecessary re-renders
- Large bundle sizes
- Memory leaks
- Inefficient state management

## Optimization Techniques

### 1. Code Splitting
Implement route-based and component-based splitting:

\`\`\`jsx
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

### 2. Memoization
Use React.memo and useMemo strategically:

\`\`\`jsx
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return expensiveCalculation(data);
  }, [data]);
  
  return <div>{processedData}</div>;
});
\`\`\`

### 3. Virtual Scrolling
For large lists, implement virtual scrolling:

\`\`\`jsx
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);

const VirtualList = () => (
  <List height={400} itemCount={1000} itemSize={35}>
    {Row}
  </List>
);
\`\`\`

## Monitoring Performance

Use React DevTools Profiler to:
- Identify slow components
- Track render counts
- Analyze commit phases

## Results

These optimizations typically yield:
- 35% improvement in Time to Interactive
- 50% reduction in bundle size
- Better Lighthouse scores

Remember: measure first, optimize second. Not all optimizations are worth the complexity they introduce.`,
        excerpt: "Advanced techniques for code-splitting, lazy loading, and performance monitoring in React applications.",
        tags: ["React", "Performance", "Frontend", "JavaScript"],
        category: "Performance",
        publishedAt: new Date("2024-10-05"),
        readingTime: "7 min read"
      },
      {
        title: "Microservices Design Patterns",
        content: `# Microservices Design Patterns

Microservices architecture provides flexibility and scalability but introduces complexity. Here are essential patterns for building resilient microservices.

## Core Patterns

### 1. Circuit Breaker
Prevent cascading failures:

\`\`\`javascript
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.threshold = threshold;
    this.timeout = timeout;
    this.failureCount = 0;
    this.state = 'CLOSED';
    this.nextAttempt = Date.now();
  }

  async call(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failureCount++;
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
    }
  }
}
\`\`\`

### 2. Saga Pattern
Manage distributed transactions:

- **Choreography**: Services publish events
- **Orchestration**: Central coordinator manages flow

### 3. API Gateway
Single entry point for all client requests:
- Request routing
- Authentication
- Rate limiting
- Request/response transformation

## Event Sourcing

Store events instead of current state:

\`\`\`javascript
class EventStore {
  constructor() {
    this.events = [];
  }

  append(event) {
    event.timestamp = Date.now();
    this.events.push(event);
  }

  getEvents(aggregateId) {
    return this.events.filter(e => e.aggregateId === aggregateId);
  }

  replay(aggregateId) {
    const events = this.getEvents(aggregateId);
    return events.reduce((state, event) => 
      this.applyEvent(state, event), {});
  }
}
\`\`\`

## Best Practices

- Design for failure
- Implement proper monitoring
- Use correlation IDs for tracing
- Version your APIs
- Implement graceful degradation

Microservices require careful design but provide excellent scalability and maintainability when implemented correctly.`,
        excerpt: "Essential patterns for building resilient microservices architectures including circuit breakers and event sourcing.",
        tags: ["Microservices", "Architecture", "Distributed Systems", "Design Patterns"],
        category: "Architecture",
        publishedAt: new Date("2024-09-18"),
        readingTime: "10 min read"
      }
    ];

    samplePosts.forEach(post => {
      const id = randomUUID();
      this.blogPosts.set(id, { ...post, id });
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = { 
      ...insertPost, 
      id, 
      publishedAt: new Date() 
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async searchBlogPosts(query: string): Promise<BlogPost[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.blogPosts.values())
      .filter(post => 
        post.title.toLowerCase().includes(lowerQuery) ||
        post.content.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  // Contacts
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
