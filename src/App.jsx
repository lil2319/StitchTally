import { useState, useEffect } from 'react'
import './App.css'
import StitchTally from './assets/StitchTally.png'
import Counter from './components/Counter'
import ProjectSelector from './components/ProjectsSelector'
import { useLocalStorageProjects } from './hooks/useLocalStorage'

function App() {
  const [stitchCount, setStitchCount] = useState(0)
  const [rowCount, setRowCount] = useState(0)
  const [projectName, setProjectName] = useState('')

  const {
    projects,
    setProjects,
    loadProjectData,
    saveProjectData,
    deleteProject
  } = useLocalStorageProjects(projectName, stitchCount, rowCount)

  const handleProjectsChange = (e) => {
    const name = e.target.value
    setProjectName(name)
    if (projects.includes(name)) {
      const data = loadProjectData()
      setStitchCount(data.stitchCount)
      setRowCount(data.rowCount)
    } else {
      setStitchCount(0)
      setRowCount(0)
    }
  }

  const handleProjectSave = () => {
    if (!projectName) return alert('Please enter a project Name')
    const newProjects = [...new Set([...projects, projectName])]
    setProjects(newProjects)
    setStitchCount(0)
    saveProjectData()
  }

  const handleDeleteProject = () => {
    if (!projectName) return
    if (!window.confirm(`Delete "${projectName}"?`)) return
    const newProjects = projects.filter((p) => p !== projectName)
    saveProjects(newProjects)
    setProjectName('')
    setStitchCount(0)
    setRowCount(0)
    deleteProject()
  }

  return (
    <div className="container">
      <div className="content">
        <img src={StitchTally} alt="StitchTally Logo" className="logo" />
        <ProjectSelector
          projectName={projectName}
          setProjectName={setProjectName}
          projects={projects}
          handleProjectsChange={handleProjectsChange}
          handleProjectSave={handleProjectSave}
          handleDeleteProject={handleDeleteProject}
        />
        <div className="counterRow">
          <Counter label="Stitches" count={stitchCount} setcount={setStitchCount} />
          <Counter label="Rows" count={rowCount} setcount={setRowCount} />
        </div>
      </div>
    </div>
  )
}

export default App
