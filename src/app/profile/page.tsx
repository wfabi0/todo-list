import SettingsDesktop from "@/components/settings/desktop/settings-desktop";
import SettingsMobile from "@/components/settings/mobile/settings-mobile";

export default function ProfilePerfilPage() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-slate-300">
      <SettingsDesktop />
      <SettingsMobile />
    </main>
  );
}
