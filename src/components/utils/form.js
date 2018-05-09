// @flow
/* globals SyntheticEvent */
import * as React from 'react'

type Props = {
  children: Function,
  initFields: Object,
  method: 'POST' | 'DELETE' | 'PUT',
  type?: string,
  success: boolean,
}

type State = {
  fields: Object,
}

class Form extends React.Component<Props, State> {
  props: Props
  state: State

  static defaultProps = {
    type: '',
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      fields: props.initFields,
    }
  }

  componentDidUpdate({ success: prevSuccess }: Props) {
    const { success } = this.props

    if (!prevSuccess && success) {
      this.reset()
    }
  }

  onChange = (field: string): Function => (evt: SyntheticEvent<HTMLInputElement>): void => {
    evt.preventDefault()
    const { value } = evt.currentTarget
    this.setState(state => ({
      ...state,
      fields: { ...state.fields, [field]: value },
    }))
  }

  onSelectChange = (field: string): Function => (evt: Object): void => {
    const { value } = evt.target
    this.setState(state => ({
      ...state,
      fields: { ...state.fields, [field]: value },
    }))
  }

  onSubmit = (callback: Function): Function => (
    evt: SyntheticEvent<HTMLButtonElement | HTMLFormElement>,
  ): void => {
    evt.preventDefault()
    const { fields } = this.state
    const { type, method } = this.props

    callback(type, fields, method)
  }

  reset = (): void => {
    const { initFields } = this.props
    this.setState(state => ({ ...state, fields: initFields || {} }))
  }

  render(): React.Node {
    const { fields } = this.state
    return this.props.children({
      onChange: this.onChange,
      onSubmit: this.onSubmit,
      onSelectChange: this.onSelectChange,
      fields,
    })
  }
}

export default Form
