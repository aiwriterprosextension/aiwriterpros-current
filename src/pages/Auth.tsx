import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "Successfully logged in.",
        });
        navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });

        if (error) throw error;

        toast({
          title: "Account created!",
          description: "Successfully signed up. Redirecting to dashboard...",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[hsl(222,47%,11%)]">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-[#8B5CF6] via-[#7C3AED] to-[#6366F1] p-12 flex-col justify-between text-white">
        <div>
          <h1 className="text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Welcome Back To<br />AIWriterPros
          </h1>
          <p className="text-xl text-purple-100 mb-12">
            Your AI-powered content companion
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-1">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Instant Generation</h3>
                <p className="text-purple-100/90">Create professional articles in minutes</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-1">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Track Progress</h3>
                <p className="text-purple-100/90">Monitor all your generated content</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-1">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Save Hours Weekly</h3>
                <p className="text-purple-100/90">Automate your content creation workflow</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <p className="text-lg italic mb-2">"AIWriterPros cut my content time by 70%."</p>
          <p className="text-purple-100 font-semibold">— Sarah T., Content Marketer</p>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-[hsl(222,47%,8%)] rounded-2xl p-10 shadow-2xl border border-white/5">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-400">
                Sign in using your email address
              </p>
            </div>

            {/* Tab Toggle */}
            <div className="flex bg-[hsl(222,47%,12%)] rounded-lg p-1 mb-6">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-all ${
                  isLogin
                    ? "bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
                disabled={loading}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-all ${
                  !isLogin
                    ? "bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
                disabled={loading}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-gray-300 mb-2 block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="bg-[hsl(222,47%,12%)] border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 h-12"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-300 mb-2 block">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={6}
                  className="bg-[hsl(222,47%,12%)] border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 h-12"
                />
                {!isLogin && (
                  <p className="text-sm text-gray-400 mt-2">
                    Must be at least 6 characters
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#7C3AED] hover:to-[#5B21B6] text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  <>{isLogin ? "Sign In" : "Create Account"}</>
                )}
              </Button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-8">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-400 hover:text-purple-300 font-semibold"
                disabled={loading}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-gray-400 text-sm">
                Start saving 5+ hours weekly
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
