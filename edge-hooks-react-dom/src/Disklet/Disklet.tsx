import { Disklet as DiskletType } from 'disklet'
import { useFile, useFolder } from 'edge-react-hooks'
import * as React from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import Json from 'react-json-pretty'

import { fileName } from './utils'

const ToggleRow: React.FC<{ title: string }> = ({ children, title }) => {
  const [showContents, setShowContents] = React.useState(false)

  return (
    <div>
      <Button
        onClick={(event: any) => {
          event.stopPropagation()
          setShowContents((x) => !x)
        }}
      >
        {showContents ? '-' : '+'}
      </Button>
      {title}
      {showContents && children}
    </div>
  )
}

export const Disklet: React.FC<{ disklet: DiskletType; path?: string; title: string }> = ({
  disklet,
  path = '/',
  title,
}) => (
  <Card>
    <Card.Header>
      <Card.Title>{title}</Card.Title>
    </Card.Header>
    <Card.Body>
      <Folder disklet={disklet} path={path} />
    </Card.Body>
  </Card>
)

export const Folder: React.FC<{ disklet: DiskletType; path: string }> = ({ disklet, path = '/' }) => (
  <div style={{ paddingLeft: '20px' }}>
    <ToggleRow title={path}>
      <FolderContents disklet={disklet} path={path} />
    </ToggleRow>
  </div>
)

const FolderContents: React.FC<{ disklet: DiskletType; path: string }> = ({ disklet, path }) => {
  const { folder, error, pending } = useFolder(disklet, { path })

  if (error) return <div>Error: {(error as Error).message}</div>
  if (pending || !folder) return <div>Loading...</div>

  if (Object.entries(folder).length <= 0) {
    return (
      <ListGroup>
        <ListGroup.Item>Empty</ListGroup.Item>
      </ListGroup>
    )
  }

  return (
    <ListGroup>
      {Object.entries(folder).map(([key, value]) =>
        value === 'folder' ? (
          <ListGroup.Item>
            <Folder disklet={disklet} path={`${path}${key}`} key={key} />
          </ListGroup.Item>
        ) : value === 'file' ? (
          <ListGroup.Item>
            <File disklet={disklet} path={key} key={key} />
          </ListGroup.Item>
        ) : null,
      )}
    </ListGroup>
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
  const { file, error, pending } = useFile(disklet, { path })

  if (error) return <div>Error: {(error as Error).message}</div>
  if (pending || !file) return <div>Loading...</div>

  return <Json data={file} />
}
