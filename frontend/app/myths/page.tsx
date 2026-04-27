import { MythCard } from "@/components/myth-card";
import { SectionHeader } from "@/components/section-header";
import { getMyths } from "@/lib/myths";

export default function MythsPage() {
  const myths = getMyths();

  return (
    <main className="flex-1 bg-[#f8f7f0] px-6 py-12 text-[#1f3326] sm:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <SectionHeader
          title="谣言澄清"
          description="识别、拆解和解释食品谣言，帮助用户形成更稳妥的科学判断。"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {myths.map((myth) => (
            <MythCard key={myth.slug} myth={myth} />
          ))}
        </div>
      </div>
    </main>
  );
}
