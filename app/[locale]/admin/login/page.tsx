"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { verifyAdminCredentials, setAdminToken, isAdminLoggedIn } from "@/lib/admin/auth";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const router = useRouter();
    const { locale } = useParams<{ locale: string }>();

    useEffect(() => {
        // Check if already logged in
        const checkExisting = async () => {
            // Small delay for hydration
            await new Promise(resolve => setTimeout(resolve, 50));
            if (isAdminLoggedIn()) {
                router.replace(`/${locale}/admin/properties`);
            } else {
                setIsInitialized(true);
            }
        };
        checkExisting();
    }, [router, locale]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Validate inputs
            if (!username || !password) {
                setError("Please enter both username and password");
                setLoading(false);
                return;
            }

            // Verify credentials
            if (verifyAdminCredentials(username, password)) {
                // Set token
                setAdminToken("admin_session_token_v2");

                // Wait for token to be written
                await new Promise(resolve => setTimeout(resolve, 200));

                // Redirect using replace instead of push
                router.replace(`/${locale}/admin/properties`);
            } else {
                setError("Invalid username or password. Please try again.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!isInitialized) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-14 w-14 border-4 border-gray-700 border-t-blue-600 shadow-lg mb-4"></div>
                    <p className="text-white font-medium text-lg">Initializing Admin Portal...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center p-4">
            <motion.div
                className=" max-w-md bg-gray-900/30 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-2xl p-8 sm:p-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Header */}
                <div className="text-center mb-8 sm:mb-10">
                    <div className="mx-auto w-20 h-20 flex items-center justify-center bg-linear-to-br from-blue-700 to-indigo-700 rounded-2xl mb-6 shadow-lg hover:scale-105 transition-transform">
                        <Lock className="text-black" size={36} />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 sm:mb-3">
                        Admin Portal
                    </h1>
                    <p className="text-gray-300 text-base sm:text-lg">
                        Manage DB ImmoDesign Properties
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
                    {/* Username */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-semibold text-gray-200 mb-2 sm:mb-3"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 sm:px-5 py-3 sm:py-3.5 border border-gray-600 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-base sm:text-lg"
                            placeholder="Enter username"
                            disabled={loading}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-200 mb-2 sm:mb-3"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 sm:px-5 py-3 sm:py-3.5 border border-gray-600 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-base sm:text-lg"
                            placeholder="Enter password"
                            disabled={loading}
                            required
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <motion.div
                            className="p-3 sm:p-4 bg-red-900/40 border border-red-600 rounded-xl text-red-200 text-sm font-medium backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            ⚠️ {error}
                        </motion.div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 sm:py-3.5 px-4 sm:px-6 bg-linear-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-xl cursor:pointer hover:from-blue-700 hover:to-indigo-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg shadow-lg hover:shadow-2xl"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-xs text-gray-400 mt-6 sm:mt-8 pt-6 border-t border-gray-700/50">
                    © 2026 DB ImmoDesign Admin Panel
                </p>
            </motion.div>
        </div>
    );
}
