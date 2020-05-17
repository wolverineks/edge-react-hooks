import * as React from 'react'
import Json from 'react-json-pretty'
import { Disklet as DiskletType } from 'disklet'

import { useFile, useFolder } from 'edge-react-hooks'
import { fileName, useInterval } from './utils'

const ToggleRow: React.FC<{ title: string }> = ({ children, title }) => {
  const [showContents, setShowContents] = React.useState(false)

  return (
    <div>
      <button
        style={{ height: '30px', width: '30px', margin: '4px' }}
        onClick={(event) => {
          event.stopPropagation()
          setShowContents((x) => !x)
        }}
      >
        {showContents ? '-' : '+'}
      </button>
      {title}
      {showContents && children}
    </div>
  )
}

export const Disklet: React.FC<{ disklet: DiskletType; path?: string }> = ({ disklet, path = '/' }) => (
  <div>
    <Folder disklet={disklet} path={path} />
  </div>
)

export const Folder: React.FC<{ disklet: DiskletType; path: string }> = ({ disklet, path = '/' }) => (
  <div style={{ paddingLeft: '20px' }}>
    <ToggleRow title={path}>
      <FolderContents disklet={disklet} path={path} />
    </ToggleRow>
  </div>
)

const FolderContents: React.FC<{ disklet: DiskletType; path: string }> = ({ disklet, path }) => {
  const { folder, error, pending, refresh } = useFolder(disklet, path)
  useInterval(refresh, 30000)

  if (error) return <div>Error: {error}</div>
  if (pending || !folder) return <div>Loading...</div>

  return (
    <>
      {Object.entries(folder).map(([key, value]) =>
        value === 'folder' ? (
          <Folder disklet={disklet} path={`${path}${key}`} key={key} />
        ) : value === 'file' ? (
          <File disklet={disklet} path={key} key={key} />
        ) : null,
      )}
    </>
  )
}

export const File: React.FC<{ disklet: DiskletType; path: string }> = ({ disklet, path }) => (
  <div style={{ paddingLeft: '20px' }}>
    <ToggleRow title={fileName(path)}>
      <FileContents disklet={disklet} path={path} />
    </ToggleRow>
  </div>
)

const FileContents: React.FC<{ disklet: DiskletType; path: string }> = ({ disklet, path }) => {
  const { file, pending, error, refresh } = useFile(disklet, path)
  useInterval(refresh, 30000)

  if (error) return <div>Error: {error.message}</div>
  if (pending || !file) return <div>Loading...</div>

  return <Json data={file} />
}
