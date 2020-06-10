import * as React from 'react'
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap'

export const Select = ({
  options,
  renderOption,
  onSelect,
  disabled,
  title,
  defaultValue,
}: {
  options: any[]
  renderOption: (item: any) => React.ReactElement
  onSelect: (selection: any) => any
  disabled?: boolean
  title: string
  defaultValue?: string
}) => {
  return (
    <FormGroup>
      <FormLabel>{title}</FormLabel>
      <FormControl as="select" id={'type'} disabled={disabled} onChange={onSelect} defaultValue={defaultValue}>
        {options.map(renderOption)}
      </FormControl>
    </FormGroup>
  )
}
