import { DesktopMock, PhoneMock, SiteMock, WebMock, seeded } from './Mocks'

// The picture at the top of every project. If the project has a real screenshot
// (`image` in src/data/projects.js) that is shown; otherwise a drawn mock in the project's colour.
export default function ProjectCover({ project, large = false }) {
  const rnd = seeded(project.id)
  return (
    <div className={`cover is-${project.platform} ${large ? 'is-large' : ''} ${project.image ? 'has-image' : ''}`} style={{ '--c': project.accent }}>
      {project.image ? (
        <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
      ) : (
        <>
          <span className="cover-glow" aria-hidden="true" />
          <span className="cover-title" aria-hidden="true">
            {project.title}
          </span>
          <div className="cover-stage" aria-hidden="true">
            {(project.platform === 'web' || project.platform === 'combo') && (
              <div className="cover-slot mock-box is-wide">
                <WebMock label={`${project.id}.app`} rnd={rnd} />
              </div>
            )}
            {project.platform === 'site' && (
              <div className="cover-slot mock-box is-wide">
                <SiteMock label={`${project.id}.com`} />
              </div>
            )}
            {project.platform === 'desktop' && (
              <div className="cover-slot mock-box is-wide">
                <DesktopMock title={project.title} rnd={rnd} />
              </div>
            )}
            {(project.platform === 'phone' || project.platform === 'combo') && (
              <div className="cover-slot mock-box is-phone">
                <PhoneMock />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
