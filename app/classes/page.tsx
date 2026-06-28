import { getAllClasses } from "@/lib/classes";
import ClassCard from "@/components/ClassCard";

export default function ClassesCodex() {
  const allClasses = getAllClasses();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="max-w-3xl mb-10">
        <div className="uppercase tracking-[2px] text-sm font-medium text-brand-blue mb-2">THE CODEX</div>
        <h1 className="text-4xl font-semibold tracking-tight">The 7 Classes</h1>
        <p className="mt-3 text-lg text-brand-dark/70">
          Education and family life come with different kinds of brain load. Explore the groups we work with most at Braintopia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allClasses.map((cls) => (
          <ClassCard key={cls.slug} cls={cls} />
        ))}
      </div>

      <div className="mt-14 text-center">
        <a href="/quiz" className="btn-primary inline-flex px-8 py-3 rounded-full">
          Find your class with the quiz
        </a>
      </div>
    </div>
  );
}
