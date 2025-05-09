export default function ProjectSelector({ projectName, setProjectName, projects, handleProjectsChange, handleProjectSave, handleDeleteProject }) {
    return (
        <>
            <select className="input" value={projectName} onChange={handleProjectsChange}>
                <option value="">Select Project</option>
                {projects.map((project, index) => (
                    <option key={index} value={project}>{project}</option>
                ))}
            </select>

            <input className="input" type="text" placeholder="Enter Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            <button onClick={handleProjectSave} className="saveButton">
                <span className="buttonText">Save Project</span>
            </button>

            {projectName && (
                <button onClick={handleDeleteProject} className="deleteButton">
                    <span className="buttonText">Delete Project</span>
                </button>
            )}
        </>
    );
}
