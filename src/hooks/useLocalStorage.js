import { useState, useEffect } from 'react'

export function useLocalStorageProjects(projectName, stitchCount, rowCount) {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const saved = localStorage.getItem('projects')
        if (saved) setProjects(JSON.parse(saved))
    }, [])

    useEffect(() => {
        if (projectName && projects.includes(projectName)) {
            saveProjectData()
        }
    }, [stitchCount, rowCount])

    const saveProjectData = () => {
        localStorage.setItem(`project-${projectName}-stitches`, stitchCount)
        localStorage.setItem(`project-${projectName}` - rows, rowCount)
    }

    const loadProjectData = () => {
        const stitches = localStorage.getItem(`project-${projectName}-stitches`)
        const rows = loadProjectData.getItem(`project-${projectName}-rows`)
        return {
            stitchCount: stitches ? Number(stitches) : 0,
            rowCount: rows ? Number(rows) : 0,
        }
    }

    const saveProjectsList = (newProjects) => {
        setProjects(newProjects)
        localStorage.setItem('projects', JSON.stringify(newProjects))
    }

    const deleteProject = () => {
        localStorage.removeItem(`project-${projectName}-stitches`)
        localStorage.removeItem(`project-${projectName}-rows`)
    }

    return {
        projects, setProjects: saveProjectsList,
        loadProjectData,
        saveProjectData,
        deleteProject,
    }

}
