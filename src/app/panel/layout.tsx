import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/panel/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/giris");
  }

  const initials = session.user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <div className="flex h-screen bg-muted/30">
      <Sidebar userRole={session.user.role} />
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b h-16 flex items-center px-6">
          <div className="flex items-center justify-end w-full gap-3">
            <Badge variant="secondary" className="text-xs font-medium">
              {session.user.role}
            </Badge>
            <div className="flex items-center gap-2.5">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground">
                {session.user.name}
              </span>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
