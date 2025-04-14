
import { Link } from "react-router-dom";
import {
  CalendarDays,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Puzzle,
  BarChart3,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const sidebarWidth = collapsed ? "w-16" : "w-64";
  
  const NavItem = ({ icon: Icon, label, to }: { icon: any; label: string; to: string }) => (
    <Link to={to} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          collapsed && "justify-center px-0"
        )}
      >
        <Icon size={20} />
        {!collapsed && <span>{label}</span>}
      </Button>
    </Link>
  );

  if (isMobile) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-sidebar p-4 transition-all duration-200",
        sidebarWidth,
        className
      )}
    >
      <div className="flex items-center justify-between mb-8">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold">TT</span>
            </div>
            <h1 className="font-bold text-lg text-secondary">Talk Through</h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleSidebar}
        >
          {collapsed ? "→" : "←"}
        </Button>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        <div className="space-y-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" to="/" />
          <NavItem icon={Users} label="Patients" to="/patients" />
          <NavItem icon={Puzzle} label="Experience Builder" to="/builder" />
          <NavItem icon={CalendarDays} label="Calendar" to="/calendar" />
          <NavItem icon={BarChart3} label="Reports" to="/reports" />
          <NavItem icon={Settings} label="Settings" to="/settings" />
        </div>
      </div>

      <div className="mt-auto pt-4 border-t">
        {collapsed ? (
          <Avatar className="h-10 w-10 mx-auto">
            <AvatarFallback>TT</AvatarFallback>
          </Avatar>
        ) : (
          <div className="flex items-center gap-3 w-full">
            <Avatar className="h-10 w-10">
              <AvatarFallback>TT</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium leading-none truncate">Dr. Sarah Johnson</p>
              <p className="text-xs text-muted-foreground truncate">Speech Therapist</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <LogOut size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
