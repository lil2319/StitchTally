import { useState, useEffect } from 'react'
import './App.css'
import StitchTally from './assets/StitchTally.png'

function App() {
  const [stitchCount, setStitchCount] = useState(0)
  const [rowCount, setRowCount] = useState(0)
  const [projectName, setProjectName] = useState('')
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const savedProjects = localStorage.getItem('projects')
    if (savedProjects) setProjects(JSON.parse(savedProjects))
  }, [])

  useEffect(() => {
    if (projectName && projects.includes(projectName)) {
      saveProjectData(projectName)
    }
  }, [stitchCount, rowCount])

  const saveProjectData = (name) => {
    localStorage.setItem(`project-${name}-stitches`, stitchCount)
    localStorage.setItem(`project-${name}-rows`, rowCount)
  }

  const loadProjectData = (name) => {
    const savedStitchCount = localStorage.getItem(`project-${name}-stitches`)
    const savedRowCount = localStorage.getItem(`project-${name}-rows`)
    setStitchCount(savedStitchCount ? Number(savedStitchCount) : 0)
    setRowCount(savedRowCount ? Number(savedRowCount) : 0)
  }

  const handleProjectChange = (e) => {
    const name = e.target.value
    setProjectName(name)
    if (projects.includes(name)) {
      loadProjectData(name)
    } else {
      setStitchCount(0)
      setRowCount(0)
    }
  }

  const handleProjectSave = () => {
    if (!projectName) return alert('Please enter a project name')
    const newProjects = [...new Set([...projects, projectName])]
    setProjects(newProjects)
    localStorage.setItem('projects', JSON.stringify(newProjects))
    setStitchCount(0)
    saveProjectData(projectName)
  }

  const handleDeleteProject = () => {
    if (!projectName) return
    if (!window.confirm(`Delete "${projectName}"?`)) return
    const newProjects = projects.filter((p) => p !== projectName)
    setProjects(newProjects)
    setProjectName('')
    setStitchCount(0)
    setRowCount(0)
    localStorage.setItem('projects', JSON.stringify(newProjects))
    localStorage.removeItem(`project-${projectName}-stitches`)
    localStorage.removeItem(`project-${projectName}-rows`)
  }

  return (
    <div className="container">
      <div className='content'>
        <img src={StitchTally} alt="StitchTally Logo" className="logo" />

        <select className="input" value={projectName} onChange={handleProjectChange}>
          <option value="">Select Project</option>
          {projects.map((project, index) => (
            <option key={index} value={project}>
              {project}
            </option>
          ))}
        </select>

        <input
          className="input"
          type="text"
          placeholder="Enter Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <button onClick={handleProjectSave} className="saveButton">
          <span className="buttonText">Save Project</span>
        </button>

        {projectName && (
          <button onClick={handleDeleteProject} className="deleteButton">
            <span className="buttonText">Delete Project</span>
          </button>
        )}

        <div className="counterRow">
          <div className="counter">
            <div className="label">Stitches: {stitchCount}</div>
            <div className="buttonRow">
              <button
                className="counterButton"
                onClick={() => setStitchCount(Math.max(0, stitchCount - 1))}
              >
                <span className="buttonText">−</span>
              </button>
              <button
                className="counterButton"
                onClick={() => setStitchCount(stitchCount + 1)}
              >
                <span className="buttonText">+</span>
              </button>
            </div>
          </div>

          <div className="counter">
            <div className="label">Rows: {rowCount}</div>
            <div className="buttonRow">
              <button
                className="counterButton"
                onClick={() => setRowCount(Math.max(0, rowCount - 1))}
              >
                <span className="buttonText">−</span>
              </button>
              <button
                className="counterButton"
                onClick={() => setRowCount(rowCount + 1)}
              >
                <span className="buttonText">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
