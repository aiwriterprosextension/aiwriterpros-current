import { Link, useLocation } from "react-router-dom";
import { Home, Plus, FileText, BarChart3, Settings, Sparkles, ChevronDown, ArrowUpCircle, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const DashboardSidebar = () => {
  const { signOut, user } = useAuth();
  const location = useLocation();
  const [createMenuOpen, setCreateMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const articleTypes = [
    { name: "Amazon Product Review", path: "/dashboard/create/amazon-review", enabled: true },
    { name: "Product Comparison", path: "/dashboard/create/product-comparison", enabled: true },
    { name: "Buying Guide", path: "/dashboard/create/buying-guide", enabled: true },
    { name: "How-To Article", path: "/dashboard/create/how-to-article", enabled: true },
    { name: "Product Roundup", path: "/dashboard/create/product-roundup", enabled: true },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center space-x-2">
          <Sparkles className="h-7 w-7 text-primary" />
          <span className="text-lg font-bold">AIWriterPros</span>
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary font-semibold">G</span>
          </div>
          <div>
            <p className="font-semibold text-sm">Guest User</p>
            <p className="text-xs text-muted-foreground">Free Plan</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <Link
          to="/dashboard"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/dashboard")
              ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          }`}
        >
          <Home className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>

        {/* Create New Article Dropdown */}
        <div>
          <button
            onClick={() => setCreateMenuOpen(!createMenuOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <div className="flex items-center space-x-3">
              <Plus className="h-5 w-5" />
              <span>Create New Article</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${createMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {createMenuOpen && (
            <div className="mt-2 ml-4 space-y-1">
              {articleTypes.map((type) => (
                <Link
                  key={type.name}
                  to={type.path}
                  className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                    type.enabled
                      ? "text-sidebar-foreground hover:bg-sidebar-accent"
                      : "text-muted-foreground cursor-not-allowed"
                  }`}
                  onClick={(e) => !type.enabled && e.preventDefault()}
                >
                  <div className="flex items-center justify-between">
                    <span>{type.name}</span>
                    {!type.enabled && (
                      <span className="text-xs bg-muted px-2 py-0.5 rounded">Soon</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          to="/dashboard/articles"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/dashboard/articles")
              ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          }`}
        >
          <FileText className="h-5 w-5" />
          <span>My Articles</span>
        </Link>

        <Link
          to="/dashboard/analytics"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/dashboard/analytics")
              ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          }`}
        >
          <BarChart3 className="h-5 w-5" />
          <span>Analytics</span>
        </Link>

        <Link
          to="/dashboard/settings"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/dashboard/settings")
              ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          }`}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>

        <button
          onClick={signOut}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-sidebar-foreground hover:bg-sidebar-accent w-full"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </nav>

      {/* Upgrade CTA */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="card-elevated p-4 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <div className="flex items-start space-x-2 mb-2">
            <ArrowUpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm mb-1">Upgrade to Pro</p>
              <p className="text-xs text-muted-foreground mb-3">
                Get 50 articles/month and priority support
              </p>
              <Link to="/pricing">
                <Button size="sm" className="w-full bg-primary text-primary-foreground">
                  Upgrade Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
