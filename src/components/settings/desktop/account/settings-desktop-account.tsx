import { Separator } from "@/components/ui/separator";
import SettingsDesktopSidebarNav from "../settings-desktop-sidebar-nav";
import SettingsDesktopAccountForm from "./settings-desktop-account-form";

const sidebarNavItens = [
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Account",
    href: "/profile/account",
  },
  {
    title: "Workspace",
    href: "/profile/workspace",
  },
];

export default function SettingsDesktopAccount() {
  return (
    <div className="hidden md:block dark:bg-black p-12">
      <div className="bg-white rounded-xl shadow-2xl">
        <div className="space-y-6 p-10 pb-16">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings and your workspaces.
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SettingsDesktopSidebarNav items={sidebarNavItens} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Change your email and password.
                  </p>
                </div>
                <Separator />
                <SettingsDesktopAccountForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
