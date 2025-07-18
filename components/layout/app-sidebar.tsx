"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  Home,
  PieChart,
  Settings,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Tiers Externes", href: "/tiers", icon: Building2, badge: "NEW" },
  { name: "Commandes", href: "/orders", icon: ShoppingCart },
  { name: "Factures", href: "/invoices", icon: FileText },
  { name: "Paiements", href: "/payments", icon: CreditCard },
  { name: "Finances", href: "/finances", icon: Wallet },
  { name: "Rapports", href: "/reports", icon: PieChart },
  { name: "Utilisateurs", href: "/users", icon: Users },
  { name: "Paramètres", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = React.useState(false);
  const pathname = usePathname();

  return (
    <div className={cn(
      "flex flex-col h-full bg-card border-r transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
          <Building2 className="h-8 w-8 text-primary" />
          {!collapsed && (
            <div className="font-bold text-lg">Yowyob ERP</div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 text-left",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="truncate">{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
      
      <Separator />
      
      <div className="p-4">
        <div className={cn(
          "flex items-center gap-3 p-3 bg-muted rounded-lg",
          collapsed && "justify-center"
        )}>
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <Users className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">Admin User</div>
              <div className="text-xs text-muted-foreground truncate">admin@yowyob.com</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}