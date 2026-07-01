import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "bookings", label: "Bookings", icon: ClipboardList },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

const statusColors: Record<string, string> = {
  confirmed: "text-[#829796] bg-[#829796]/10",
  pending_approval: "text-amber-400 bg-amber-400/10",
  pending_payment: "text-blue-400 bg-blue-400/10",
  cancelled_by_customer: "text-red-400 bg-red-400/10",
  cancelled_by_staff: "text-red-400 bg-red-400/10",
  rejected: "text-red-400 bg-red-400/10",
  in_progress: "text-emerald-400 bg-emerald-400/10",
  completed: "text-[#829796] bg-[#829796]/10",
  draft: "text-white/40 bg-white/5",
};

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const isAdmin = user?.role === "admin" || user?.role === "manager";

  const { data: myBookings } = trpc.booking.myBookings.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const { data: allBookings } = trpc.admin.bookings.useQuery(undefined, {
    enabled: isAdmin,
  });

  const { data: stats } = trpc.admin.stats.useQuery(undefined, {
    enabled: isAdmin,
  });

  const approveBooking = trpc.admin.approveBooking.useMutation({
    onSuccess: () => window.location.reload(),
  });
  const rejectBooking = trpc.admin.rejectBooking.useMutation({
    onSuccess: () => window.location.reload(),
  });

  const bookingsList = isAdmin ? allBookings : myBookings;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#030305] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-white mb-4">Dashboard</h1>
          <p className="text-[#B0A8A8] mb-6">Please log in to access your dashboard.</p>
          <Link to="/login" className="btn-pill-primary">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030305] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F0F11] border-r border-white/5 flex-col hidden lg:flex">
        <div className="p-6">
          <Link to="/" className="font-serif text-xl text-white">
            BeeVelt Halls
          </Link>
          <p className="text-xs text-[#B0A8A8] mt-1">Management Dashboard</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${
                activeTab === item.id
                  ? "bg-[#829796]/15 text-[#829796]"
                  : "text-[#B0A8A8] hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#829796]/20 flex items-center justify-center">
              <span className="text-xs text-[#829796] font-medium">
                {user?.name?.[0] || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{user?.name || "User"}</p>
              <p className="text-xs text-[#B0A8A8] capitalize">{user?.role || "user"}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-[#B0A8A8] hover:bg-white/5 hover:text-white transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0F0F11] border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-serif text-lg text-white">
          BeeVelt Halls
        </Link>
        <Link to="/" className="text-sm text-[#B0A8A8]">
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-14 lg:pt-0">
        <div className="max-w-6xl mx-auto p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-2xl lg:text-3xl text-white capitalize">
                {activeTab}
              </h1>
              <p className="text-sm text-[#B0A8A8] mt-1">
                {activeTab === "overview" && "Welcome back to your dashboard"}
                {activeTab === "calendar" && "Manage your event calendar"}
                {activeTab === "bookings" && "View and manage all bookings"}
                {activeTab === "analytics" && "Revenue and occupancy insights"}
              </p>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              {isAdmin && stats && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Total Revenue", value: new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(stats.totalRevenue), icon: TrendingUp, color: "text-[#829796]" },
                    { label: "Total Bookings", value: stats.totalBookings.toString(), icon: ClipboardList, color: "text-white" },
                    { label: "Pending Approval", value: stats.pendingApprovals.toString(), icon: Clock, color: "text-amber-400" },
                    { label: "Upcoming Events", value: stats.upcomingEvents.toString(), icon: CalendarDays, color: "text-emerald-400" },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="liquid-glass rounded-xl p-5"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        <span className="text-xs text-[#B0A8A8] uppercase tracking-wider">
                          {stat.label}
                        </span>
                      </div>
                      <p className={`font-serif text-2xl lg:text-3xl ${stat.color}`}>
                        {stat.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Recent Bookings */}
              <div className="liquid-glass rounded-xl p-6">
                <h3 className="font-serif text-lg text-white mb-4">
                  {isAdmin ? "Recent Bookings" : "My Bookings"}
                </h3>
                {bookingsList && bookingsList.length > 0 ? (
                  <div className="space-y-3">
                    {bookingsList.slice(0, 5).map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[#829796]/10 flex items-center justify-center">
                            <CalendarDays className="w-5 h-5 text-[#829796]" />
                          </div>
                          <div>
                            <p className="text-sm text-white font-medium">
                              {booking.eventName}
                            </p>
                            <p className="text-xs text-[#B0A8A8]">
                              {booking.eventType} ·{" "}
                              {new Date(booking.eventStart).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs capitalize ${
                              statusColors[booking.status] || "text-white/40 bg-white/5"
                            }`}
                          >
                            {booking.status.replace(/_/g, " ")}
                          </span>
                          {isAdmin && booking.status === "pending_approval" && (
                            <div className="flex gap-1">
                              <button
                                onClick={() =>
                                  approveBooking.mutate({ id: booking.id })
                                }
                                disabled={approveBooking.isPending}
                                className="p-1.5 rounded-lg bg-[#829796]/10 hover:bg-[#829796]/20 text-[#829796] transition-colors"
                              >
                                {approveBooking.isPending ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <button
                                onClick={() =>
                                  rejectBooking.mutate({ id: booking.id })
                                }
                                disabled={rejectBooking.isPending}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                              >
                                {rejectBooking.isPending ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <XCircle className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ClipboardList className="w-12 h-12 text-white/10 mx-auto mb-4" />
                    <p className="text-[#B0A8A8]">No bookings yet</p>
                    <Link
                      to="/book"
                      className="text-[#829796] text-sm hover:underline mt-2 inline-block"
                    >
                      Create your first booking
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div className="liquid-glass rounded-xl p-6">
              <h3 className="font-serif text-lg text-white mb-4">All Bookings</h3>
              {bookingsList && bookingsList.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-[#B0A8A8]">
                          Reference
                        </th>
                        <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-[#B0A8A8]">
                          Event
                        </th>
                        <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-[#B0A8A8]">
                          Date
                        </th>
                        <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-[#B0A8A8]">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-[#B0A8A8]">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingsList.map((booking) => (
                        <tr
                          key={booking.id}
                          className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="py-3 px-4 text-sm text-[#829796]">
                            {booking.bookingRef}
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-sm text-white">{booking.eventName}</p>
                            <p className="text-xs text-[#B0A8A8] capitalize">
                              {booking.eventType}
                            </p>
                          </td>
                          <td className="py-3 px-4 text-sm text-[#B0A8A8]">
                            {new Date(booking.eventStart).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-sm text-white">
                            {new Intl.NumberFormat("en-NG", {
                              style: "currency",
                              currency: "NGN",
                            }).format(parseFloat(booking.total))}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs capitalize ${
                                statusColors[booking.status] || "text-white/40 bg-white/5"
                              }`}
                            >
                              {booking.status.replace(/_/g, " ")}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-[#B0A8A8]">
                  No bookings found
                </div>
              )}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && isAdmin && stats && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="liquid-glass rounded-xl p-6">
                  <h4 className="text-xs uppercase tracking-wider text-[#B0A8A8] mb-4">
                    Monthly Revenue
                  </h4>
                  <div className="space-y-3">
                    {stats.monthlyRevenue.map((m) => (
                      <div key={m.month} className="flex items-center gap-3">
                        <span className="text-xs text-[#B0A8A8] w-16">{m.month}</span>
                        <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${Math.min(
                                (m.total /
                                  Math.max(
                                    ...stats.monthlyRevenue.map((x) => x.total)
                                  )) *
                                  100,
                                100
                              )}%`,
                            }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full bg-gradient-to-r from-[#829796] to-[#E33539] rounded-full"
                          />
                        </div>
                        <span className="text-xs text-white w-20 text-right">
                          {new Intl.NumberFormat("en-NG", {
                            style: "currency",
                            currency: "NGN",
                            maximumFractionDigits: 0,
                          }).format(m.total)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="liquid-glass rounded-xl p-6">
                  <h4 className="text-xs uppercase tracking-wider text-[#B0A8A8] mb-4">
                    Key Metrics
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
                      <span className="text-sm text-[#B0A8A8]">Occupancy Rate</span>
                      <span className="text-lg font-serif text-[#829796]">
                        {stats.totalBookings > 0
                          ? `${Math.round(
                              (stats.upcomingEvents / stats.totalBookings) * 100
                            )}%`
                          : "0%"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
                      <span className="text-sm text-[#B0A8A8]">Avg. Booking Value</span>
                      <span className="text-lg font-serif text-[#829796]">
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                          maximumFractionDigits: 0,
                        }).format(
                          stats.totalBookings > 0
                            ? stats.totalRevenue / stats.totalBookings
                            : 0
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
                      <span className="text-sm text-[#B0A8A8]">Approval Pending</span>
                      <span className="text-lg font-serif text-amber-400">
                        {stats.pendingApprovals}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Calendar Tab */}
          {activeTab === "calendar" && (
            <div className="liquid-glass rounded-xl p-6 text-center py-20">
              <CalendarDays className="w-16 h-16 text-white/10 mx-auto mb-4" />
              <h3 className="font-serif text-xl text-white mb-2">
                Full Calendar View
              </h3>
              <p className="text-[#B0A8A8] max-w-md mx-auto">
                The full calendar management interface with drag-and-drop
                rescheduling is available in the admin portal.
              </p>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="liquid-glass rounded-xl p-6 max-w-lg">
              <h3 className="font-serif text-lg text-white mb-4">Profile Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B0A8A8] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.name || ""}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#829796]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B0A8A8] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email || ""}
                    readOnly
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/60 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B0A8A8] mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.role || "user"}
                    readOnly
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/60 cursor-not-allowed capitalize"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
