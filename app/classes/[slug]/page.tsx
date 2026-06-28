import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllClassDetailSlugs, getClassDetailBySlug } from "@/lib/class-detail";
import BookingModal from "@/components/BookingModal";
import SaveClassButton from "@/components/SaveClassButton";

interface ClassDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllClassDetailSlugs().map((slug) => ({ slug }));
}

export default async function ClassDetailPage({ params }: ClassDetailPageProps) {
  const { slug } = await params;
  const cls = getClassDetailBySlug(slug);

  if (!cls) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <Link href="/classes" className="text-sm text-brand-blue hover:underline">
          ← Back to all classes
        </Link>
      </div>

      <div className="mb-8">
        <div className="inline text-xs tracking-[1.5px] font-medium px-3 py-1 bg-brand-blue/10 text-brand-blue rounded">
          {cls.pillarBadge}
        </div>
        <div className="flex items-start justify-between gap-4 mt-3">
          <h1 className="text-5xl font-semibold tracking-tighter">{cls.name}</h1>
          <SaveClassButton slug={cls.slug} className="mt-2 shrink-0" />
        </div>
        <p className="mt-4 text-xl text-brand-dark/70">{cls.shortDescription}</p>
      </div>

      <div className="space-y-10 mt-10">
        <section>
          <h2 className="font-semibold text-xl mb-3">Core Identity</h2>
          <p className="text-[15px] leading-relaxed text-brand-dark/80">{cls.shortDescription}</p>
        </section>

        <section>
          <h2 className="font-semibold text-xl mb-3">Who This Is For</h2>
          <p className="text-[15px] leading-relaxed text-brand-dark/80">{cls.whoItCovers}</p>
        </section>

        <section>
          <h2 className="font-semibold text-xl mb-3">Key Struggles</h2>
          <p className="text-[15px] leading-relaxed text-brand-dark/80">{cls.keyStruggles}</p>
        </section>

        <section>
          <h2 className="font-semibold text-xl mb-3">How Braintopia Can Help</h2>
          <div className="card p-6 border-l-4 border-brand-blue">
            <p className="text-[15px] leading-relaxed">{cls.howBraintopiaHelps}</p>
          </div>
        </section>

        {cls.talkingPoints.length > 0 && (
          <section>
            <h2 className="font-semibold text-xl mb-3">Talking Points</h2>
            <ul className="space-y-3">
              {cls.talkingPoints.map((point) => (
                <li
                  key={point}
                  className="text-[15px] leading-relaxed text-brand-dark/80 pl-4 border-l-2 border-brand-blue/30"
                >
                  {point}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <Link href={cls.quizHref} className="btn-accent px-8 py-3.5 rounded-full text-center">
          See if this is your class
        </Link>

        <BookingModal preselectedClass={cls.name} />
      </div>

      <div className="mt-8 text-xs text-brand-dark/50">
        This information is based on the real experiences of people Braintopia supports every day.
      </div>
    </div>
  );
}