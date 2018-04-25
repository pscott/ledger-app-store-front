// @flow
import * as React from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import Select from 'material-ui/Select'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'

import Form from '../../../utils/form'

type Props = {
  mcu: Object[],
  deviceVersions: Object[],
  firmwareVersions: Object[],
  providers: Object[],
  createResource: Function,
}

const initFields = {
  mcu: '',
  name: '',
  description: '',
  device_versions: [],
  se_firmware_versions: [],
  providers: [],
}

const ApplicationVersion = ({
  mcu,
  firmwareVersions,
  deviceVersions,
  createResource,
  providers,
}: Props): React.Node => (
  <React.Fragment>
    <Form type="mcu_versions" initFields={initFields}>
      {({ onChange, onSelectChange, onSubmit, fields }) => (
        <form className="form" onSubmit={onSubmit(createResource)}>
          <TextField
            id="mcu"
            select
            required
            label="mcu"
            value={fields.mcu}
            onChange={onSelectChange('mcu')}
            className="input"
          >
            {mcu.map(mc => (
              <MenuItem key={mc.id} value={mc.id}>
                {mc.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="name"
            label="name"
            type="string"
            onChange={onChange('name')}
            value={fields.name}
            className="input"
            required
          />
          <TextField
            id="description"
            label="description"
            type="string"
            onChange={onChange('description')}
            value={fields.description}
            className="input"
          />
          <FormControl className="input">
            <InputLabel htmlFor="provider">provider(s)</InputLabel>
            <Select
              multiple
              input={<Input id="provider" />}
              onChange={onSelectChange('providers')}
              value={fields.providers}
              renderValue={selected =>
                providers
                  .filter(provider => selected.includes(provider.id))
                  .map(el => el.name)
                  .join(', ')
              }
            >
              {providers.map(provider => (
                <MenuItem key={provider.name} value={provider.id}>
                  <Checkbox checked={fields.providers.indexOf(provider.id) > -1} />
                  {provider.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="input">
            <InputLabel htmlFor="device_versions">device version(s)</InputLabel>
            <Select
              multiple
              input={<Input id="device_versions" />}
              onChange={onSelectChange('device_versions')}
              value={fields.device_versions}
              renderValue={selected =>
                deviceVersions
                  .filter(version => selected.includes(version.id))
                  .map(el => el.name)
                  .join(', ')
              }
            >
              {deviceVersions.map(version => (
                <MenuItem key={version.name} value={version.id}>
                  <Checkbox checked={fields.device_versions.indexOf(version.id) > -1} />
                  {`${version.topName} - ${version.name}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="input">
            <InputLabel htmlFor="se_firmware_versions">se firmwares version(s)</InputLabel>
            <Select
              multiple
              input={<Input id="se_firmware_versions" />}
              onChange={onSelectChange('se_firmware_versions')}
              value={fields.se_firmware_versions}
              renderValue={selected =>
                firmwareVersions
                  .filter(version => selected.includes(version.id))
                  .map(el => el.name)
                  .join(', ')
              }
            >
              {firmwareVersions.map(version => (
                <MenuItem key={version.name} value={version.id}>
                  <Checkbox checked={fields.se_firmware_versions.indexOf(version.id) > -1} />
                  {`${version.topName} - ${version.name}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="submit">
            <Button type="submit" size="large" variant="raised" color="secondary">
              Submit
            </Button>
          </div>
        </form>
      )}
    </Form>

    <style jsx>{`
      .form :global(.input) {
        box-sizing: border-box;
        padding-right: 8px;
        margin-top: 12px;
        width: 50%;
      }

      .form .submit {
        padding: 12px 0;
      }
    `}</style>
  </React.Fragment>
)

export default ApplicationVersion