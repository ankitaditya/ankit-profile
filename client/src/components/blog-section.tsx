import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const { data: searchResults } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts/search", searchQuery],
    enabled: searchQuery.length > 0,
  });

  const displayPosts = searchQuery ? searchResults : blogPosts;

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "AI Engineering": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "Serverless": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "DevOps": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "Security": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      "Performance": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      "Architecture": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  };

  return (
    <section id="blog" className="py-16 sm:py-24 bg-secondary/20 print-break">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Blog</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights on AI engineering, serverless architecture, and emerging technologies
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8 no-print">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-blog-search"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          </div>
        </div>

        {/* Blog Posts Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded mb-3"></div>
                  <div className="h-6 bg-muted rounded mb-2"></div>
                  <div className="h-16 bg-muted rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 w-20 bg-muted rounded"></div>
                    <div className="h-4 w-16 bg-muted rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="container-blog-posts">
            {displayPosts?.map((post) => (
              <Card key={post.id} className="hover-lift animate-slide-up group" data-testid={`card-blog-post-${post.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground" data-testid={`text-date-${post.id}`}>
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors" data-testid={`text-title-${post.id}`}>
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4" data-testid={`text-excerpt-${post.id}`}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground" data-testid={`text-reading-time-${post.id}`}>
                      {post.readingTime}
                    </span>
                    <button className="text-accent hover:text-accent/80 text-sm font-medium" data-testid={`link-read-more-${post.id}`}>
                      Read more →
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {displayPosts && displayPosts.length === 0 && (
          <div className="text-center py-12" data-testid="text-no-posts">
            <p className="text-muted-foreground">No blog posts found.</p>
          </div>
        )}

        {/* Load More Button */}
        <div className="text-center mt-8 no-print">
          <Button variant="outline" className="hover-lift" data-testid="button-load-more">
            <Plus className="mr-2 h-4 w-4" />
            Load More Posts
          </Button>
        </div>
      </div>
    </section>
  );
}
