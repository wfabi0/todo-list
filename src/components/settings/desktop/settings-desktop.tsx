import { Separator } from "@/components/ui/separator";
import SettingsDesktopProfileForm from "./profile/settings-desktop-profile-form";
import SettingsDesktopSidebarNav from "./settings-desktop-sidebar-nav";

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

export default function SettingsDesktop() {
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
                  <h3 className="text-lg font-medium">Profile</h3>
                  <p className="text-sm text-muted-foreground">
                    This is how others will see you on the site.
                  </p>
                </div>
                <Separator />
                <SettingsDesktopProfileForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
