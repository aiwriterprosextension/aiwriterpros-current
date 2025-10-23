import { Link } from "react-router-dom";
import { FileText, TrendingUp, Plus, BookOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/DashboardSidebar";
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    articlesCreated: 0,
    wordsGenerated: 0,
    articlesRanking: 0,
  });
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;

      try {
        const { data: articles, error } = await (supabase as any)
          .from('articles')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const totalArticles = articles?.length || 0;
        const totalWords = articles?.reduce((sum: number, a: any) => sum + (a.word_count || 0), 0) || 0;

        setStats({
          articlesCreated: totalArticles,
          wordsGenerated: totalWords,
          articlesRanking: 0,
        });

        setRecentArticles(articles?.slice(0, 3) || []);
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  const statsCards = [
    { label: "Articles Created", value: stats.articlesCreated.toString(), icon: FileText },
    { label: "Words Generated", value: stats.wordsGenerated.toLocaleString(), icon: TrendingUp },
    { label: "Articles Ranking", value: stats.articlesRanking.toString(), icon: BookOpen },
  ];

  // Mock data for charts
  const pieData = [
    { name: "Amazon Reviews", value: 0 },
    { name: "Comparisons", value: 0 },
    { name: "Buying Guides", value: 0 },
  ];

  const lineData = [
    { name: "Mon", articles: 0 },
    { name: "Tue", articles: 0 },
    { name: "Wed", articles: 0 },
    { name: "Thu", articles: 0 },
    { name: "Fri", articles: 0 },
    { name: "Sat", articles: 0 },
    { name: "Sun", articles: 0 },
  ];

  const barData = [
    { range: "0-3k", count: 0 },
    { range: "3-6k", count: 0 },
    { range: "6-9k", count: 0 },
    { range: "9k+", count: 0 },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Welcome Banner */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!</h1>
            <p className="text-muted-foreground">Here's what's happening with your content today</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : null}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statsCards.map((stat, i) => (
              <div key={i} className="card-elevated p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mb-8">
            <Link to="/dashboard/create/amazon-review">
              <Button size="lg" className="btn-hero">
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Article
              </Button>
            </Link>
          </div>

          {/* Quick Start Cards */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/dashboard/create/amazon-review">
                <div className="card-interactive p-6">
                  <div className="p-3 bg-secondary/10 rounded-lg w-fit mb-4">
                    <FileText className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Amazon Review</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate comprehensive product reviews
                  </p>
                </div>
              </Link>

              <Link to="/dashboard/create/buying-guide">
                <div className="card-interactive p-6">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Buying Guide</h3>
                  <p className="text-sm text-muted-foreground">
                    Create detailed buyer's guides
                  </p>
                </div>
              </Link>

              <Link to="/dashboard/create/product-roundup">
                <div className="card-interactive p-6">
                  <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Product Roundup</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate "Best of" product lists
                  </p>
                </div>
              </Link>

              <Link to="/dashboard/create/how-to-article">
                <div className="card-interactive p-6">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">How-To Guide</h3>
                  <p className="text-sm text-muted-foreground">
                    Create step-by-step tutorials
                  </p>
                </div>
              </Link>

              <Link to="/dashboard/create/product-comparison">
                <div className="card-interactive p-6">
                  <div className="p-3 bg-secondary/10 rounded-lg w-fit mb-4">
                    <BookOpen className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Product Comparison</h3>
                  <p className="text-sm text-muted-foreground">
                    Compare products head-to-head
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Articles */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
            {!loading && recentArticles.length === 0 ? (
              <div className="card-elevated p-8 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No articles yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first article to get started!
                  </p>
                  <Link to="/dashboard/create/amazon-review">
                    <Button>Create Article</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {recentArticles.map((article) => (
                  <div key={article.id} className="card-elevated p-4">
                    <h3 className="font-semibold mb-1">{article.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {article.word_count?.toLocaleString() || 0} words • {new Date(article.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Analytics Overview */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Analytics Overview</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Pie Chart */}
              <div className="card-elevated p-6">
                <h3 className="text-lg font-semibold mb-4">Articles by Type</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={["#1e40af", "#14b8a6", "#f59e0b"][index % 3]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <p className="text-center text-sm text-muted-foreground mt-2">No data yet</p>
              </div>

              {/* Line Chart */}
              <div className="card-elevated p-6">
                <h3 className="text-lg font-semibold mb-4">Word Count Trends</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="articles" stroke="#1e40af" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div className="card-elevated p-6">
                <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#14b8a6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
