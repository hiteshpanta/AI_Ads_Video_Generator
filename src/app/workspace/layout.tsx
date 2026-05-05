// import React from 'react'
import WorkspaceProvider from './provider'

function WorkspaceLayout({children}: {children: any}) {

  return (
    <div>
        <WorkspaceProvider>
            {children}
        </WorkspaceProvider>
      
    </div>
  )
}

export default WorkspaceLayout
