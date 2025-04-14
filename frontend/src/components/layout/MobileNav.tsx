
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  LayoutDashboard,
  Users,
  Settings,
  Menu,
  Puzzle,
  BarChart3,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const MobileNav = () => {
  const NavItem = ({ icon: Icon, label, to }: { icon: any; label: string; to: string }) => (
    <Link to={to} className="w-full">
      <Button
        variant="ghost"
        className="w-full justify-start gap-3 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <Icon size={20} />
        <span>{label}</span>
      </Button>
    </Link>
  );

  return (
    <div className="flex items-center justify-between p-4 border-b lg:hidden">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-semibold">TT</span>
        </div>
        <h1 className="font-bold text-lg text-secondary">Talk Through</h1>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <SheetHeader className="mb-6">
            <SheetTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">TT</span>
              </div>
              <h1 className="font-bold text-lg text-secondary">Talk Through</h1>
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-1">
            <NavItem icon={LayoutDashboard} label="Dashboard" to="/" />
            <NavItem icon={Users} label="Patients" to="/patients" />
            <NavItem icon={Puzzle} label="Experience Builder" to="/builder" />
            <NavItem icon={CalendarDays} label="Calendar" to="/calendar" />
            <NavItem icon={BarChart3} label="Reports" to="/reports" />
            <NavItem icon={Settings} label="Settings" to="/settings" />
          </div>

          <div className="mt-auto pt-4 border-t absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3 w-full">
              <Avatar className="h-10 w-10">
                <AvatarFallback>TT</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium leading-none truncate">Dr. Sarah Johnson</p>
                <p className="text-xs text-muted-foreground truncate">Speech Therapist</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
