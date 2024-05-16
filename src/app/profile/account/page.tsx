import SettingsDesktopAccount from "@/components/settings/desktop/account/settings-desktop-account";
import SettingsMobile from "@/components/settings/mobile/settings-mobile";

export default function ProfileAccountPage() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-slate-300">
      <SettingsDesktopAccount />
      <SettingsMobile />
    </main>
  );
}
