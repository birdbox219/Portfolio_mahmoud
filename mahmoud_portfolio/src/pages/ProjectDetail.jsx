import { useParams, Navigate, Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { PORTFOLIO_DATA } from '../data';

export default function ProjectDetail() {
  const { id } = useParams();
  
  // Find the specific project by ID
  const project = PORTFOLIO_DATA.projects.find(p => p.id === id);

  // If project is not found, we could redirect or show a 404. Let's just fallback or redirect.
  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const { detail } = project;

  return (
    <PageWrapper>
      <main className="md:ml-64 pt-24 pb-32 px-margin max-w-container-max min-h-screen flex flex-col gap-stack-lg mx-auto w-full">
        {/* Header Module */}
        <header className="mb-stack-lg">
          <div className="font-label-md text-label-md text-on-surface-variant mb-stack-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px]">memory</span>
            FILE_REF // NNV-{project.id}
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-stack-md">{project.title}</h1>
          <div className="flex gap-stack-sm flex-wrap">
            <div className="px-3 py-1 border border-outline-variant rounded-DEFAULT font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 bg-surface-container-low">
              <span className={`w-1.5 h-1.5 rounded-full inline-block ${project.status === 'ACTIVE' ? 'bg-primary' : 'bg-outline-variant'}`}></span>
              STATUS: {project.status === 'ACTIVE' ? 'COMPILED' : 'ARCHIVED'}
            </div>
            <div className="px-3 py-1 border border-outline-variant rounded-DEFAULT font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low">
              CYCLE: {detail.cycle}
            </div>
            <div className="px-3 py-1 border border-outline-variant rounded-DEFAULT font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low">
              CLASS: {detail.classType}
            </div>
          </div>
        </header>

        {/* Structured Vertical Sections */}
        {/* Section 01: Overview */}
        <section className="border-t border-outline-variant py-stack-lg grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-3">
            <h2 className="font-label-md text-label-md text-tertiary">01 // OVERVIEW</h2>
          </div>
          <div className="md:col-span-9 max-w-3xl">
            <p className="font-body-lg text-body-lg text-on-surface mb-stack-md">
              {detail.overview}
            </p>
          </div>
        </section>

        {/* Section 02: Goal */}
        <section className="border-t border-outline-variant py-stack-lg grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-3">
            <h2 className="font-label-md text-label-md text-tertiary">02 // OBJECTIVE_PARAMETERS</h2>
          </div>
          <div className="md:col-span-9 max-w-3xl">
            <p className="font-body-lg text-body-lg text-on-surface">
              {detail.objective}
            </p>
          </div>
        </section>

        {/* Section 03: Specifications (Role & Tech Stack) */}
        <section className="border-t border-outline-variant py-stack-lg grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-3">
            <h2 className="font-label-md text-label-md text-tertiary">03 // SPECIFICATIONS</h2>
          </div>
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-stack-lg">
            <div>
              <h3 className="font-label-sm text-label-sm text-on-surface-variant mb-stack-sm border-b border-outline-variant pb-1">OPERATOR_ROLE</h3>
              <p className="font-body-md text-body-md text-on-surface">{detail.operatorRole}</p>
            </div>
            <div>
              <h3 className="font-label-sm text-label-sm text-on-surface-variant mb-stack-sm border-b border-outline-variant pb-1">SYSTEM_ARCHITECTURE</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {detail.techStack.map(tech => (
                  <span key={tech} className="px-2 py-1 bg-surface-container border border-outline-variant font-label-sm text-label-sm text-on-surface">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Visual Data (Media) */}
        <section className="border-t border-outline-variant py-stack-lg grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-3">
            <h2 className="font-label-md text-label-md text-tertiary mb-stack-md md:mb-0">04 // VISUAL_DATA_DUMP</h2>
          </div>
          <div className="md:col-span-9">
            <div className="w-full aspect-video bg-surface-container-highest border border-outline-variant relative group overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#625f4e 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              <img alt="Visual Dump" className="w-full h-full object-cover mix-blend-luminosity opacity-80 filter contrast-125" src={detail.detailImage}/>
              <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-sm border border-outline-variant px-3 py-2">
                <p className="font-label-sm text-label-sm text-on-surface">FIG. 1 // REAL-TIME SYSTEM RENDER</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Challenges */}
        <section className="border-t border-outline-variant py-stack-lg grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-3">
            <h2 className="font-label-md text-label-md text-tertiary">05 // ANOMALY_REPORT</h2>
          </div>
          <div className="md:col-span-9 max-w-3xl flex flex-col gap-stack-md">
            <p className="font-body-lg text-body-lg text-on-surface">
              {detail.anomalyReport}
            </p>
            <div className="p-6 bg-surface-container-low border-l-2 border-primary">
              <h3 className="font-label-md text-label-md text-on-surface mb-2">RESOLUTION_PROTOCOL</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {detail.resolution}
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Execute Module — shown on ALL projects */}
        <section className="border-t border-outline-variant py-stack-lg grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-3">
            <h2 className="font-label-md text-label-md text-tertiary">06 // EXECUTE_MODULE</h2>
          </div>
          <div className="md:col-span-9 flex flex-col gap-stack-md">
            {/* Warning banner */}
            <div className="p-4 bg-surface-container-low border-l-2 border-secondary">
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                ⚠ THIS MODULE REQUIRES A DESKTOP BROWSER. ESTIMATED LOAD TIME: {detail.estimatedLoadTime}
              </p>
            </div>
            {/* Action buttons — same UI, different behavior */}
            <div className="flex gap-stack-md flex-wrap">
              {detail.embedUrl ? (
                <Link
                  to={`/play/${project.id}`}
                  className="bg-on-surface text-surface px-6 py-4 font-label-md text-label-md border border-on-surface hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  [ INITIALIZE_SIMULATION ]
                </Link>
              ) : (
                <a
                  href={detail.itchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-on-surface text-surface px-6 py-4 font-label-md text-label-md border border-on-surface hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  [ INITIALIZE_SIMULATION ]
                </a>
              )}
              <a
                href={detail.itchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-surface text-on-surface px-6 py-4 font-label-md text-label-md border border-outline-variant hover:bg-surface-container transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                [ DOWNLOAD_BUILD ]
              </a>
            </div>
          </div>
        </section>

        <div className="border-t border-outline-variant mt-stack-lg pt-stack-sm text-center">
          <p className="font-label-sm text-label-sm text-outline">END OF FILE</p>
        </div>
      </main>
    </PageWrapper>
  );
}
