"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

// Import layout components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

// Import view components
import DashboardOverview from "./components/DashboardOverview";
import BusinessManagement from "./components/BusinessManagement";
import WhiteLabelManagement from "./components/WhiteLabelManagement";
import UserManagement from "./components/UserManagement";
import SubscriptionManagement from "./components/SubscriptionManagement";
import BillingPayments from "./components/BillingPayments";
import WhatsAppManagement from "./components/WhatsAppManagement";
import AIManagement from "./components/AIManagement";
import KBManagement from "./components/KBManagement";
import AnalyticsPage from "./components/AnalyticsPage";
import NotificationsPage from "./components/NotificationsPage";
import AuditLogsPage from "./components/AuditLogsPage";
import SettingsPage from "./components/SettingsPage";
import ProfilePage from "./components/ProfilePage";

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [systemAlert, setSystemAlert] = useState<string | null>(null);

  // Auto clear alerts
  useEffect(() => {
    if (systemAlert) {
      const timer = setTimeout(() => setSystemAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [systemAlert]);

  const triggerAlert = (msg: string) => {
    setSystemAlert(msg);
  };

  return (
    <div className="min-h-screen bg-admin-bg text-admin-text flex font-sans selection:bg-admin-primary selection:text-white overflow-hidden">
      {/* Toast Alert */}
      <AnimatePresence>
        {systemAlert && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl border border-admin-success/30 bg-[#121B2A]/95 text-admin-success text-xs font-bold shadow-xl shadow-black/40 flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            {systemAlert}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <main className="p-8 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "dashboard" && <DashboardOverview onAlert={triggerAlert} />}
              {activeTab === "businesses" && <BusinessManagement onAlert={triggerAlert} />}
              {activeTab === "whitelabel" && <WhiteLabelManagement onAlert={triggerAlert} />}
              {activeTab === "users" && <UserManagement onAlert={triggerAlert} />}
              {activeTab === "subscriptions" && <SubscriptionManagement onAlert={triggerAlert} />}
              {activeTab === "billing" && <BillingPayments onAlert={triggerAlert} />}
              {activeTab === "whatsapp" && <WhatsAppManagement onAlert={triggerAlert} />}
              {activeTab === "ai" && <AIManagement onAlert={triggerAlert} />}
              {activeTab === "kb" && <KBManagement onAlert={triggerAlert} />}
              {activeTab === "analytics" && <AnalyticsPage />}
              {activeTab === "notifications" && <NotificationsPage onAlert={triggerAlert} />}
              {activeTab === "logs" && <AuditLogsPage />}
              {activeTab === "settings" && <SettingsPage onAlert={triggerAlert} />}
              {activeTab === "profile" && <ProfilePage onAlert={triggerAlert} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
