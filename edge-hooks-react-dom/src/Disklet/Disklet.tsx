import { Disklet as DiskletType } from 'disklet'
import { useFile, useFolder } from 'edge-react-hooks'
import * as React from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import Json from 'react-json-pretty'

export const fileName = (path: string) => (path.match(/\w*.\w+$/) || [])[0] || '/'
export const folderName = (path: string) => (path.match(/\w+$/) || [])[0] || '/'

const ToggleRow: React.FC<{ title: string; right?: React.ReactElement }> = ({ children, title, right }) => {
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
      {right}
      {showContents && children}
    </div>
  )
}

export const Disklet: React.FC<{ disklet: DiskletType; path?: string; title: string }> = ({
  disklet,
  path = '/',
  title,
}) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Folder disklet={disklet} path={path} />
      </Card.Body>
    </Card>
  )
}

export const Folder: React.FC<{ disklet: DiskletType; path: string }> = ({ disklet, path = '/' }) => {
  return (
    <div style={{ paddingLeft: '20px' }}>
      <ToggleRow
        title={folderName(path)}
        right={
          <Button className={'float-right'} variant={'danger'} onClick={() => disklet.delete(path)}>
            Delete
          </Button>
        }
      >
        <FolderContents disklet={disklet} path={path} />
      </ToggleRow>
    </div>
  )
}

const FolderContents: React.FC<{ disklet: DiskletType; path: string }> = ({ disklet, path }) => {
  const folder = useFolder(disklet, { path })

  if (folder.status === 'loading' || folder.status === 'idle') return <div>Loading...</div>
  if (folder.status === 'error') return <div>Error: {folder.error.message}</div>

  if (Object.entries(folder.data).length <= 0) {
    return (
      <ListGroup>
        <ListGroup.Item>Empty</ListGroup.Item>
      </ListGroup>
    )
  }

  return (
    <ListGroup>
      {Object.entries(folder.data).map(([key, value]) =>
        value === 'folder' ? (
          <ListGroup.Item key={key}>
            <Folder disklet={disklet} path={key} />
          </ListGroup.Item>
        ) : value === 'file' ? (
          <ListGroup.Item key={key}>
            <File disklet={disklet} path={key} />
          </ListGroup.Item>
        ) : null,
      )}
    </ListGroup>
  )
}

export const File: React.FC<{ disklet: DiskletType; path: string }> = ({ disklet, path }) => (
  <div style={{ paddingLeft: '20px' }}>
    <ToggleRow
      title={fileName(path)}
      right={
        <Button className={'float-right'} variant={'danger'} onClick={() => disklet.delete(path)}>
          Delete
        </Button>
      }
    >
      <FileContents disklet={disklet} path={path} />
    </ToggleRow>
  </div>
)

const FileContents: React.FC<{ disklet: DiskletType; path: string }> = ({ disklet, path }) => {
  const { data: file, error, status } = useFile<string>(disklet, { path })

  if (status === 'loading' || status === 'idle' || !file) return <div>Loading...</div>
  if (status === 'error' && error) return <div>Error: {error.message}</div>

  return <Json data={file} />
}
